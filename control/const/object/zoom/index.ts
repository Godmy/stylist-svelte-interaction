import type { Zoom } from '$stylist/control/type/struct/zoom/zoom';

export const TOKEN_ZOOM = {
	text: {
		id: 'text',
		label: 'Text',
		display: 'number',
		steps: [
			{ id: 1, value: 10, label: '10' },
			{ id: 2, value: 12, label: '12' },
			{ id: 3, value: 14, label: '14' },
			{ id: 4, value: 16, label: '16' },
			{ id: 5, value: 18, label: '18' },
			{ id: 6, value: 20, label: '20' },
			{ id: 7, value: 24, label: '24' },
			{ id: 8, value: 28, label: '28' },
			{ id: 9, value: 32, label: '32' }
		]
	},
	line: {
		id: 'line',
		label: 'Line',
		display: 'icon',
		steps: [
			{ id: 1, value: 1, label: '1', preview: 'line-1' },
			{ id: 2, value: 2, label: '2', preview: 'line-2' },
			{ id: 3, value: 3, label: '3', preview: 'line-3' },
			{ id: 4, value: 4, label: '4', preview: 'line-4' },
			{ id: 5, value: 5, label: '5', preview: 'line-5' },
			{ id: 6, value: 6, label: '6', preview: 'line-6' },
			{ id: 7, value: 7, label: '7', preview: 'line-7' },
			{ id: 8, value: 8, label: '8', preview: 'line-8' },
			{ id: 9, value: 9, label: '9', preview: 'line-9' }
		]
	},
	space: {
		id: 'space',
		label: 'Space',
		display: 'number',
		steps: [
			{ id: 0, value: 0, label: '0' },
			{ id: 1, value: 2, label: '2' },
			{ id: 2, value: 4, label: '4' },
			{ id: 3, value: 8, label: '8' },
			{ id: 4, value: 12, label: '12' },
			{ id: 5, value: 16, label: '16' },
			{ id: 6, value: 24, label: '24' },
			{ id: 7, value: 32, label: '32' },
			{ id: 8, value: 40, label: '40' }
		]
	},
	size: {
		id: 'size',
		label: 'Size',
		display: 'number',
		steps: [
			{ id: 1, value: 12, label: '12' },
			{ id: 2, value: 16, label: '16' },
			{ id: 3, value: 20, label: '20' },
			{ id: 4, value: 24, label: '24' },
			{ id: 5, value: 32, label: '32' },
			{ id: 6, value: 40, label: '40' },
			{ id: 7, value: 48, label: '48' },
			{ id: 8, value: 64, label: '64' }
		]
	},
	radius: {
		id: 'radius',
		label: 'Radius',
		display: 'preview',
		steps: [
			{ id: 0, value: 0, label: '0', preview: 'radius-0' },
			{ id: 1, value: 2, label: '2', preview: 'radius-1' },
			{ id: 2, value: 4, label: '4', preview: 'radius-2' },
			{ id: 3, value: 8, label: '8', preview: 'radius-3' },
			{ id: 4, value: 12, label: '12', preview: 'radius-4' },
			{ id: 5, value: 16, label: '16', preview: 'radius-5' },
			{ id: 6, value: 24, label: '24', preview: 'radius-6' },
			{ id: 7, value: 9999, label: 'full', preview: 'radius-full' }
		]
	}
} as const satisfies Record<string, Zoom>;
