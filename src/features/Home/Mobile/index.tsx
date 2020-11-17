import React, { useState, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Link } from 'react-router-dom'
import { add_round } from 'assets/icons'
import CreateProject from 'components/CreateProject'
import {
	ContainerColumnRelative,
	PageTitle,
	Thumb,
	ThumbList,
	ThumbImage,
	ThumbTitle,
	Add
} from 'components/Styled'
interface Props {}

export default function Index(): ReactElement {
	const [newProject, setNewProject] = useState(false)
	const { art } = useSelector((state: RootState) => state)

	const pieces = Object.values(art).map(({ id, title, images }) => {
		const mostRecentImageKey = Object.keys(images).sort(
			(a, b) => parseInt(b) - parseInt(a)
		)[0]

		const mostRecentImage = images[parseInt(mostRecentImageKey)]
		return (
			<Thumb>
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
			</Thumb>
		)
	})

	return newProject === false ? (
		<ContainerColumnRelative>
			<PageTitle>Projects</PageTitle>
			<ThumbList>{pieces}</ThumbList>

			<Add onClick={() => setNewProject(true)} src={add_round} />
		</ContainerColumnRelative>
	) : (
		<CreateProject hide={() => setNewProject(false)} />
	)
}
