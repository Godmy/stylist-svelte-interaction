import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeProgressBar } from '$stylist/animation/interface/recipe/progress-bar';

export function createProgressBarState(getProps: () => RecipeProgressBar & HTMLAttributes<HTMLDivElement>) {
	const props = $derived(getProps());
	const max = $derived(Math.max(1, props.max ?? 100));
	const rawValue = $derived(props.value ?? 0);
	const value = $derived(Math.min(max, Math.max(0, rawValue)));
	const percentage = $derived(Math.round((value / max) * 100));
	const label = $derived(props.label ?? 'Progress');
	const valueLabel = $derived(props.valueLabel ?? `${percentage}%`);
	const classes = $derived(
		['information-progress-bar', typeof props.class === 'string' ? props.class : '']
			.filter(Boolean)
			.join(' ')
	);
	const style = $derived(
		[
			props.style,
			props.color ? `--information-progress-color: ${props.color};` : '',
			props.trackColor ? `--information-progress-track-color: ${props.trackColor};` : ''
		]
			.filter(Boolean)
			.join(' ')
	);
	const fillStyle = $derived(`width: ${percentage}%;`);

	return {
		get classes() {
			return classes;
		},
		get value() {
			return value;
		},
		get max() {
			return max;
		},
		get percentage() {
			return percentage;
		},
		get label() {
			return label;
		},
		get valueLabel() {
			return valueLabel;
		},
		get style() {
			return style;
		},
		get fillStyle() {
			return fillStyle;
		}
	};
}
