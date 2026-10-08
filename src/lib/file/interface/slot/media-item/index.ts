import type { MediaType } from '$stylist/file/type/alias/media-library-media-type';

export interface SlotMediaItem {
	id: string;
	name: string;
	type: MediaType;
	size: number;
	url: string;
	thumbnail?: string;
	uploadDate: Date;
	tags?: string[];
}
