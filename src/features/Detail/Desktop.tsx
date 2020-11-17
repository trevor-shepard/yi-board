import React, { useEffect, ReactElement } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { Art } from 'types'
interface Props {
	project: Art
}

export default function Index({ project }: Props): ReactElement {
	return <Container></Container>
}

const Container = styled.div``
