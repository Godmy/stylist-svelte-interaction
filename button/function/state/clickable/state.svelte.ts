import { ObjectManagerGesture } from '$stylist/layout/class/manager/gesture';
import type { RecipeClickable as ClickProps } from '$stylist/button/interface/recipe/clickable';

export function createClickableState(getProps: () => ClickProps) {
	const props = $derived(getProps());
	const normalizedProps = $derived(ObjectManagerGesture.normalizeClickContract(props));

	const classes = $derived.by(() => {
		const { variant = 'default', class: className = '' } = props;
		const { disabled = false, pressEffect = true, hoverEffect = true } = normalizedProps;

		if (disabled)
			return ['c-clickable', 'c-clickable--disabled', className].filter(Boolean).join(' ');

		return [
			'c-clickable',
			pressEffect && 'c-clickable--press',
			hoverEffect && 'c-clickable--hover',
			className
		]
			.filter(Boolean)
			.join(' ');
	});

	const restProps = $derived.by(() => {
		const {
			class: _class,
			onClick,
			onDblClick,
			onContextMenu,
			onMouseDown,
			onMouseUp,
			onMouseEnter,
			onMouseLeave,
			disabled,
			variant,
			pressEffect,
			hoverEffect,
			cursor,
			children,
			...rest
		} = props;
		return rest;
	});

	function handleClick(event: MouseEvent) {
		if (!normalizedProps.disabled && !props.loading && props.onClick) props.onClick(event);
	}

	function handleDblClick(event: MouseEvent) {
		if (!normalizedProps.disabled && !props.loading && props.onDblClick) props.onDblClick(event);
	}

	function handleContextMenu(event: MouseEvent) {
		if (!normalizedProps.disabled && !props.loading && props.onContextMenu)
			props.onContextMenu(event);
	}

	function handleMouseDown(event: MouseEvent) {
		if (!normalizedProps.disabled && !props.loading && props.onMouseDown) props.onMouseDown(event);
	}

	function handleMouseUp(event: MouseEvent) {
		if (!normalizedProps.disabled && !props.loading && props.onMouseUp) props.onMouseUp(event);
	}

	function handleMouseEnter(event: MouseEvent) {
		if (!normalizedProps.disabled && !props.loading && props.onMouseEnter)
			props.onMouseEnter(event);
	}

	function handleMouseLeave(event: MouseEvent) {
		if (!normalizedProps.disabled && !props.loading && props.onMouseLeave)
			props.onMouseLeave(event);
	}

	return {
		get disabled() {
			return normalizedProps.disabled || props.loading;
		},
		get variant() {
			return props.variant ?? 'default';
		},
		get hoverEffect() {
			return normalizedProps.hoverEffect;
		},
		get cursor() {
			return normalizedProps.cursor;
		},
		get classes() {
			return classes;
		},
		get restProps() {
			return restProps;
		},
		handleClick,
		handleDblClick,
		handleContextMenu,
		handleMouseDown,
		handleMouseUp,
		handleMouseEnter,
		handleMouseLeave
	};
}
