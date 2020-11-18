import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '..'

import firebase, { auth, db } from 'utils/firebase'

import { UserState, User } from 'types'

const initialState: UserState = {
	username: null,
	email: null,
	uid: null,
	error: null
}

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		recieveUser(state, action: PayloadAction<User>) {
			return {
				...action.payload,
				error: null
			}
		},
		clear() {
			firebase.auth().signOut()

			return {
				username: null,
				email: null,
				uid: null,
				error: null
			}
		},
		updateUser(state, action: PayloadAction<Partial<User>>) {
			return {
				...state,
				...action.payload
			}
		},
		userError(state, action: PayloadAction<string>) {
			state.error = action.payload
			return state
		}
	}
})

export const { recieveUser, userError, clear, updateUser } = user.actions

export default user.reducer

export const login = (
	email: string,
	password: string
): AppThunk => async dispatch => {
	try {
		const uid = await auth
			.signInWithEmailAndPassword(email, password)
			.then(resp => {
				if (resp === null || resp.user === null) {
					throw new Error('user not found')
				} else {
					return resp.user.uid
				}
			})
		const user = (await db
			.collection('users')
			.doc(uid)
			.get()
			.then(doc => doc.data())) as User

		dispatch(recieveUser(user))
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const signup = (
	email: string,
	username: string,
	password: string
): AppThunk => async dispatch => {
	try {
		const uid = await auth
			.createUserWithEmailAndPassword(email, password)
			.then(resp => {
				if (resp === null || resp.user === null) {
					throw new Error('user not found')
				} else {
					return resp.user.uid
				}
			})

		await db
			.collection('users')
			.doc(uid)
			.set({
				email,
				username,
				uid
			})
		dispatch(
			recieveUser({
				email,
				username,
				uid
			})
		)
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const update = (
	id: string,
	update: Partial<User>
): AppThunk => async dispatch => {
	try {
		await db
			.collection('users')
			.doc(id)
			.update(update)
		dispatch(updateUser(update))
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const logout = (): AppThunk => async dispatch => {
	dispatch(clear())
}

export const addUserPhoto = (photo: string): AppThunk => async (
	dispatch,
	getState
) => {
	const { user } = getState()

	const uid = user.uid as string
	await db
		.collection('users')
		.doc(uid)
		.update({
			photo
		})

	dispatch(updateUser({ photo }))
}
