import React from 'react'
import { Button, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { FaDiscord, FaTelegramPlane, FaGithub } from 'react-icons/fa'
import { IoIosPaper } from 'react-icons/io'
import { MdHelp } from 'react-icons/md'

const linkStyle = {
	width: '100%',
	display: 'inline-block',
	padding: '0 0.8rem',
	_hover: {
		textDecoration: 'none',
	},
}

const iconStyle = {
	display: 'inline-block',
	marginInlineEnd: '0.6rem',
	fontSize: '0.9rem',
}

const menuItemStyle = {
	paddingInlineEnd: '0',
	paddingInlineStart: '0',
}

export const InfoMenu = (props) => {
	return (
		<Menu>
			<MenuButton as={Button} ml={'0.6rem'} fontSize={{ base: '0.65rem', sm: 'sm' }} {...props}>
				<HiDotsHorizontal/>
			</MenuButton>
			<MenuList>
				<MenuItem {...menuItemStyle}>
					<Link {...linkStyle} isExternal href='https://app.uniswap.org/#/swap/0x4ba6ddd7b89ed838fed25d208d4f644106e34279'>
						<FaDiscord style={iconStyle}/>
						Uniswap
					</Link>
				</MenuItem>
				<MenuItem {...menuItemStyle}>
					<Link {...linkStyle} isExternal href='https://wp.vetherasset.io/'>
						<IoIosPaper style={iconStyle}/>
						Whitepaper
					</Link>
				</MenuItem>
				<MenuItem {...menuItemStyle}>
					<Link {...linkStyle} isExternal href='https://docs.vetherasset.io/'>
						<MdHelp style={iconStyle}/>
						Docs
					</Link>
				</MenuItem>
				<MenuItem {...menuItemStyle}>
					<Link {...linkStyle} isExternal href='https://discord.com/invite/c5aBC7Q'>
						<FaDiscord style={iconStyle}/>
						Discord
					</Link>
				</MenuItem>
				<MenuItem {...menuItemStyle}>
					<Link {...linkStyle} isExternal href='https://t.me/vaderprotocol'>
						<FaTelegramPlane style={iconStyle}/>
						Telegram
					</Link>
				</MenuItem>
				<MenuItem {...menuItemStyle}>
					<Link {...linkStyle} isExternal href='https://github.com/vetherasset/'>
						<FaGithub style={iconStyle}/>
						Github
					</Link>
				</MenuItem>
			</MenuList>
		</Menu>
	)
}
