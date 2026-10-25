import { untrack } from 'svelte';
import type { RecipePopover } from '$stylist/dialog/interface/recipe/popover';

import type { TOKEN_ALIGNMENT } from '$stylist/layout/const/array/alignment';
export function createPopoverState(getProps: () => RecipePopover) {
	const props = $derived(getProps());
	let isVisible = $state(untrack(() => props.open ?? false));
	let triggerElement: HTMLElement | null = $state(null);
	let popoverElement: HTMLElement | null = $state(null);

	const position = $derived<(typeof TOKEN_ALIGNMENT)[number]>(props.position ?? 'bottom');
	const popoverId = $derived(props.id ?? `popover-${Math.random().toString(36).slice(2, 9)}`);

	$effect(() => {
		if (props.open !== undefined) {
			isVisible = props.open;
		}
	});

	function setOpen(value: boolean): void {
		isVisible = value;
	}

	function toggleOpen(): void {
		isVisible = !isVisible;
	}

	return {
		get isVisible() {
			return isVisible;
		},
		set isVisible(value: boolean) {
			isVisible = value;
		},
		get triggerElement() {
			return triggerElement;
		},
		set triggerElement(value: HTMLElement | null) {
			triggerElement = value;
		},
		get popoverElement() {
			return popoverElement;
		},
		set popoverElement(value: HTMLElement | null) {
			popoverElement = value;
		},
		get position() {
			return position;
		},
		get popoverId() {
			return popoverId;
		},
		setOpen,
		toggleOpen
	};
}

export default createPopoverState;
