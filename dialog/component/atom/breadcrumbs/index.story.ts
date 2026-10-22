import Breadcrumbs from '$stylist/dialog/component/atom/breadcrumbs/index.svelte';
import type { RecipeBreadcrumbsContainer } from '$stylist/dialog/interface/recipe/breadcrumbs-container';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Nav container; index.story.svelte fills it with BreadcrumbLink and BreadcrumbSeparator. */
export default {
	component: Breadcrumbs,
	title: 'Breadcrumbs Atom',
	description: 'Low-level breadcrumb navigation container for custom breadcrumb compositions.',
	args: {}
} satisfies ContractStory<RecipeBreadcrumbsContainer>;
