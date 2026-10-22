import Pagination from '$stylist/pager/component/organism/pagination/index.svelte';
import type { RecipePagination } from '$stylist/pager/interface/recipe/pagination';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Page navigation with first/last, prev/next and dots. */
export default {
	component: Pagination,
	title: 'Pagination',
	description: 'A component for navigating through multiple pages of content.',
	args: {
		currentPage: 1,
		totalPages: 10,
		showFirstLast: true,
		showPrevNext: true,
		showDots: true,
		maxVisible: 5
	},
	controls: {
		currentPage: { type: 'select', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
		totalPages: { type: 'select', options: [5, 10, 15, 20] },
		showFirstLast: { type: 'boolean' },
		showPrevNext: { type: 'boolean' },
		showDots: { type: 'boolean' },
		maxVisible: { type: 'select', options: [3, 5, 7, 9] }
	},
	presets: { Middle: { currentPage: 5, totalPages: 20 } },
	layout: 'centered'
} satisfies ContractStory<RecipePagination>;
