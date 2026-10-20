import BreadcrumbDropdown from './index.svelte';
import type { RecipeBreadcrumbDropdown } from '$stylist/dialog/interface/recipe/breadcrumb-dropdown';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Breadcrumb flyout; the context gives its absolute positioning a relative, tall enough box. */
export default {
	component: BreadcrumbDropdown,
	title: 'BreadcrumbDropdown',
	description: 'Dropdown flyout used by breadcrumb items with hidden siblings.',
	args: {
		open: true,
		items: [
			{
				id: 'controls',
				targetId: 'controls',
				label: 'controls',
				description: 'Interaction controls and wrappers'
			},
			{ id: 'state', targetId: 'state', label: 'state', description: 'State machines and stores' },
			{
				id: 'stories',
				targetId: 'stories',
				label: 'stories',
				description: 'Story coverage and examples'
			}
		]
	},
	controls: {
		open: { type: 'boolean' }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'position: relative; min-height: 16rem' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeBreadcrumbDropdown>;
