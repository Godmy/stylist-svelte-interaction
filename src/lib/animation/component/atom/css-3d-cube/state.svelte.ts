import type { RecipeCss3dCube } from '$stylist/animation/interface/recipe/css-3d-cube';

const DEFAULT_SIZE = 200;
const DEFAULT_ROTATION_X = 25;
const DEFAULT_ROTATION_Y = 45;
const DEFAULT_ROTATION_Z = 0;

export function createCss3dCubeState(getProps: () => RecipeCss3dCube) {
	const props = $derived(getProps());
	const size = $derived(props.size ?? DEFAULT_SIZE);
	const rotationX = $derived(props.rotationX ?? DEFAULT_ROTATION_X);
	const rotationY = $derived(props.rotationY ?? DEFAULT_ROTATION_Y);
	const rotationZ = $derived(props.rotationZ ?? DEFAULT_ROTATION_Z);
	const halfSize = $derived(size / 2);
	const cubeStyle = $derived.by(() =>
		[
			`width: ${size}px`,
			`height: ${size}px`,
			`transform: rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`
		].join('; ')
	);
	const restProps = $derived.by(() => {
		const {
			size: _size,
			rotationX: _rotationX,
			rotationY: _rotationY,
			rotationZ: _rotationZ,
			...rest
		} = props;

		return rest;
	});

	return {
		get halfSize() {
			return halfSize;
		},
		get cubeStyle() {
			return cubeStyle;
		},
		get restProps() {
			return restProps;
		}
	};
}

export default createCss3dCubeState;
