import { useState, useEffect } from 'react'

function getWindowDimensions() {
	const { innerWidth: windowWidth, innerHeight: windowHeight } = window
	return {
		windowWidth,
		windowHeight
	}
}

export function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	)

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions())
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowDimensions
}

export const useDeviceOrientation = () => {
	const [isLandscape, setIsLandscape] = useState(false)

	useEffect(() => {
		const mql = window.matchMedia('(orientation: landscape)')
		screenTest(mql)
		// Listen to device orientation change
		mql.addListener(screenTest)
		// Unbind event listeners
		return () => {
			mql.removeListener(screenTest)
		}
	}, [isLandscape])

	const screenTest = e => {
		if (e.matches) {
			setIsLandscape(true)
		} else {
			setIsLandscape(false)
		}
	}

	return isLandscape
}
