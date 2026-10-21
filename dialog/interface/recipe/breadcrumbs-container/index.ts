import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';

/** Props of the atom `Breadcrumbs` nav container (the molecule owns `RecipeBreadcrumbs`). */
export interface RecipeBreadcrumbsContainer extends HTMLAttributes<HTMLElement> {
	children?: Snippet;
	class?: string;
}
