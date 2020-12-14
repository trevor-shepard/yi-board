import React, { useState, ReactElement, useRef, useLayoutEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { ClipLoader } from 'react-spinners'
import { Art } from 'types'
import { setDisplay } from 'store/slices/artSlice'
import { backArrow, nextArrow, x } from 'assets/icons'
import {
	Thumb,
	PageTitle,
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
	const sortedImageKeys = Object.keys(images).sort(
		(a, b) => parseInt(b) - parseInt(a)
	)

	

	const Thumbs = sortedImageKeys.map((key: string, index) => (
		<DesktopThumb
			key={`${title}-${key}`}
			onMouseDown={() => {
				const duration = moment().diff(clickDown, 'seconds')
				setClicked(key)
				if (duration < 1 && clicked === key) {
					select(index)
				} else {
					setClickDown(moment())
				}
			}}
			onMouseUp={() => {
				const duration = moment().diff(clickDown, 'seconds')
				if (duration < 1) {
					setDisplay(id, key)
				}
			}}
			onClick={e => e.stopPropagation()}
		>
			<ArtThumbTitle display={display ? key === display : false}>
				{index + 1}
			</ArtThumbTitle>
			<LoadingImage src={images[parseInt(key)]} />
		</DesktopThumb>
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
				<PageTitle>{title}</PageTitle>
				<Control >
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
			<ResponsiveImage
				src={images[parseInt(sortedImageKeys[selected])]}
			/>
		</ContainerFlexColumnAlignCenter>
	)
}

function ResponsiveImage({ src} : {src: string}): ReactElement {
	const ref = useRef<HTMLImageElement>(null)
	const [isImageLandscape, setIsImageLandscape] = useState(false)
	useLayoutEffect(() => {
		const current = ref.current
		if (current) {
			const height = current.clientHeight
			const width = current.clientWidth

			if (width > height) setIsImageLandscape(true)
		}
		
	}, [])

	return <Image
		ref={ref}
		landscape={isImageLandscape}
		src={src}
	/>

}



const Image = styled.img<{ landscape: boolean }>`
	width: ${({landscape}) => landscape ? '95%' : 'auto'};
	height: ${({landscape}) => landscape ?  'auto' : '90%' };
	${({landscape}) => landscape && 'margin-top: 15%;' }
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

const Control = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-around;
	width: 30%;
	margin: 5%;
	margin-bottom: 0;
	align-items: center;
`
const ArtThumbTitle = styled(ThumbTitle)<{ display: boolean }>`
	color: ${({ display }) => (display ? ' #E2BB41' : 'black')};
`

const DesktopThumb = styled(Thumb)`
	margin: 6%
`