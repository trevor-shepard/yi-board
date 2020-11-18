export interface Art {
	title: string
	images: {
		[timestamp: number]: string
	}
	id: string
	owner: string
	observers: string[]
}

export interface ArtState {
	[id: string]: Art
}

export interface User {
	username: string
	uid: string
	email: string
	photo?: string
}

export interface UserState {
	username?: string | null
	uid?: string | null
	email?: string | null
	photo?: string | null
	error: string | null
}
