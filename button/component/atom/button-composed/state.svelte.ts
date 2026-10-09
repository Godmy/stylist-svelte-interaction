import type { RecipeButtonComposed } from '$stylist/button/interface/recipe/button-composed';
import createClickableState from '$stylist/layout/component/atom/clickable/state.svelte';
import createFocusableState from '$stylist/layout/component/atom/focusable/state.svelte';
import createBackgroundState from '$stylist/layout/component/atom/background/state.svelte';
import createBorderState from '$stylist/layout/component/atom/border/state.svelte';
import createContainerState from '$stylist/layout/component/atom/container/state.svelte';

export function createButtonComposedState(getProps: () => RecipeButtonComposed) {
	const props = $derived(getProps());
	const clickable = createClickableState(
		() => props as ReturnType<Parameters<typeof createClickableState>[0]>
	);
	const focusable = createFocusableState(
		() => props as ReturnType<Parameters<typeof createFocusableState>[0]>
	);
	const container = createContainerState(
		() => props as ReturnType<Parameters<typeof createContainerState>[0]>
	);
	const background = createBackgroundState(
		() => props as ReturnType<Parameters<typeof createBackgroundState>[0]>
	);
	const border = createBorderState(
		() => props as ReturnType<Parameters<typeof createBorderState>[0]>
	);

	const isLoading = $derived(props.loading ?? false);
	const isDisabled = $derived(Boolean(props.disabled || clickable.disabled || isLoading));
	const variant = $derived(props.variant ?? 'default');
	const size = $derived(props.size ?? 'md');
	const text = $derived(props.text ?? props.ariaLabel);
	const loadingLabel = $derived(props.loadingLabel ?? 'Loading...');
	const badgeText = $derived.by(() => {
		if (props.badge !== undefined) return String(props.badge);
		if (props.count !== undefined && (props.count > 0 || props.showBadge))
			return String(props.count);
		return undefined;
	});
	const showDot = $derived(Boolean(props.dot && !badgeText));

	const classes = $derived.by(() => {
		const classList = ['c-button-composed', clickable.classes, focusable.classes, props.class];

		return classList.filter(Boolean).join(' ');
	});

	const inlineStyle = $derived.by(() => {
		const styleParts = [background.inlineStyle, border.inlineStyle].filter(Boolean);

		return styleParts.length ? styleParts.join('; ') : undefined;
	});

	const restProps = $derived.by(() => {
		const {
			text: _text,
			ariaLabel: _ariaLabel,
			icon: _icon,
			iconLeft: _iconLeft,
			iconRight: _iconRight,
			iconSize: _iconSize,
			badge: _badge,
			count: _count,
			dot: _dot,
			showBadge: _showBadge,
			onClick: _onClick,
			onDblClick: _onDblClick,
			onContextMenu: _onContextMenu,
			onFocus: _onFocus,
			onBlur: _onBlur,
			focusEffect: _focusEffect,
			loading: _loading,
			loadingLabel: _loadingLabel,
			cursor: _cursor,
			size: _size,
			density: _density,
			shape: _shape,
			alignItems: _alignItems,
			justifyContent: _justifyContent,
			background: _background,
			backgroundColor: _backgroundColor,
			backgroundImage: _backgroundImage,
			backgroundPosition: _backgroundPosition,
			backgroundSize: _backgroundSize,
			backgroundRepeat: _backgroundRepeat,
			gradient: _gradient,
			opacity: _opacity,
			variant: _variant,
			borderStyle: _borderStyle,
			borderWidth: _borderWidth,
			borderColor: _borderColor,
			borderRadius: _borderRadius,
			borderTop: _borderTop,
			borderBottom: _borderBottom,
			borderLeft: _borderLeft,
			borderRight: _borderRight,
			animated: _animated,
			children: _children,
			class: _class,
			onclick: _onclick,
			ondblclick: _ondblclick,
			oncontextmenu: _oncontextmenu,
			onfocus: _onfocus,
			onblur: _onblur,
			...rest
		} = props;

		return rest;
	});

	function handleClick(event: MouseEvent) {
		if (isDisabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		clickable.handleClick(event);
		props.onclick?.(event as Parameters<NonNullable<typeof props.onclick>>[0]);
	}

	function handleDblClick(event: MouseEvent) {
		if (isDisabled) return;
		clickable.handleDblClick(event);
		props.ondblclick?.(event as Parameters<NonNullable<typeof props.ondblclick>>[0]);
	}

	function handleContextMenu(event: MouseEvent) {
		if (isDisabled) return;
		clickable.handleContextMenu(event);
		props.oncontextmenu?.(event as Parameters<NonNullable<typeof props.oncontextmenu>>[0]);
	}

	function handleFocus(event: FocusEvent) {
		if (isDisabled) return;
		focusable.handleFocus(event);
		props.onfocus?.(event as Parameters<NonNullable<typeof props.onfocus>>[0]);
	}

	function handleBlur(event: FocusEvent) {
		focusable.handleBlur(event);
		props.onblur?.(event as Parameters<NonNullable<typeof props.onblur>>[0]);
	}

	return {
		clickable,
		focusable,
		container,
		background,
		border,
		get isLoading() {
			return isLoading;
		},
		get isDisabled() {
			return isDisabled;
		},
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get text() {
			return text;
		},
		get loadingLabel() {
			return loadingLabel;
		},
		get badgeText() {
			return badgeText;
		},
		get showDot() {
			return showDot;
		},
		get classes() {
			return classes;
		},
		get inlineStyle() {
			return inlineStyle;
		},
		get restProps() {
			return restProps;
		},
		handleClick,
		handleDblClick,
		handleContextMenu,
		handleFocus,
		handleBlur
	};
}

export default createButtonComposedState;
