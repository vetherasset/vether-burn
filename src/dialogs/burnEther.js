import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import defaults from '../common/defaults'
import {
	Flex, Heading, NumberInput, NumberInputField, Button, Badge, Box, Tooltip,
	useToast,
} from '@chakra-ui/react'
import { useWallet } from 'use-wallet'
import { getCurrentBurn, getEmission, getUniswapAssetPrice } from '../common/ethereum'
import { getVetherValueStrict, prettifyCurrency } from '../common/utils'
import { failed, rejected, insufficientBalance, destroyed, walletNotConnected, amountOfEthToBurnNotEntered } from '../messages'
import { HighImpliedPriceWarning } from '../components/HighImpliedPriceWarning'

export const BurnEther = () => {

	const wallet = useWallet()
	const toast = useToast()
	const [amount, setAmount] = useState('')
	const [value, setValue] = useState(0)
	const [currentBurn, setCurrentBurn] = useState(undefined)
	const [emission, setEmission] = useState(undefined)
	const [ethPriceUsd, setEthPriceUsd] = useState(undefined)
	const [vethPriceEth, setVethPriceEth] = useState(undefined)
	const [vethImpliedPriceUsd, setVethImpliedPriceUsd] = useState(undefined)
	const [vethMarketPriceUsd, setVethMarketPriceUsd] = useState(undefined)
	const [working, setWorking] = useState(false)

	useEffect(() => {
		getCurrentBurn(defaults.network.provider).then(n => setCurrentBurn(Number(ethers.utils.formatEther(n))))
	}, [])

	useEffect(() => {
		getEmission(defaults.network.provider).then(n => setEmission(Number(ethers.utils.formatEther(n))))
	}, [])

	useEffect(() => {
		getUniswapAssetPrice(defaults.network.address.uniswap.usdc, 6, 18, true, defaults.network.provider)
			.then(n => setEthPriceUsd(n))
	}, [])

	useEffect(() => {
		getUniswapAssetPrice(defaults.network.address.uniswap.veth, 18, 18, false, defaults.network.provider)
			.then(n => setVethPriceEth(n))
	}, [])

	useEffect(() => {
		if (currentBurn && emission && ethPriceUsd) {
			setVethImpliedPriceUsd(currentBurn / emission * ethPriceUsd)
		}
	}, [currentBurn, emission, ethPriceUsd])

	useEffect(() => {
		if (vethPriceEth && ethPriceUsd) {
			setVethMarketPriceUsd(vethPriceEth * ethPriceUsd)
		}
	}, [vethPriceEth, ethPriceUsd])

	return (
		<>
			<Flex flexFlow='column' h='25%'>
				<Heading as='h3' size='md' textAlign='center' m='-4px 0 11px 0'>ACQUIRE VETHER</Heading>
				<Box as='span' textAlign='center'>Acquire a share of today’s emission by&nbsp;burning Ether.</Box>
			</Flex>

			<Flex flexFlow='column' h='25%'>
				{vethImpliedPriceUsd > vethMarketPriceUsd &&
					<HighImpliedPriceWarning vethImpliedPriceUsd={vethImpliedPriceUsd} vethMarketPriceUsd={vethMarketPriceUsd} />
				}
				<Heading as='h3' size='sm' mb='11px'>Amount Eth to burn</Heading>
				<NumberInput
					min={0}
					value={amount}
					onChange={(n) => {
						setAmount(n)
						getVetherValueStrict(n, currentBurn, emission).then(v => setValue(v))
					}}
					clampValueOnBlur={false}
					variant='filled'
				>
					<NumberInputField placeholder='🔥🔥🔥' />
				</NumberInput>
			</Flex>

			<Flex flexFlow='column' h='25%'>
				<Heading as='h3' textAlign='center'>
					{value === 0 ? prettifyCurrency(value, 0, 2, 'VETH') : prettifyCurrency(value, 0, 2, 'VETH')}
				</Heading>
				<Heading as='span' size='sm' fontWeight='normal' textAlign='center'>Potential share</Heading>
				<Box m='0 auto'>
					<Tooltip hasArrow
						label='Your share is going to be almost surely different at the end of the day!
						The final amount of Veth you get is dependent on how much you burn,
						compared to how much everyone else burns. Your share decreases with each incoming burn after yours.'
						placement='bottom'
						color='white'
						bg='rgb(0,0,0)'
						arrowShadowColor='rgb(0,0,0)'>
						<Box textAlign='center'>
							<Badge background='rgb(214, 188, 250)' color='rgb(128, 41, 251)'>Why this is not my final share?</Badge>
						</Box>
					</Tooltip>
				</Box>
			</Flex>

			<Flex flexFlow='column' h='25%'>
				<Button w='100%'
					isLoading={working}
					loadingText='Submitting'
					onClick={() => {
						if (!wallet.account) {
							toast(walletNotConnected)
							return
						}
						if (!amount) {
							toast(amountOfEthToBurnNotEntered)
							return
						}
						setWorking(true)
						const provider = new ethers.providers.Web3Provider(wallet.ethereum)
						const signer = provider.getSigner(0)
						signer.sendTransaction({
							to: defaults.network.address.vether,
							value: ethers.utils.parseEther(amount),
						})
							.then((tx) => {
								tx.wait().then(() => {
									setWorking(false)
									toast(destroyed)
								}).catch((err) => {
									setWorking(false)
									console.log('Error code is:' + err.code)
									console.log('Error:' + err)
									toast(failed)
								})
							})
							.catch((err) => {
								if(err.code === 'INSUFFICIENT_FUNDS') {
									setWorking(false)
									console.log('Insufficient balance: Your account balance is insufficient.')
									toast(insufficientBalance)
								}
								else if(err.code === 4001) {
									setWorking(false)
									console.log('Transaction rejected: Your have decided to reject the transaction..')
									toast(rejected)
								}
								else {
									setWorking(false)
									console.log('Error code is:' + err.code)
									console.log('Error:' + err)
									toast(failed)
								}
							})
					}}>
					Burn
				</Button>
			</Flex>
		</>
	)
}
