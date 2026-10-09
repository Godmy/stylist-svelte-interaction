import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeSpinner } from '$stylist/animation/interface/recipe/spinner';

export function createSpinnerState(
	getProps: () => RecipeSpinner & HTMLAttributes<HTMLSpanElement>
) {
	const props = $derived(getProps());
	const size = $derived(props.size ?? 'md');
	const label = $derived(props.label ?? 'Loading');
	const classes = $derived(
		ClassNamesManager.merge(
			'information-spinner',
			`information-spinner--${size}`,
			props.class == null ? '' : String(props.class)
		)
	);

	return {
		get classes() {
			return classes;
		},
		get label() {
			return label;
		}
	};
}
