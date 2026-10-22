import ToolButton from '$stylist/button/component/atom/tool-button/index.svelte';
import type { RecipeToolButton } from '$stylist/button/interface/recipe/tool-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Toolbar button for a design-canvas-style toolbar. */
export default {
	component: ToolButton,
	title: 'ToolButton',
	description:
		'Toolbar button for a design-canvas-style toolbar. Click a tool below to make it active — only one tool is active at a time, like a real toolbar.',
	args: { label: 'Tool' },
	controls: { label: { type: 'text' } }
} satisfies ContractStory<RecipeToolButton>;
