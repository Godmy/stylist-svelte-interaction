import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';

export interface RecipeFormHeader extends ComputeIntersectAll<
	[
		HTMLAttributes<HTMLDivElement>,
		{
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
		},
		SlotText
	]
> {}
