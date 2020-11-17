import React, { useEffect, FunctionComponent } from 'react'
import { subscribeToArts } from 'store/slices/artSlice'
import { useDispatch } from 'react-redux'

const Subscribe: FunctionComponent = ({ children }) => {
	const dispatch = useDispatch()

	useEffect(() => subscribeToArts(dispatch), [dispatch])

	return <>{children}</>
}

export default Subscribe
