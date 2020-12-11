import React, { ReactElement, useState } from 'react'
import styled from '@emotion/styled'
import { ClipLoader, PuffLoader } from 'react-spinners'
import { downloadIcon } from 'assets/icons'

export const Container = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
`

export const ContainerColumnRelative = styled(Container)`
	display: flex;
	flex-direction: column;
`

export const PageTitle = styled.div`
	font-family: Poppins;
	margin: 5%;
	margin-bottom: 0;
	font-size: 25px;
`
export const LandscapePageTitle = styled.div`
	font-family: Poppins;
	margin: 2%;
	margin-top: 1%;
	margin-bottom: 0;
	font-size: 25px;
`

export const ContainerFlexColumnAlignCenter = styled(Container)`
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const ContainerFlexColumnSpaceBetween = styled(
	ContainerFlexColumnAlignCenter
)`
	justify-content: space-between;
`
export const ContainerFlexColumnSpaceAround = styled(
	ContainerFlexColumnAlignCenter
)`
	justify-content: space-around;
`

export const SubmitButton = styled.button`
	font-family: Amsi Pro Narw;
	border-radius: 2px;
	border: 1px solid black;
	min-width: 200px;
	padding: 10px;
	background-color: #ffffff;
`

export const Thumb = styled.div`
	display: flex;
	flex-direction: column;
	margin: 10%;
	margin-top: 3%;
	align-items: center;
`

export const ThumbImage = styled.img<{ isLoading?: boolean }>`
	height: auto;
	width: 100px;
	${({ isLoading }) => isLoading && `display: none;`}
`
export function LoadingImage({ src }: { src: string }): ReactElement {
	const [loading, setLoading] = useState(true)

	return (
		<>
			<ThumbImage
				onContextMenu={e => e.preventDefault()}
				isLoading={loading}
				onLoad={() => {
					setLoading(false)
				}}
				src={src}
			/>
			{loading && <ClipLoader loading={loading}/>}
		</>
	)
}


export function DownloadIcon({ image }: { image: string}): ReactElement {
	const [downloading, setDownloading] = useState(false)
	
	const handleDownload = async () => {
		setDownloading(true)
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'blob';
		xhr.onload = function(event) {
			const blob = xhr.response;

			let url = window.URL.createObjectURL(blob);
			let a = document.createElement('a');
			a.href = url;
			a.download = 'image.jpg';
			a.click();
			setDownloading(false)
		};
		xhr.open('GET', image);
		xhr.send();
	  }
	  
	  
	  
	return downloading ? <PuffLoader size={23} /> : <DlIcon  src={downloadIcon} onClick={handleDownload}  />
	
  }

  const DlIcon = styled.img`
	height: 23px;
	width: auto;
  `

export const ThumbTitle = styled.div`
	text-decoration: none;
	color: black;
	font-family: Poppins;
	display: inline;
`

export const ThumbList = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
	overflow-y: scroll;
`

export const Add = styled.img`
	position: absolute;
	bottom: 10%;
	right: 10%;
`
