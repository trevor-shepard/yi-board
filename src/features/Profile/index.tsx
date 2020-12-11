import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Mobile from 'features/Profile/Mobile'
import Desktop from 'features/Profile/Desktop'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

export default function Index() {
	const { user } = useSelector((state: RootState) => state)

	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	})

	return (
		<>
			{isTabletOrMobileDevice ? (
				<Mobile user={user} />
			) : (
				<Desktop user={user} />
			)}
		</>
	)
}
