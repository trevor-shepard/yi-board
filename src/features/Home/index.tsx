import React from 'react'
import styled from '@emotion/styled'
import { useMediaQuery } from 'react-responsive'
import Mobile from 'features/Home/Mobile'
import Desktop from 'features/Home/Desktop'
export default function Index() {
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	})

	return (
		<Container>{isTabletOrMobileDevice ? <Mobile /> : <Desktop />}</Container>
	)
}

const Container = styled.div``
