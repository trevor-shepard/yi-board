import React, { useState, ReactElement } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { ClipLoader } from 'react-spinners'
import { useDeviceOrientation } from 'utils/windowUtils'
import { Art } from 'types'
import { setDisplay } from 'store/slices/artSlice'
import { backArrow, nextArrow, x } from 'assets/icons'
import {
	Thumb,
	PageTitle,
	LandscapePageTitle,
	ThumbList,
	LoadingImage,
	ThumbTitle,
	ContainerColumnRelative,
	ContainerFlexColumnAlignCenter,
	ContainerFlexColumnSpaceBetween,
	DownloadIcon
} from 'components/Styled'
import AddImage from 'components/AddImage'
interface Props {
	project: Art
}

export default function Index({
	project: { title, images, id, display }
}: Props): ReactElement {
	const [loading, setLoading] = useState(false)
	const [selected, select] = useState<null | number>(null)
	const [error, setError] = useState('')
	const [clickDown, setClickDown] = useState(moment())
	const [clicked, setClicked] = useState<null | string>()
	const isLandscape = useDeviceOrientation()
	const sortedImageKeys = Object.keys(images).sort(
		(a, b) => parseInt(b) - parseInt(a)
	)

	const Thumbs = sortedImageKeys.map((key: string, index) => (
		<Thumb
			key={`${title}-${key}`}
			onTouchStart={() => {
				const duration = moment().diff(clickDown, 'seconds')
				setClicked(key)
				if (duration < 1 && clicked === key) {
					select(index)
				} else {
					setClickDown(moment())
				}
			}}
			onTouchEnd={() => {
				const duration = moment().diff(clickDown, 'seconds')
				if (duration < 1) {
					setDisplay(id, key)
				}
			}}
			onClick={e => e.stopPropagation()}
		>
			<ArtThumbTitle display={display ? key === display : false}>
				{' '}
				{index + 1}
			</ArtThumbTitle>
			<LoadingImage src={images[parseInt(key)]} />
		</Thumb>
	))

	if (loading)
		return (
			<ContainerFlexColumnSpaceBetween><ClipLoader/></ContainerFlexColumnSpaceBetween>
		)

	return selected === null ? (
		<ContainerColumnRelative>
			<Header>
				<PageTitle>{title}</PageTitle>
				<Back to="/">
					<Icon onClick={() => select(null)} src={x} />
				</Back>
			</Header>

			{error}
			<ThumbList>{Thumbs}</ThumbList>
			<AddImage id={id} setLoading={setLoading} setError={setError} />
		</ContainerColumnRelative>
	) : (
		<ContainerFlexColumnAlignCenter>
			<Header>
				{isLandscape ? (
					<LandscapePageTitle>{title}</LandscapePageTitle>
				) : (
					<PageTitle>{title}</PageTitle>
				)}
				<Control landscape={isLandscape}>
					<Icon onClick={() => select(null)} src={x} />
					{selected < sortedImageKeys.length - 1 ? (
						<Icon onClick={() => select(selected + 1)} src={nextArrow} />
					) : (
						<Placeholder />
					)}
					{selected > 0 ? (
						<Icon onClick={() => select(selected - 1)} src={backArrow} />
					) : (
						<Placeholder />
					)}
					<DownloadIcon image={images[parseInt(sortedImageKeys[selected])]} />
				</Control>
			</Header>

			{images[selected]}
			<Image
				landscape={isLandscape}
				src={images[parseInt(sortedImageKeys[selected])]}
			/>
		</ContainerFlexColumnAlignCenter>
	)
}

const Image = styled.img<{ landscape: boolean }>`
	width: ${({ landscape }) => (landscape ? 'auto' : '95%')};
	height: ${({ landscape }) => (landscape ? '95%' : 'auto')};
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

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`

const Control = styled.div<{ landscape: boolean }>`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-around;
	width: 30%;
	margin: ${({ landscape }) => (landscape ? '2%' : '5%')};
	margin-bottom: 0;
`
const ArtThumbTitle = styled(ThumbTitle)<{ display: boolean }>`
	/* border: 2px solid ${({ display }) =>
		display ? ' #E2BB41' : 'transparent'}; */
	color: ${({ display }) => (display ? ' #E2BB41' : 'black')};
`
