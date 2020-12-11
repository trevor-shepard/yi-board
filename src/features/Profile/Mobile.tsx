import React, { ReactElement } from 'react'
import { UserState } from 'types'
import { useDispatch } from 'react-redux'
import { logout } from 'store/slices/userSlice'
import { Link } from 'react-router-dom'
interface Props {
	user: UserState
}

export default function ProfileMobile({
	user: { username, email }
}: Props): ReactElement {
	const dispatch = useDispatch()
	return (
		<>
			{username}
			{email}
			<Link to="/">go back</Link>
			<div onClick={() => dispatch(logout)}>go back</div>
		</>
	)
}
