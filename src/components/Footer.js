import React from 'react'
import { Flex, Heading, Link, List, ListItem } from '@chakra-ui/react'

const styles = {
	size: 'sm',
}

const listPr = 4

export const Footer = (props) => {
	return (
		<Flex {...props} w='100%'>
			<List pr={listPr}>
				<ListItem><Heading {...styles}>Information</Heading></ListItem>
				<ListItem><Link {...styles} isExternal href='https://wp.vetherasset.io/'>Whitepaper</Link></ListItem>
				<ListItem><Link {...styles} isExternal href='https://github.com/vetherasset'>GitHub</Link></ListItem>
				<ListItem><Link {...styles} isExternal href='https://etherscan.io/address/0x4ba6ddd7b89ed838fed25d208d4f644106e34279'>VETH contract</Link></ListItem>
				<ListItem><Link {...styles} isExternal href='https://etherscan.io/address/0x0111011001100001011011000111010101100101'>Burnt ETH</Link></ListItem>
			</List>
			<List pr={listPr}>
				<ListItem><Heading {...styles}>Social</Heading></ListItem>
				<ListItem><Link {...styles} isExternal href='https://discord.gg/c5aBC7Q'>Discord</Link></ListItem>
				<ListItem><Link {...styles} isExternal href='https://t.me/vetherasset'>Telegram</Link></ListItem>
				<ListItem><Link {...styles} isExternal href='https://twitter.com/strictly_scarce'>Twitter</Link></ListItem>
				<ListItem><Link {...styles} isExternal href='https://bitcointalk.org/index.php?topic=5243406'>BitcoinTalk</Link></ListItem>
			</List>
			<List pr={listPr}>
				<ListItem><Heading {...styles}>Exchanges</Heading></ListItem>
				<ListItem><Link {...styles} isExternal href='https://uniswap.exchange/swap/0x4ba6ddd7b89ed838fed25d208d4f644106e34279'>Uniswap</Link></ListItem>
				<ListItem><Link {...styles} isExternal href='https://trade.resfinex.com/?pair=VETH_ETH'>Resfinex</Link></ListItem>
			</List>
			<List>
				<ListItem><Heading {...styles}>Trackers</Heading></ListItem>
				<ListItem><Link {...styles} isExternal href='https://coinmarketcap.com/currencies/vether/'>CoinMarketCap</Link></ListItem>
				<ListItem><Link {...styles} isExternal href='https://www.coingecko.com/en/coins/vether'>CoinGecko</Link></ListItem>
			</List>
		</Flex>
	)
}
