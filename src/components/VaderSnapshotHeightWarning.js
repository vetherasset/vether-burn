import React from 'react'
import PropTypes from 'prop-types'
import {
	AlertIcon, Box, Alert, AlertTitle, AlertDescription,
	CloseButton,
} from '@chakra-ui/react'

export const VaderSnapshotHeightWarning = (props) => {

	VaderSnapshotHeightWarning.propTypes = {
		state: PropTypes.any.isRequired,
		setState: PropTypes.any.isRequired,
	}

	return (
		<Alert
			background='rgba(254, 178, 178, 0.65)'
			status='error'
			variant='subtle'
			flexDirection='row'
			width='100%'
			justifyContent='center'
			textAlign='justify'
			display={props.state < 1 ? 'none' : 'flex'}
			marginBottom='0.5rem'
		>
			<AlertIcon color='red.500' />
			<Box flex='1'>
				<AlertTitle>No more eligible burning for Vader claim</AlertTitle>
				<AlertDescription display='block'>
						Any burn done now <b><i>will not</i></b> make you eligible to claim Vader asset.
				</AlertDescription>
			</Box>
			<CloseButton position="absolute" right="8px" top="8px" onClick={() => props.setState(0)}/>
		</Alert>
	)
}
