import ZoomControls from '$stylist/control/component/atom/zoom-controls/index.svelte';
import type { RecipeZoomControls } from '$stylist/control/interface/recipe/zoom-controls';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Zoom controls for canvas and design tools. */
export default {
	component: ZoomControls,
	title: 'ZoomControls',
	description: 'Zoom controls for canvas and design tools',
	args: { initialValue: 100, minZoom: 50, maxZoom: 200, step: 10, showPercentage: true },
	controls: {
		initialValue: { type: 'range', min: 50, max: 200, step: 10 },
		minZoom: { type: 'number' },
		maxZoom: { type: 'number' },
		step: { type: 'number', min: 1 },
		showPercentage: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeZoomControls>;
