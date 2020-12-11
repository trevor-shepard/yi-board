import React, { ReactElement } from 'react'
import { UserState } from 'types'

interface Props {
	user: UserState
}

export default function ProfileMobile({
	user: { username, email }
}: Props): ReactElement {
	return (
		<>
			{username}
			{email}
		</>
	)
}
