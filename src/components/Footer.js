import React from 'react'
import { Flex, Heading, HeadingProps, HStack, Link, LinkProps, List, ListItem } from '@chakra-ui/react'

const FooterHeading = (props: HeadingProps) => (
	<Heading size='sm' {...props} />
)

const FooterLink = (props: LinkProps) => (
	<Link size='sm' {...props} />
)

export const Footer = (props) => {
	return (
		<Flex {...props} w='100%'>
			<HStack spacing={8} align='top'>
				<List>
					<ListItem><FooterHeading>Information</FooterHeading></ListItem>
					<ListItem><FooterLink isExternal href='https://wp.vetherasset.io/'>Whitepaper</FooterLink></ListItem>
					<ListItem><FooterLink isExternal href='https://github.com/vetherasset'>GitHub</FooterLink></ListItem>
					<ListItem><FooterLink isExternal href='https://etherscan.io/address/0x4ba6ddd7b89ed838fed25d208d4f644106e34279'>VETH contract</FooterLink></ListItem>
					<ListItem><FooterLink isExternal href='https://etherscan.io/address/0x0111011001100001011011000111010101100101'>Burnt ETH</FooterLink></ListItem>
				</List>
				<List>
					<ListItem><FooterHeading>Social</FooterHeading></ListItem>
					<ListItem><FooterLink isExternal href='https://discord.gg/c5aBC7Q'>Discord</FooterLink></ListItem>
					<ListItem><FooterLink isExternal href='https://t.me/vetherasset'>Telegram</FooterLink></ListItem>
					<ListItem><FooterLink isExternal href='https://twitter.com/strictly_scarce'>Twitter</FooterLink></ListItem>
					<ListItem><FooterLink isExternal href='https://bitcointalk.org/index.php?topic=5243406'>BitcoinTalk</FooterLink></ListItem>
				</List>
				<List>
					<ListItem><FooterHeading>Exchanges</FooterHeading></ListItem>
					<ListItem><FooterLink isExternal href='https://uniswap.exchange/swap/0x4ba6ddd7b89ed838fed25d208d4f644106e34279'>Uniswap</FooterLink></ListItem>
					<ListItem><FooterLink isExternal href='https://trade.resfinex.com/?pair=VETH_ETH'>Resfinex</FooterLink></ListItem>
				</List>
				<List>
					<ListItem><FooterHeading>Trackers</FooterHeading></ListItem>
					<ListItem><FooterLink isExternal href='https://coinmarketcap.com/currencies/vether/'>CoinMarketCap</FooterLink></ListItem>
					<ListItem><FooterLink isExternal href='https://www.coingecko.com/en/coins/vether'>CoinGecko</FooterLink></ListItem>
				</List>
			</HStack>
		</Flex>
	)
}
