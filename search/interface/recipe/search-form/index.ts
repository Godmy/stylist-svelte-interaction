import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlForm } from '$stylist/html/interface/recipe/form';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';

/** `<search><form>` submitting one named query; form attributes reach `<form>`. */
export interface RecipeSearchForm extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlForm, 'children' | 'class' | 'name'>,
		{
			/** Query text (`bind:query`). */
			query?: string;
			placeholder?: string;
			/**
			 * Field name submitted with the form.
			 * @default 'q'
			 */
			name?: string;
			/** @default 'Search' */
			submitLabel?: string;
			class?: string;
			/** Called on submit; when set, the native submission is prevented. */
			onSearch?: (query: string) => void;
		},
		SlotSearchSkin
	]
> {}
