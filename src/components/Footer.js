import React from 'react'
import { Flex, Link, useBreakpointValue, Image } from '@chakra-ui/react'
import { FaDiscord, FaTelegramPlane, FaGithub } from 'react-icons/fa'
import { IoIosPaper } from 'react-icons/io'
import { MdHelp } from 'react-icons/md'
import UniswapIcon from '../assets/svg/uniswap.svg'

export const Footer = (props) => {

	return (
		<>
			{useBreakpointValue({
				base: <Links {...props}/>,
				sm: '',
			})}
		</>
	)
}

const Links = (props) => {

	const linkStyle = {
		margin: '10px 20px',
	}

	const iconStyle = {
		display: 'inline-block',
		marginInlineEnd: '0.5rem',
		fontSize: '0.83rem',
		verticalAlign: 'baseline',
	}

	return(
		<Flex {...props} w='100%' mb='15px' justifyContent='space-between' flexWrap='wrap'>
			<Link {...linkStyle} isExternal href='https://discord.gg/c5aBC7Q'>
				<Image src={UniswapIcon} display='inline-block' marginInlineEnd='0.5rem' width='14.4px' verticalAlign='baseline' />
				Uniswap
			</Link>
			<Link {...linkStyle} isExternal href='https://discord.gg/c5aBC7Q'>
				<IoIosPaper style={iconStyle}/>
				Whitepaper
			</Link>
			<Link {...linkStyle} isExternal href='https://discord.gg/c5aBC7Q'>
				<MdHelp style={iconStyle}/>
				Docs
			</Link>
			<Link {...linkStyle} isExternal href='https://discord.gg/c5aBC7Q'>
				<FaDiscord style={iconStyle}/>
				Discord
			</Link>
			<Link {...linkStyle} isExternal href='https://discord.gg/c5aBC7Q'>
				<FaTelegramPlane style={iconStyle}/>
				Telegram
			</Link>
			<Link {...linkStyle} isExternal href='https://discord.gg/c5aBC7Q'>
				<FaGithub style={iconStyle}/>
				Github
			</Link>
		</Flex>
	)
}