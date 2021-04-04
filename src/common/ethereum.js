import { BigNumber, ethers } from 'ethers'
import defaults from './defaults'
import vetherTokenAbi from '../artifacts/vetherTokenAbi'
import uniswapPairAbi from '../artifacts/uniswapPairAbi'
import humanStandardTokenAbi from '../artifacts/humanStandardTokenAbi'
const pLimit = require('p-limit')

const getEmissionEra = async (provider) => {
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	return await contract.currentEra()
}

const getEmissionDay = async (provider) => {
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	return await contract.currentDay()
}

const getEmission = async (provider) => {
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	return await contract.getDayEmission()
}

const getNextEraDayTime = async (provider) => {
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	return await contract.nextEraTime()
}

const getNextDayTime = async (provider) => {
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	return await contract.nextDayTime()
}

const getNextEmission = async (provider) => {
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	return await contract.getNextEraEmission()
}

const getCurrentBurn = async (provider) => {
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	return await contract.mapEraDay_UnitsRemaining(
		getEmissionEra(provider), getEmissionDay(provider),
	)
}

const getEmitted = async (provider) => {
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	return (+ethers.utils.formatEther(BigNumber.from('1000000000000000000000000'))
	- +ethers.utils.formatEther(await contract.balanceOf(defaults.network.address.vether))
	+ +ethers.utils.formatEther(await contract.totalFees()))
}

const getUniswapAssetPrice = async (poolAddress, decimals0, decimals1, flip, provider) => {
	const contract = new ethers.Contract(
		poolAddress,
		uniswapPairAbi,
		provider,
	)
	const reserves = await contract.getReserves()
	const i = 1
	if (flip) {
		return (Number(reserves._reserve0) / Number(i.toFixed(decimals0).replace('.', ''))) / (Number(reserves._reserve1) / Number(i.toFixed(decimals1).replace('.', '')))
	}
	else {
		return (Number(reserves._reserve1) / Number(i.toFixed(decimals1).replace('.', ''))) / (Number(reserves._reserve0) / Number(i.toFixed(decimals0).replace('.', '')))
	}
}

const getVetherValue = async (amount) => {
	const currentBurn = Number(ethers.utils.formatEther(await getCurrentBurn(defaults.network.provider)))
	const emission = Number(ethers.utils.formatEther(await getEmission(defaults.network.provider)))
	let value = (+amount / (+amount + currentBurn)) * emission
	value = value < 0 || isNaN(value) ? 0 : value
	return value
}

const getDaysContributed = async (emissionEra, address, provider) => {
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	return contract.getDaysContributedForEra(address, emissionEra)
}

const getClaimDayNums = async (era, address, provider) => {
	const curEra = Number(await getEmissionEra(provider))
	// console.log(`curEra ${curEra}`)
	if (era > curEra || era < 1) {
		return []
	}
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	const concurrency = 8
	const limit = pLimit(concurrency)
	// Get the number of days on which the user burned during the era.
	const numBurnDays = await contract.getDaysContributedForEra(address, era)
	// console.log(`numBurnDays ${numBurnDays}`)
	// Get the day numbers on which the burns occurred.
	const idxs = Array.from({ length: numBurnDays }, (x, i) => i)
	// console.log(`idxs ${idxs}`)
	const ps0 = idxs.map(idx => {
		return limit(() => contract.mapMemberEra_Days(address, era, idx))
	})
	const burnDayNums = await Promise.all(ps0)
	// console.log(`burnDayNums ${burnDayNums}`)
	// Determine which day numbers have nonzero share.
	const ps1 = burnDayNums.map(dayNum => {
		return limit(() => {
			return contract.getEmissionShare(era, dayNum, address).then(v => {
				return Number(ethers.utils.formatEther(v)) > 0 ? dayNum : null
			})
		})
	})
	const burnDayNumsWithNonzeroShare = await Promise.all(ps1)
	// console.log(`burnDayNumsWithNonzeroShare ${burnDayNumsWithNonzeroShare}`)
	const claimDayNums = burnDayNumsWithNonzeroShare.filter(x => x).sort((a, b) => a - b)
	// console.log(`claimDayNums ${claimDayNums}`)
	return claimDayNums
}

const getEachDayContributed = async (daysContributed, era, address, provider) => {
	const emissionEra = Number(await getEmissionEra(provider))
	const emissionDay = Number(await getEmissionDay(provider))
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	const days = []
	for (let j = daysContributed - 1; j >= 0; j--) {
		const day = +(await contract.mapMemberEra_Days(address, era, j))
		if (era < emissionEra || (era >= emissionEra && day < emissionDay)) {
			const share = await getShare(ethers.BigNumber.from(era), ethers.BigNumber.from(day), address, provider)
			if (Number(ethers.utils.formatEther(share)) > 0) {
				days.push(day)
			}
		}
	}
	return days
}

const getShare = async (era, day, address, provider) => {
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider,
	)
	return await contract.getEmissionShare(era, day, address)
}

const claimShare = async (era, day, provider) => {
	const contract = new ethers.Contract(
		defaults.network.address.vether,
		vetherTokenAbi,
		provider.getSigner(0),
	)
	return await contract.withdrawShare(era, day)
}

export {
	getEmissionEra, getEmissionDay, getEmission, getNextEraDayTime, getNextDayTime, getNextEmission, getCurrentBurn,
	getEmitted, getUniswapAssetPrice, getVetherValue, getDaysContributed, getClaimDayNums, getEachDayContributed, getShare, claimShare,
}
