import React, { useEffect, FunctionComponent } from 'react'
import { subscribeToArts } from 'store/slices/artSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
const Subscribe: FunctionComponent = ({ children }) => {
	const dispatch = useDispatch()
	const {uid} = useSelector((state: RootState) => state.user)
	useEffect(() => subscribeToArts(dispatch, uid as string), [dispatch, uid])

	return <>{children}</>
}

export default Subscribe
