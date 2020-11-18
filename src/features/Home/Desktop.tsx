import React, { ReactElement } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

interface Props {}

export default function Index(): ReactElement {
	const { art } = useSelector((state: RootState) => state)
	const pieces = Object.values(art).map(({ title, images }) => {
		return <>{title}</>
	})

	return <Container>{pieces}</Container>
}

const Container = styled.div``
