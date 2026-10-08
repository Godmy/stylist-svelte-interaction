import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ManagerMotion } from '$stylist/animation/class/manager/motion';
import type { RecipeTransformable as TransformProps } from '$stylist/animation/interface/recipe/transformable';

export const createTransformableState = (getProps: () => TransformProps) => {
	const props = $derived(getProps());
	// SlotState
	let isHovered = $state(false);
	let isActive = $state(false);

	// Нормализация props
	const normalizedProps = $derived(ManagerMotion.normalizeBehaviorTransformable(props));

	// Вычисляемые классы
	const classes = $derived.by(() =>
		ClassNamesManager.merge(
			'c-transformable',
			props.animateOnHover && 'c-transformable--hover',
			typeof props.class === 'string' ? props.class : undefined
		)
	);

	// Вычисляемые inline стили
	const inlineStyle = $derived.by(() => {
		const scale =
			isHovered && props.animateOnHover ? (props.scale ?? 1) * 1.05 : (props.scale ?? 1);
		const rotate =
			isHovered && props.animateOnHover ? (props.rotate ?? 0) + 3 : (props.rotate ?? 0);
		const translateX = props.translateX ?? 0;
		const translateY = props.translateY ?? 0;
		const skewX = props.skewX ?? 0;
		const skewY = props.skewY ?? 0;
		const transforms: string[] = [];

		if (translateX !== 0 || translateY !== 0) {
			transforms.push(`translate(${translateX}px, ${translateY}px)`);
		}
		if (scale !== 1) transforms.push(`scale(${scale})`);
		if (rotate !== 0) transforms.push(`rotate(${rotate}deg)`);
		if (skewX !== 0) transforms.push(`skewX(${skewX}deg)`);
		if (skewY !== 0) transforms.push(`skewY(${skewY}deg)`);

		return transforms.length > 0 ? transforms.join(' ') : 'none';
	});

	// Извлечение rest props
	const restProps = $derived.by(() => {
		const {
			children: _children,
			class: _class,
			scale,
			rotate,
			translateX,
			translateY,
			skewX,
			skewY,
			transformOrigin,
			duration,
			easing,
			delay,
			animateOnHover,
			animateOnClick,
			animateInfinite,
			disabled,
			...rest
		} = props;
		return rest;
	});
	const children = $derived(props.children);
	const containerStyle = $derived(
		inlineStyle !== 'none'
			? `transform: ${inlineStyle}; transition: transform 300ms ease-in-out;`
			: undefined
	);

	// Обработчики
	function handleMouseEnter() {
		if (!props.disabled && props.animateOnHover) {
			isHovered = true;
		}
	}

	function handleMouseLeave() {
		if (!props.disabled) {
			isHovered = false;
			isActive = false;
		}
	}

	function handleMouseDown() {
		if (!props.disabled && props.animateOnClick) {
			isActive = true;
		}
	}

	function handleMouseUp() {
		if (!props.disabled) {
			isActive = false;
		}
	}

	return {
		// SlotState getters
		get isHovered() {
			return isHovered;
		},
		get isActive() {
			return isActive;
		},

		// SlotState
		get classes() {
			return classes;
		},
		get inlineStyle() {
			return inlineStyle;
		},
		get containerStyle() {
			return containerStyle;
		},
		get restProps() {
			return restProps;
		},
		get children() {
			return children;
		},

		// Handlers
		handleMouseEnter,
		handleMouseLeave,
		handleMouseDown,
		handleMouseUp
	};
};

export default createTransformableState;
