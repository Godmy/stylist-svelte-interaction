import BottomSheet from '$stylist/navigation/component/organism/bottom-sheet/index.svelte';
import type { RecipeBottomSheet } from '$stylist/navigation/interface/recipe/bottom-sheet';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Mobile bottom sheet dialog with a header, body and action footer. */
export default {
	component: BottomSheet,
	title: 'BottomSheet',
	description:
		'Mobile bottom sheet dialog with a backdrop, a title header, a body and an optional actions footer. Escape or the close button dismisses it when closable.',
	args: { open: true, title: 'Booking details', closable: true },
	controls: {
		open: { type: 'boolean' },
		title: { type: 'text' },
		closable: { type: 'boolean' }
	},
	layout: 'fullscreen'
} satisfies ContractStory<RecipeBottomSheet>;
