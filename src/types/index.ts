export interface Art {
	title: string
	images: {
		[timestamp: number]: string
	}
	id: string
}

export interface ArtState {
	[id: string]: Art
}
