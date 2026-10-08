import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
export interface SlotFormHeader extends HTMLAttributes<HTMLDivElement> {
	title: string;
	subtitle?: string;
	description?: string;
	actions?: Snippet;
	backAction?: () => void;
	backButtonLabel?: string;
	class?: string;
	titleClass?: string;
	subtitleClass?: string;
	descriptionClass?: string;
	actionsClass?: string;
	backButtonClass?: string;
}
