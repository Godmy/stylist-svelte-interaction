import Combobox from './index.svelte';
import type { RecipeCombobox } from '$stylist/control/interface/recipe/combobox';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Searchable combobox for selecting an integration from a practical list. */
export default {
	component: Combobox,
	title: 'Combobox',
	description: 'Searchable combobox for selecting an integration from a practical list.',
	args: {
		id: 'demo-combobox',
		items: [
			{ id: 'stripe', label: 'Stripe', description: 'Card payments and billing', meta: 'Finance' },
			{
				id: 'linear',
				label: 'Linear',
				description: 'Issue tracking for product teams',
				meta: 'Ops'
			},
			{ id: 'github', label: 'GitHub', description: 'Code hosting and pull requests', meta: 'Dev' },
			{ id: 'figma', label: 'Figma', description: 'Design files and prototypes', meta: 'Design' },
			{ id: 'notion', label: 'Notion', description: 'Workspace docs and databases', meta: 'Docs' },
			{ id: 'slack', label: 'Slack', description: 'Team communication channels', meta: 'Chat' }
		],
		label: 'Integration',
		description: 'Search services by name, domain, or use case.',
		placeholder: 'Search integrations...',
		value: '',
		disabled: false,
		clearable: true,
		loading: false,
		emptyText: 'No integrations found'
	},
	controls: {
		label: { type: 'text' },
		description: { type: 'text' },
		placeholder: { type: 'text' },
		value: {
			type: 'select',
			options: ['', 'stripe', 'linear', 'github', 'figma', 'notion', 'slack']
		},
		disabled: { type: 'boolean' },
		clearable: { type: 'boolean' },
		loading: { type: 'boolean' },
		emptyText: { type: 'text' }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'max-width: 30rem' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeCombobox>;
