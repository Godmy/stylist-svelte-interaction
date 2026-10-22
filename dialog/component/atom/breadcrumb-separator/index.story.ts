import BreadcrumbSeparator from '$stylist/dialog/component/atom/breadcrumb-separator/index.svelte';
import type { RecipeBreadcrumbSeparator } from '$stylist/dialog/interface/recipe/breadcrumb-separator';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** The context places the separator between two crumbs, as in a breadcrumb chain. */
export default {
	component: BreadcrumbSeparator,
	title: 'BreadcrumbSeparator',
	description: 'Separator element used between breadcrumb items.',
	args: {},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'display: flex; align-items: center; font-size: 0.875rem' },
		children: [
			{ kind: 'element', tag: 'span', children: [{ kind: 'text', value: 'Home' }] },
			{ kind: 'outlet' },
			{ kind: 'element', tag: 'span', children: [{ kind: 'text', value: 'Catalog' }] }
		]
	}
} satisfies ContractStory<RecipeBreadcrumbSeparator>;
