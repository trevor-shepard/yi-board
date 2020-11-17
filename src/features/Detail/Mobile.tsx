import React, { useState, ReactElement } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { Art } from 'types'
import { add_round, backArrow, nextArrow } from 'assets/icons'
interface Props {
	project: Art
}

export default function Index({
	project: { title, images }
}: Props): ReactElement {
	const [selected, select] = useState<null | number>(null)
	const sortedImages = Object.keys(images).sort(
		(a, b) => parseInt(b) - parseInt(a)
	)
	const ImageList = sortedImages.map((key: string, index) => (
		<Thumb
			onClick={() => select(index)}
			src={images[parseInt(key)]}
			key={`${title}-${key}`}
		/>
	))

	return selected === null ? (
		<Container>
			<Title>{title}</Title>
			{ImageList}
			<Add src={add_round} />
		</Container>
	) : (
		<Container>
			<Title>{title}</Title>
			<Image src={images[selected]} />
			{selected > 0 && <Left src={backArrow} />}
			{selected < sortedImages.length && <Right src={nextArrow} />}
		</Container>
	)
}
const Container = styled.div`
	position: relative;
`
const Title = styled.div``
const Thumb = styled.img``
const Image = styled.img``
const Left = styled.img``
const Right = styled.img``

const Add = styled.img`
	position: absolute;
	bottom: 10%;
	right: 10%;
`
