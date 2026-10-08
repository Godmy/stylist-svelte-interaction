import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { ManagerMotion } from '$stylist/animation/class/manager/motion';
import { createMotionPreferenceState } from '$stylist/animation/function/state/motion-preference';
import type { RecipeVectorScene } from '$stylist/animation/interface/recipe/vector-scene';

export function createVectorSceneState(getProps: () => RecipeVectorScene) {
	const props = $derived(getProps());
	const motionPreference = createMotionPreferenceState();

	let isHovered = $state(false);
	let isActive = $state(false);
	const mode = $derived(props.mode ?? 'ambient');
	const reducedMotion = $derived(motionPreference.prefersReducedMotion);
	const progressValue = $derived(Math.min(Math.max(props.progress ?? 0, 0), 1));

	const classes = $derived(
		ClassNamesManager.merge(
			'c-vector-scene',
			`c-vector-scene--${mode}`,
			reducedMotion && 'c-vector-scene--reduced',
			typeof props.class === 'string' ? props.class : undefined
		)
	);

	function layerStyle(layer: RecipeVectorScene['layers'][number]): string | undefined {
		const transformOrigin = layer.transformOrigin ?? 'center';

		if (reducedMotion) {
			return `transform-origin: ${transformOrigin};`;
		}

		if (mode === 'progress') {
			const transform = ManagerMotion.generateTransformString({
				translateY: (1 - progressValue) * 28,
				scale: 0.94 + progressValue * 0.1
			});
			return `transform: ${transform}; transform-origin: ${transformOrigin};`;
		}

		if (mode === 'interaction') {
			const active = isHovered || isActive || (props.active ?? false);
			const transform = ManagerMotion.generateTransformString({
				translateY: active ? -4 : 0,
				scale: active ? 1.03 : 1
			});
			return (
				`transform: ${transform}; transform-origin: ${transformOrigin}; ` +
				`transition: transform ${props.duration ?? '300ms'} ${props.easing ?? 'ease-in-out'};`
			);
		}

		return `transform-origin: ${transformOrigin};`;
	}

	function handleMouseEnter() {
		if (mode === 'interaction' && (props.animateOnHover ?? true)) isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
		isActive = false;
	}

	function handleMouseDown() {
		if (mode === 'interaction' && props.animateOnClick) isActive = true;
	}

	function handleMouseUp() {
		isActive = false;
	}

	const restProps = $derived.by(() => {
		const {
			class: _class,
			mode: _mode,
			progress: _progress,
			duration: _duration,
			easing: _easing,
			animateOnHover: _animateOnHover,
			animateOnClick: _animateOnClick,
			active: _active,
			layers: _layers,
			viewBox: _viewBox,
			...rest
		} = props;
		return rest;
	});

	return {
		get classes() {
			return classes;
		},
		get mode() {
			return mode;
		},
		get viewBox() {
			return props.viewBox ?? '0 0 100 100';
		},
		get layers() {
			return props.layers;
		},
		get restProps() {
			return restProps;
		},
		layerStyle,
		handleMouseEnter,
		handleMouseLeave,
		handleMouseDown,
		handleMouseUp
	};
}

export default createVectorSceneState;
