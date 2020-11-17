import React, { useEffect, useState, ReactElement } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { subscribeToArts } from 'store/slices/artSlice'
import { Link } from 'react-router-dom'
import { add_round } from 'assets/icons'
import CreateProject from 'components/CreateProject'
import {ContainerColumnRelative, PageTitle} from 'components/Styled'
interface Props {}

export default function Index(): ReactElement {
	const [newProject, setNewProject] = useState(false)
	const dispatch = useDispatch()
	const { art } = useSelector((state: RootState) => state)
	useEffect(() => subscribeToArts(dispatch), [dispatch])
	const pieces = Object.values(art).map(({ id, title, images }) => {
		const mostRecentImageKey = Object.keys(images).sort(
			(a, b) => parseInt(b) - parseInt(a)
		)[0]

		const mostRecentImage = images[parseInt(mostRecentImageKey)]
		return (
			<Thumb
				to={{
					pathname: '/detail',
					state: {
						id
					}
				}}
			>
				{title}
				<ImageThumb src={mostRecentImage} />
			</Thumb>
		)
	})

	return newProject === false ? (
		<ContainerColumnRelative>
			<PageTitle>Projects</PageTitle>
			<PiecesList>
				{pieces}
			</PiecesList>
			
			<Add onClick={() => setNewProject(true)} src={add_round} />
		</ContainerColumnRelative>
	) : (
		<CreateProject hide={() => setNewProject(false)} />
	)
}




const PiecesList = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
`

const Thumb = styled(Link)`
	display: flex;
	flex-direction: column;
	text-decoration: none;
	color: black;
	font-family: Poppins;
	width: 50px;
	margin: 10%;
	margin-top: 3%;
`

const ImageThumb = styled.img`
	height: 40px;
	width: 40px;
`

const Add = styled.img`
	position: absolute;
	bottom: 10%;
	right: 10%;
`
