import type { HTMLLabelAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeFormConsent extends ComputeIntersectAll<
	[Omit<HTMLLabelAttributes, 'children'>]
> {
	name?: string;
	value?: string;
	required?: boolean;
	/** Bindable, so a form can keep its submit button disabled until consent is given. */
	checked?: boolean;
	/** Consent wording, usually with links to the consent and privacy documents. */
	children: Snippet;
}
