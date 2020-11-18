import React, { useState, ReactElement } from 'react'
import styled from '@emotion/styled'
import { Art } from 'types'
import { backArrow, nextArrow, x } from 'assets/icons'
import { Thumb, PageTitle, ThumbList, ThumbImage, ThumbTitle, ContainerColumnRelative, ContainerFlexColumnSpaceBetween } from 'components/Styled'
import AddImage from 'components/AddImage'
import { Link } from 'react-router-dom'
interface Props {
	project: Art
}

export default function Index({
	project: { title, images, id }
}: Props): ReactElement {
	const [loading, setLoading] = useState(false)
	const [selected, select] = useState<null | number>(null)
	const [error, setError] = useState('')

	const sortedImageKeys = Object.keys(images).sort(
		(a, b) => parseInt(a) - parseInt(b)
	)
	const Thumbs = sortedImageKeys.map((key: string, index) => (
		<Thumb onClick={() => select(index)} key={`${title}-${key}`}>
			<ThumbTitle>
				{' '}
				{index + 1}
			</ThumbTitle>
			<ThumbImage src={images[parseInt(key)]} />
		</Thumb>
	))

	if (loading) return (<ContainerFlexColumnSpaceBetween>
		Loading
	</ContainerFlexColumnSpaceBetween>)

	return selected === null ? (
		<ContainerColumnRelative>
			<Header>
				<PageTitle>{title}</PageTitle>
				<Back to='/'>
					<Icon onClick={() => select(null)} src={x} />
				</Back>
			</Header>
			
			{error}
			<ThumbList>{Thumbs}</ThumbList>
			<AddImage id={id} setLoading={setLoading} setError={setError} />
		</ContainerColumnRelative>
	) : (
		<ContainerColumnRelative>
			<Header>
				<PageTitle>{title}</PageTitle>
				<Control>
					<Icon onClick={() => select(null)} src={x} />
					{selected < sortedImageKeys.length - 1 ? <Icon onClick={() => select(selected + 1)} src={nextArrow} /> : <Placeholder/>}
					{selected > 0 ? <Icon onClick={() => select(selected - 1)}  src={backArrow} /> : <Placeholder/>}
				</Control>
			</Header>
			
			{images[selected]}
			<ImgContainer>
				<Image src={images[parseInt(sortedImageKeys[selected])]} />
			</ImgContainer>
			
		</ContainerColumnRelative>
	)
}
const Image = styled.img`
	width: 90%;
	height: auto;
`
const Icon = styled.img`
	height: 20px;
	width: 20px;
`

const Placeholder = styled.div`
	height: 20px;
	width: 20px;
`

const Back = styled(Link)`
	margin: 5%;
	margin-bottom: 0;
`

const ImgContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

const Control = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-around;
	width: 30%;
	margin: 5%;
	margin-bottom: 0;

`