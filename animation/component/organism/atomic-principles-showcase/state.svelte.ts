import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ATOMIC_PRINCIPLES_TIER } from '$stylist/animation/const/record/atomic-principles-tier';
import type { RecipeAtomicPrinciplesShowcase } from '$stylist/animation/interface/recipe/atomic-principles-showcase';

export function createAtomicPrinciplesShowcaseState(
	getProps: () => RecipeAtomicPrinciplesShowcase
) {
	const props = $derived(getProps());
	const className = $derived(
		ClassNamesManager.merge(
			'atomic-principles-showcase',
			props.class == null ? undefined : String(props.class)
		)
	);

	const badgeText = $derived(props.badgeText ?? 'Atomic Design');
	const title = $derived(props.title ?? 'Built on Atomic Principles');
	const description = $derived(
		props.description ?? 'Every component follows the proven Atomic Design methodology'
	);

	const tiers = $derived(
		ATOMIC_PRINCIPLES_TIER.map((tier) => ({
			...tier,
			count: props.stats?.[tier.key] ?? 0
		}))
	);

	const restProps = $derived.by(() => {
		const {
			class: _className,
			stats: _stats,
			badgeText: _badgeText,
			title: _title,
			description: _description,
			...rest
		} = props;
		return rest;
	});

	return {
		get className() {
			return className;
		},
		get badgeText() {
			return badgeText;
		},
		get title() {
			return title;
		},
		get description() {
			return description;
		},
		get tiers() {
			return tiers;
		},
		get restProps() {
			return restProps;
		}
	};
}
