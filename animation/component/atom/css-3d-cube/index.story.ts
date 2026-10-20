import Css3dCube from './index.svelte';
import type { RecipeCss3dCube } from '$stylist/animation/interface/recipe/css-3d-cube';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Story-only knob: the render spins `rotationY` with requestAnimationFrame while it is on. */
type Knobs = { autoRotate?: boolean };

/** Volumetric CSS cube built on 3D transforms. */
export default {
	component: Css3dCube,
	title: 'Css3dCube',
	description: 'Объёмный CSS-куб на 3D-трансформациях.',
	args: { autoRotate: true, size: 200, rotationX: 25, rotationY: 45, rotationZ: 0 },
	controls: {
		autoRotate: { type: 'boolean' },
		size: { type: 'range', min: 100, max: 300, step: 10 },
		rotationX: { type: 'range', min: 0, max: 360, step: 1 },
		rotationY: { type: 'range', min: 0, max: 360, step: 1 },
		rotationZ: { type: 'range', min: 0, max: 360, step: 1 }
	}
} satisfies ContractStory<RecipeCss3dCube & Knobs>;
