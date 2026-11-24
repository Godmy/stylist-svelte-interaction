import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSelectable } from '$stylist/control/interface/behavior/selectable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeTagInput extends ComputeIntersectAll<
	[
		HTMLAttributes<HTMLDivElement>,
		{
			tags?: string[];
			placeholder?: string;
			disabled?: boolean;
			maxTags?: number;
			delimiter?: string;
			validator?: (tag: string) => boolean;
			class?: string;
			inputClass?: string;
			tagClass?: string;
			removeButtonClass?: string;
			onInput?: (tags: string[]) => void;
			onChange?: (tags: string[]) => void;
		},
		SlotText,
		Omit<BehaviorSelectable<string[]>, 'onChange'>,
		BehaviorFocusable,
		BehaviorSizable
	]
> {}
