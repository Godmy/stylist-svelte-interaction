import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeSkeleton } from '$stylist/animation/interface/recipe/skeleton';

export function createSkeletonState(
	getProps: () => RecipeSkeleton & HTMLAttributes<HTMLDivElement>
) {
	const props = $derived(getProps());
	const variant = $derived(props.variant ?? 'rectangle');
	const animated = $derived(props.animated ?? true);
	const lines = $derived(Math.max(1, Math.floor(props.lines ?? 1)));
	const classes = $derived(
		ClassNamesManager.merge(
			'information-skeleton',
			`information-skeleton--${variant}`,
			animated ? 'information-skeleton--animated' : '',
			props.class == null ? '' : String(props.class)
		)
	);
	const style = $derived(
		[
			props.style,
			props.width ? `--information-skeleton-width: ${props.width}px;` : '',
			props.height ? `--information-skeleton-height: ${props.height}px;` : ''
		]
			.filter(Boolean)
			.join(' ')
	);

	return {
		get classes() {
			return classes;
		},
		get lines() {
			return lines;
		},
		get style() {
			return style;
		}
	};
}
