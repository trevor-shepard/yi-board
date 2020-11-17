import styled from '@emotion/styled'

export const Container = styled.div`
	position: relative;
	height: 100vh;
	width: 100vw;
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
	width: 50px;
	margin: 10%;
	margin-top: 3%;
`

export const ThumbImage = styled.img`
	height: 40px;
	width: 40px;
`

export const ThumbTitle = styled.div`
	text-decoration: none;
	color: black;
	font-family: Poppins;
`

export const ThumbList = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
`

export const Add = styled.img`
	position: absolute;
	bottom: 10%;
	right: 10%;
`
