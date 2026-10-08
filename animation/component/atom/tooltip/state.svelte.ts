import type { RecipeTooltip } from '$stylist/animation/interface/recipe/tooltip';
import type { HTMLAttributes } from 'svelte/elements';
import type { TokenAlignment } from '$stylist/layout/type/alias/alignment';

export function createTooltipState(getProps: () => RecipeTooltip & HTMLAttributes<HTMLElement>) {
	const props = $derived(getProps());
	function normalizePlacement(
		placement: TokenAlignment
	):
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'left'
		| 'left-start'
		| 'left-end'
		| 'right'
		| 'right-start'
		| 'right-end' {
		switch (placement) {
			case 'top':
			case 'top-center':
				return 'top';
			case 'top-start':
			case 'left-start':
				return 'top-start';
			case 'top-end':
			case 'right-start':
				return 'top-end';
			case 'bottom':
			case 'bottom-center':
				return 'bottom';
			case 'bottom-start':
			case 'left-end':
				return 'bottom-start';
			case 'bottom-end':
			case 'right-end':
				return 'bottom-end';
			case 'left':
			case 'left-center':
				return 'left';
			case 'right':
			case 'right-center':
				return 'right';
			default:
				return 'top';
		}
	}

	let referenceRef: HTMLElement | null = $state(null);
	let tooltipRef: HTMLElement | null = $state(null);

	const content = $derived(props.content);
	const placement = $derived(props.placement ?? 'top');
	const trigger = $derived(props.trigger ?? 'hover');
	const variant = $derived(props.variant ?? 'line');
	const disabled = $derived(props.disabled ?? false);
	const asChild = $derived(props.asChild ?? false);
	const delay = $derived(props.delay ?? 0);
	const hideDelay = $derived(props.hideDelay ?? 0);
	const controlledShow = $derived(props.show);
	const className = $derived(props.class ?? '');

	let internalVisible = $state(false);
	const isVisible = $derived(controlledShow !== undefined ? controlledShow : internalVisible);
	const normalizedPlacement = $derived(normalizePlacement(placement));

	let showTimeoutId: ReturnType<typeof setTimeout> | null = null;
	let hideTimeoutId: ReturnType<typeof setTimeout> | null = null;

	function showTooltip() {
		if (disabled || controlledShow !== undefined) return;
		if (hideTimeoutId) {
			clearTimeout(hideTimeoutId);
			hideTimeoutId = null;
		}
		if (delay > 0) {
			showTimeoutId = setTimeout(() => {
				internalVisible = true;
				props.onShow?.();
			}, delay);
			return;
		}

		internalVisible = true;
		props.onShow?.();
	}

	function hideTooltip() {
		if (controlledShow !== undefined) return;
		if (showTimeoutId) {
			clearTimeout(showTimeoutId);
			showTimeoutId = null;
		}
		if (hideDelay > 0) {
			hideTimeoutId = setTimeout(() => {
				internalVisible = false;
				props.onHide?.();
			}, hideDelay);
			return;
		}

		internalVisible = false;
		props.onHide?.();
	}

	function toggleTooltip() {
		if (isVisible) {
			hideTooltip();
			return;
		}
		showTooltip();
	}

	function setupClickOutsideListener(referenceEl = referenceRef, tooltipEl = tooltipRef) {
		if (trigger === 'click' && isVisible && referenceEl && tooltipEl) {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					!referenceEl.contains(event.target as Node) &&
					!tooltipEl.contains(event.target as Node)
				) {
					hideTooltip();
				}
			};
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
		return () => {};
	}

	const containerClass = $derived(['c-tooltip', className].filter(Boolean).join(' '));

	$effect(() => {
		return () => {
			if (showTimeoutId) clearTimeout(showTimeoutId);
			if (hideTimeoutId) clearTimeout(hideTimeoutId);
		};
	});

	return {
		get content() {
			return content;
		},
		get placement() {
			return placement;
		},
		get normalizedPlacement() {
			return normalizedPlacement;
		},
		get trigger() {
			return trigger;
		},
		get variant() {
			return variant;
		},
		get disabled() {
			return disabled;
		},
		get asChild() {
			return asChild;
		},
		get delay() {
			return delay;
		},
		get hideDelay() {
			return hideDelay;
		},
		get isVisible() {
			return isVisible;
		},
		get containerClass() {
			return containerClass;
		},
		get referenceRef() {
			return referenceRef;
		},
		set referenceRef(value: HTMLElement | null) {
			referenceRef = value;
		},
		get tooltipRef() {
			return tooltipRef;
		},
		set tooltipRef(value: HTMLElement | null) {
			tooltipRef = value;
		},
		showTooltip,
		hideTooltip,
		toggleTooltip,
		setupClickOutsideListener
	};
}
