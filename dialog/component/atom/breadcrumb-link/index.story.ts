import BreadcrumbLink from '$stylist/dialog/component/atom/breadcrumb-link/index.svelte';
import type { RecipeBreadcrumbLink } from '$stylist/dialog/interface/recipe/breadcrumb-link';
import type { ContractStory } from '$stylist/html/interface/contract/story';

export default {
	component: BreadcrumbLink,
	title: 'BreadcrumbLink',
	description: 'Single link or current text node in breadcrumb chains.',
	args: {
		href: '/products',
		current: false
	},
	controls: {
		href: { type: 'text' },
		current: { type: 'boolean' }
	},
	content: [{ kind: 'text', value: 'Products' }]
} satisfies ContractStory<RecipeBreadcrumbLink>;
