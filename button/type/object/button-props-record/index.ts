import type { HTMLButtonAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { RecipeContainer } from '$stylist/layout/interface/recipe/container';
import type { RecipeBackground } from '$stylist/layout/interface/recipe/background';
import type { RecipeBorder } from '$stylist/layout/interface/recipe/border';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TokenSize } from '$stylist/theme/type/alias/size';

export type ButtonPropsRecord = HTMLButtonAttributes &
	RecipeContainer &
	RecipeBackground &
	RecipeBorder &
	BehaviorClickable & {
		variant?: TokenColorTone;
		size?: TokenSize;
		loading?: boolean;
		block?: boolean;
		loadingLabel?: string;
		children?: Snippet;
		class?: string;
	} & Record<string, unknown>;
