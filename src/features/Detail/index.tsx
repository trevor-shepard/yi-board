import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Mobile from 'features/Detail/Mobile'
import Desktop from 'features/Detail/Desktop'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { useLocation, Link } from 'react-router-dom'
import { ContainerFlexColumnSpaceBetween } from 'components/Styled'

interface LocationState {
	state: {
		id: string
	}
}

export default function Index() {
	const { art } = useSelector((state: RootState) => state)
	const { state } = useLocation() as LocationState
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	})
	if (!state || !state.id || !Object.keys(art).includes(state.id))
		return (
			<ContainerFlexColumnSpaceBetween>
				<Link to="/">Having trouble finding that project, please go back</Link>
			</ContainerFlexColumnSpaceBetween>
		)
	const project = art[state.id]

	return (
		<>
			{isTabletOrMobileDevice ? (
				<Mobile project={project} />
			) : (
				<Desktop project={project} />
			)}
		</>
	)
}
