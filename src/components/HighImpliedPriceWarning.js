import React from 'react'
import PropTypes from 'prop-types'
import { Alert, AlertTitle, AlertDescription, Box, Link, UnorderedList, ListItem } from '@chakra-ui/react'
import { prettifyCurrency } from '../common/utils'

export const HighImpliedPriceWarning = (props) => {

	HighImpliedPriceWarning.propTypes = {
		vethImpliedPriceUsd: PropTypes.number,
		vethMarketPriceUsd: PropTypes.number,
	}

	return (
		<Alert status='warning' mb={2}>
			<Box flex='1'>
				<AlertTitle>Are you sure you want to burn?</AlertTitle>
				<AlertDescription display='block'>
					<UnorderedList>
						<ListItem>Implied price ({prettifyCurrency(props.vethImpliedPriceUsd, 0, 2)}) is already above market ({prettifyCurrency(props.vethMarketPriceUsd, 0, 2)})!</ListItem>
						<ListItem>Consider <Link isExternal href='https://app.uniswap.org/#/swap/0x4ba6ddd7b89ed838fed25d208d4f644106e34279' style={{ textDecoration: 'underline' }}>buying on Uniswap</Link> today instead.</ListItem>
					</UnorderedList>
				</AlertDescription>
			</Box>
		</Alert>
	)
}
