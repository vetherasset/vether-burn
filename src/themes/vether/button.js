export default {
	baseStyle: {
		lineHeight: '0px',
		_focus: {
			boxShadow: '0 0 0 3px rgba(206, 150, 0, 0.6)',
		},
	},
	variants: {
		solid: props => ({
			bg: props.colorMode === 'dark' ? 'accent.light' : 'accent.dark',
			_hover: {
				bg: props.colorMode === 'dark' ? '#6161ff' : '#a1a1fd',
			},
			_active: {
				bg: props.colorMode === 'dark' ? '#7070ff' : '#c7c7fc',
			},
			_disabled: {
				bg: 'transparent',
			},
		}),
	},
}

