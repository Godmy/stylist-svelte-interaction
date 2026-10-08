import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeLayoutTransformation as LayoutTransformationProps } from '$stylist/animation/interface/recipe/layout-transformation';

export function createLayoutTransformationState(getProps: () => LayoutTransformationProps) {
	const props = $derived(getProps());
	const scale = $derived(props.scale ?? 1);
	const rotate = $derived(props.rotate ?? 0);
	const translateX = $derived(props.translateX ?? 0);
	const translateY = $derived(props.translateY ?? 0);
	const skewX = $derived(props.skewX ?? 0);
	const skewY = $derived(props.skewY ?? 0);
	const transformOrigin = $derived(props.transformOrigin ?? 'center');
	const duration = $derived(props.duration ?? 300);
	const easing = $derived(props.easing ?? 'ease');
	const delay = $derived(props.delay ?? 0);
	const animateOnHover = $derived(props.animateOnHover ?? false);
	const animateOnClick = $derived(props.animateOnClick ?? false);
	const animateInfinite = $derived(props.animateInfinite ?? false);
	const disabled = $derived(props.disabled ?? false);
	const children = $derived(props.children);

	const state = $state({ isHovered: false, isActive: false });

	const classes = $derived(
		ClassNamesManager.merge(
			'c-layout-transformation',
			animateOnHover && !disabled && 'c-layout-transformation--hover',
			animateOnClick && !disabled && 'c-layout-transformation--click',
			animateInfinite && !disabled && 'c-layout-transformation--infinite',
			disabled && 'c-layout-transformation--disabled',
			props.class
		)
	);

	const inlineStyle = $derived.by(() => {
		const styleList: string[] = [];
		const transforms: string[] = [];

		if (translateX !== 0) {
			transforms.push(
				`translateX(${typeof translateX === 'number' ? `${translateX}px` : translateX})`
			);
		}
		if (translateY !== 0) {
			transforms.push(
				`translateY(${typeof translateY === 'number' ? `${translateY}px` : translateY})`
			);
		}
		if (scale !== 1) {
			transforms.push(`scale(${scale})`);
		}
		if (rotate !== 0) {
			transforms.push(`rotate(${rotate}deg)`);
		}
		if (skewX !== 0) {
			transforms.push(`skewX(${skewX}deg)`);
		}
		if (skewY !== 0) {
			transforms.push(`skewY(${skewY}deg)`);
		}

		if (transforms.length > 0) {
			styleList.push(`transform: ${transforms.join(' ')}`);
		}
		if (transformOrigin) {
			styleList.push(`transform-origin: ${transformOrigin}`);
		}

		const durationMs = typeof duration === 'number' ? duration : Number(duration) || 300;
		if (!disabled && (durationMs > 0 || animateOnHover || animateOnClick)) {
			styleList.push(`transition: transform ${durationMs}ms ${easing} ${delay}ms`);
		}

		return styleList.length > 0 ? styleList.join('; ') : undefined;
	});

	const restProps = $derived.by(() => {
		const {
			children: _children,
			class: _class,
			scale: _scale,
			rotate: _rotate,
			translateX: _translateX,
			translateY: _translateY,
			skewX: _skewX,
			skewY: _skewY,
			transformOrigin: _transformOrigin,
			duration: _duration,
			easing: _easing,
			delay: _delay,
			animateOnHover: _animateOnHover,
			animateOnClick: _animateOnClick,
			animateInfinite: _animateInfinite,
			disabled: _disabled,
			...rest
		} = props;
		return rest;
	});

	function handleMouseEnter() {
		if (!disabled && animateOnHover) {
			state.isHovered = true;
		}
	}

	function handleMouseLeave() {
		if (!disabled) {
			state.isHovered = false;
			state.isActive = false;
		}
	}

	function handleMouseDown() {
		if (!disabled && animateOnClick) {
			state.isActive = true;
		}
	}

	function handleMouseUp() {
		if (!disabled) {
			state.isActive = false;
		}
	}

	return {
		get children() {
			return children;
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
		handleMouseEnter,
		handleMouseLeave,
		handleMouseDown,
		handleMouseUp
	};
}

export default createLayoutTransformationState;
