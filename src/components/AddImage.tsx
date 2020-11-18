import React, {
	useState,
	useCallback,
	useEffect,
	ReactElement,
	FormEvent,
	Dispatch,
	SetStateAction
} from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { add_round } from 'assets/icons'
import { addImage } from 'store/slices/artSlice'

interface Props {
	id: string
	setLoading: Dispatch<SetStateAction<boolean>>
	setError: Dispatch<SetStateAction<string>>
}

export default function Index({
	id,
	setLoading,
	setError
}: Props): ReactElement {
	const dispatch = useDispatch()
	const [imageAsFile, setImageAsFile] = useState<null | File>(null)
	// const [fileAsImage, setFileAsImage] = useState<null | string>(null)
	const handleImageAsFile = (event: FormEvent) => {
		const target = event.target as HTMLInputElement
		const files = target.files
		if (files === null) return setError('no image found')
		const file = files[0]
		// const image = URL.createObjectURL(file)
		setImageAsFile(file)
		// setFileAsImage(image)
	}

	const handleUpload = useCallback(async () => {
		setLoading(true)
		if (imageAsFile) {
			setLoading(true)
			await dispatch(addImage(id, imageAsFile))
		}
		setLoading(false)
	}, [imageAsFile, setLoading, dispatch, id])

	useEffect(() => {
		if (imageAsFile !== null) handleUpload()
	}, [imageAsFile, handleUpload])

	return (
		<FileInputLabel>
			<Image src={add_round} />
			<FileInput id="upload" type="file" onChange={handleImageAsFile} />
		</FileInputLabel>
	)
}

const Image = styled.img`
	height: 40px;
	width: 40px;
	border-radius: 100px;
	object-fit: cover;
`
const FileInput = styled.input`
	display: none;
	font-size: 16 px;
`
const FileInputLabel = styled.label`
	position: absolute;
	bottom: 10%;
	right: 10%;
`
