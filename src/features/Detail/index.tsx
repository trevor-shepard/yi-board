import React from 'react'
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive'
import Mobile from 'features/Detail/Mobile'
import Desktop from 'features/Detail/Desktop'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { useLocation, useHistory } from 'react-router-dom'

interface LocationState {
	state: {
		id: string
	}
}

export default function Index() {
	const history = useHistory()
	const { art } = useSelector((state: RootState) => state)
	const { state } = useLocation() as LocationState
	if (!state || !state.id || !Object.keys(art).includes(state.id))
		history.push('/')

	const project = art[state.id]

	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	})

	return (
		<Container>
			{isTabletOrMobileDevice ? (
				<Mobile project={project} />
			) : (
				<Desktop project={project} />
			)}
		</Container>
	)
}

const Container = styled.div``
