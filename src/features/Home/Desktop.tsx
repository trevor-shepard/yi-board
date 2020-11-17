import React, { useEffect, ReactElement } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { subscribeToArts } from 'store/slices/artSlice'

interface Props {}

export default function Index(): ReactElement {
	const dispatch = useDispatch()
	const { art } = useSelector((state: RootState) => state)
	useEffect(() => subscribeToArts(dispatch), [dispatch, art])
	const pieces = Object.values(art).map(({ title, images }) => {
		return <>{title}</>
	})

	return <Container>{pieces}</Container>
}

const Container = styled.div``
