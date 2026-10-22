import PageButton from '$stylist/pager/component/atom/page-button/index.svelte';
import type { RecipePageButton } from '$stylist/pager/interface/recipe/page-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Pagination page button. */
export default {
	component: PageButton,
	title: 'PageButton',
	description: 'Pagination page button',
	args: { page: 1, isActive: false, disabled: false, variant: 'outline', size: 'md' },
	controls: {
		page: { type: 'number', min: 1 },
		isActive: { type: 'boolean' },
		disabled: { type: 'boolean' },
		variant: {
			type: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'danger', 'outline', 'ghost', 'link']
		},
		// xs … xl: the size tokens the page button styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 5) }
	},
	presets: { Active: { isActive: true } },
	layout: 'centered'
} satisfies ContractStory<RecipePageButton>;
