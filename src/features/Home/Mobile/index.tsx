import React, { useState, ReactElement } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Link } from 'react-router-dom'
import { add_round } from 'assets/icons'
import CreateProject from 'components/CreateProject'
import DraggableList from 'components/DraggableGrid'
import { useWindowDimensions } from 'utils/windowUtils'
import {
	ContainerColumnRelative,
	PageTitle,
	ThumbImage,
	ThumbTitle,
	Add
} from 'components/Styled'

export default function Index(): ReactElement {
	const [newProject, setNewProject] = useState(false)
	const { art } = useSelector((state: RootState) => state)
	const { windowHeight, windowWidth } = useWindowDimensions()

	const pieces = Object.values(art).map(({ id, title, images, display }) => {
		const mostRecentImageKey = Object.keys(images).sort(
			(a, b) => parseInt(b) - parseInt(a)
		)[0]

		const mostRecentImage =
			images[parseInt(display ? display : mostRecentImageKey)]
		return (
			<DragItemContainer width={windowWidth / 3 - 10} key={id}>
				<ThumbTitle>{title}</ThumbTitle>
				<Link
					to={{
						pathname: '/detail',
						state: {
							id
						}
					}}
				>
					<ThumbImage src={mostRecentImage} />
				</Link>
			</DragItemContainer>
		)
	})

	return newProject === false ? (
		<ContainerColumnRelative>
			<PageTitle>Projects</PageTitle>
			<DraggableList
				items={pieces}
				rowSize={3}
				rowHeight={windowHeight / 3 - 20}
				colWidth={windowWidth / 3}
				padding={windowWidth * 0.03}
			/>

			<Add onClick={() => setNewProject(true)} src={add_round} />
		</ContainerColumnRelative>
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
