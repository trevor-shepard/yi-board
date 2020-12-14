import React, { useState, ReactElement, FormEvent } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { createArt } from 'store/slices/artSlice'
import TextInput from 'components/inputs/Text'
import { x, camera_create } from 'assets/icons'
import {
	ContainerColumnRelative,
	PageTitle,
	ContainerFlexColumnSpaceBetween,
	SubmitButton
} from 'components/Styled'
interface Props {
	hide: () => void
}

export default function Index({ hide }: Props): ReactElement {
	const dispatch = useDispatch()
	const [title, setTitle] = useState('')
	const [loading, setLoading] = useState(false)
	const [imageAsFile, setImageAsFile] = useState<null | File>(null)
	const [fileAsImage, setFileAsImage] = useState<null | string>(null)
	const [error, setError] = useState('')
	const handleImageAsFile = (event: FormEvent) => {
		const target = event.target as HTMLInputElement
		const files = target.files
		if (files === null) return setError('no image found')
		const file = files[0]
		const image = URL.createObjectURL(file)
		setImageAsFile(file)
		setFileAsImage(image)
	}

	const handleSubmit = async () => {
		if (title === '') {
			setError('please name your project')
		} else if (imageAsFile === null) {
			setError('please add a photo')
		} else {
			setLoading(true)
			try {
				await dispatch(createArt(title, imageAsFile))
				hide()
			} catch (error) {
				setError(error.message)
				setLoading(false)
			}
		}
	}
	return loading ? (
		<>loading</>
	) : (
		<ContainerColumnRelative onClick={(e) => e.stopPropagation()}>
			<Exit onClick={hide} src={x} />
			<PageTitle>Start a New Project</PageTitle>
			{error}

			<ContainerFlexColumnSpaceBetween>
				<TextInput
					handleInput={e => setTitle(e.target.value)}
					value={title}
					label="title"
				/>
				<FileInputLabel>
					<Image
						src={fileAsImage ? fileAsImage : camera_create}
						icon={fileAsImage !== null}
					/>
					<FileInput id="upload" type="file" onChange={handleImageAsFile} />
				</FileInputLabel>
				<MarginButton onClick={handleSubmit}>submit</MarginButton>
			</ContainerFlexColumnSpaceBetween>
		</ContainerColumnRelative>
	)
}

const Exit = styled.img`
	position: absolute;
	right: 20px;
	top: 10px;
	height: 25px;
	width: 25px;
	color: black;
`

const Image = styled.img<{ icon: boolean }>`
	width: ${({ icon }) => (icon ? '80%' : '60%')};
	height: auto;
	border-radius: 100px;
	object-fit: cover;
`
const FileInput = styled.input`
	display: none;
	font-size: 16px;
`
const FileInputLabel = styled.label`
	width: 100%;
	text-align: center;
`

const MarginButton = styled(SubmitButton)`
	margin-bottom: 10%;
`
