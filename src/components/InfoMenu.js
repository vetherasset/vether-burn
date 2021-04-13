import React from 'react'
import { Button, Divider, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

const styles = {
	size: 'sm',
}

export const InfoMenu = (props) => {
	return (
		<Menu>
			<MenuButton as={Button} rightIcon={<ChevronDownIcon />} ml={'0.6rem'} fontSize={{ base: '0.65rem', sm: 'sm' }} {...props}>
				Info
			</MenuButton>
			<MenuList>
				<MenuItem><Link {...styles} isExternal href='https://wp.vetherasset.io/'>Whitepaper</Link></MenuItem>
				<MenuItem><Link {...styles} isExternal href='https://github.com/vetherasset'>GitHub</Link></MenuItem>
				<MenuItem><Link {...styles} isExternal href='https://etherscan.io/address/0x4ba6ddd7b89ed838fed25d208d4f644106e34279'>VETH contract</Link></MenuItem>
				<MenuItem><Link {...styles} isExternal href='https://etherscan.io/address/0x0111011001100001011011000111010101100101'>Burnt ETH</Link></MenuItem>
				<Divider />
				<MenuItem><Link {...styles} isExternal href='https://discord.gg/c5aBC7Q'>Discord</Link></MenuItem>
				<MenuItem><Link {...styles} isExternal href='https://t.me/vetherasset'>Telegram</Link></MenuItem>
				<MenuItem><Link {...styles} isExternal href='https://twitter.com/strictly_scarce'>Twitter</Link></MenuItem>
				<MenuItem><Link {...styles} isExternal href='https://bitcointalk.org/index.php?topic=5243406'>BitcoinTalk</Link></MenuItem>
				<Divider />
				<MenuItem><Link {...styles} isExternal href='https://uniswap.exchange/swap/0x4ba6ddd7b89ed838fed25d208d4f644106e34279'>Uniswap</Link></MenuItem>
				<MenuItem><Link {...styles} isExternal href='https://trade.resfinex.com/?pair=VETH_ETH'>Resfinex</Link></MenuItem>
				<Divider />
				<MenuItem><Link {...styles} isExternal href='https://coinmarketcap.com/currencies/vether/'>CoinMarketCap</Link></MenuItem>
				<MenuItem><Link {...styles} isExternal href='https://www.coingecko.com/en/coins/vether'>CoinGecko</Link></MenuItem>
			</MenuList>
		</Menu>
	)
}
