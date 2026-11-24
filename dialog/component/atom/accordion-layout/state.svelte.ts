import { getContext } from 'svelte';

import {
	ACCORDION_CONTEXT_DEFAULT,
	type AccordionContext
} from '$stylist/dialog/const/record/accordion-context';
import type { RecipeAccordionLayout } from '$stylist/dialog/interface/recipe/accordion-layout';
/** Reactive behavior of accordion-layout; props are read lazily when needed. */
export function createAccordionLayoutComponentState(getProps: () => RecipeAccordionLayout) {
	const props = $derived(getProps());
	const ctx = getContext<AccordionContext>('accordion-context') ?? ACCORDION_CONTEXT_DEFAULT;
	const open = $derived(props.alwaysOpen || ctx.isPanelOpen(props.value));
	const restProps = $derived.by(() => {
		const {
			value: _v,
			title: _t,
			icon: _icon,
			iconSvg: _iconSvg,
			alwaysOpen: _alwaysOpen,
			subtitle: _st,
			children: _c,
			headerEnd: _he,
			disabled: _d,
			class: _cl,
			...rest
		} = props;
		return rest;
	});
	return {
		get ctx(): typeof ctx {
			return ctx;
		},
		get open(): typeof open {
			return open;
		},
		get restProps(): typeof restProps {
			return restProps;
		}
	};
}
export default createAccordionLayoutComponentState;
