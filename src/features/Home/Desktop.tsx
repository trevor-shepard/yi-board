import React, { useState, ReactElement } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
// import { add_round } from 'assets/icons'
import CreateProject from 'components/CreateProject'
import DraggableList from 'components/DraggableGrid'
import Detail from 'features/Detail/Desktop'
import { useWindowDimensions } from 'utils/windowUtils'
import {
	PageTitle,
	LoadingImage,
	ThumbTitle,
	// Add
} from 'components/Styled'

export default function Index(): ReactElement {
	const [newProject, setNewProject] = useState(false)
	const [selected, setSelected] = useState<null | string>(null)
	const { art } = useSelector((state: RootState) => state)
	const { windowHeight, windowWidth } = useWindowDimensions()

	const pieces = Object.values(art).map(({ id, title, images, display }) => {
		const mostRecentImageKey = Object.keys(images).sort(
			(a, b) => parseInt(b) - parseInt(a)
		)[0]

		const mostRecentImage =
			images[parseInt(display ? display : mostRecentImageKey)]
		return (
			<DragItemContainer width={windowWidth / 3 - 10} key={id} onClick={() => setSelected(id)}>
				<ThumbTitle>{title}</ThumbTitle>
				<LoadingImage src={mostRecentImage} />
			</DragItemContainer>
		)
	})

	return newProject === false ? (
		<DesktopContainer>
			<Left>
				<MarginTopTitle>Projects</MarginTopTitle>
				<DraggableList
					items={pieces}
					rowSize={3}
					rowHeight={windowHeight / 3 - 20}
					colWidth={(windowWidth / 2) / 3}
					padding={windowWidth * 0.03}
				/>
			</Left>
			<Divider /> 
			<Right>
				{ selected && <Detail project={art[selected]} />}
			</Right>

			{/* <Add onClick={() => setNewProject(true)} src={add_round} /> */}
		</DesktopContainer>
	) : (
		<CreateProject hide={() => setNewProject(false)} />
	)
}

const DragItemContainer = styled.div<{ width: number }>`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: ${({ width }) => width}px;
`

const Left = styled.div`
	height: 100%;
	width: 48%;
	position: relative;
`
const Right = styled.div`
	width: 48%;
	height: 100%;
`
const Divider = styled.div`
	width: 1px;
	height: 80%;
	background-color: grey;
`

const DesktopContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

`

const MarginTopTitle = styled(PageTitle)`
	margin-bottom: 6%;
`