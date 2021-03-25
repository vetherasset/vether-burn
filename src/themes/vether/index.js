import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import typography from './typography'
import colors from './colors'
import button from './button'
import input from './input'

const overrides = {
	useSystemColorMode: false,
	initialColorMode: 'dark',
	styles: {
		global: props => ({
			body: {
				fontFamily: 'Body',
				bg: mode('#ffffff', '#110D02')(props),
			},
		}),
	},
	textStyles: typography,
	colors: colors,
	components: {
		Button: button,
		Input: input,
	},
}

export default extendTheme(overrides)
