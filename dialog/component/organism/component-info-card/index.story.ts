import ComponentInfoCard from './index.svelte';
import type { RecipeComponentInfoCard } from '$stylist/dialog/interface/recipe/component-info-card';
import type { ContractStory } from '$stylist/html/interface/contract/story';

export default {
	component: ComponentInfoCard,
	title: 'Component Info Card',
	description:
		'Dialog-domain component details modal with metadata, install command, usage examples, and action links.',
	args: {
		componentName: 'Button',
		propsCount: 6,
		isOpen: true,
		category: 'Dialog',
		subcategory: 'Metadata',
		description: 'A detailed component summary modal for documentation and catalog workflows.',
		examples: [
			'Open from a component catalog card',
			'Display install and usage metadata',
			'Link users to package and documentation pages'
		],
		npmPackage: '@stylist-svelte/dialog',
		version: '2.4.0',
		author: 'Stylist Svelte',
		lastUpdated: '2026-06-28'
	},
	controls: {
		componentName: { type: 'text' },
		propsCount: { type: 'number' },
		isOpen: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeComponentInfoCard>;
