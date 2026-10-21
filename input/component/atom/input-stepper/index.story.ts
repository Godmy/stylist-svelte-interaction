import InputStepper from './index.svelte';
import type { RecipeInputStepper } from '$stylist/input/interface/recipe/input-stepper';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Minus / value / plus counter. */
export default {
	component: InputStepper,
	title: 'InputStepper',
	description:
		'Счётчик минус/число/плюс. `size` масштабирует весь контрол через font-size (кнопки в em), `background` принимает любое CSS-значение фона.',
	args: { value: 2, min: 0, max: 20, size: 'md', disabled: false, label: 'Гости' },
	controls: {
		value: { type: 'number', min: 0, max: 20, step: 1 },
		min: { type: 'number' },
		max: { type: 'number' },
		// sm … lg: the sizes the stepper styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 4) },
		background: { type: 'text' },
		disabled: { type: 'boolean' },
		label: { type: 'text' }
	},
	presets: { Tinted: { background: '#f7f3ec' } },
	layout: 'centered'
} satisfies ContractStory<RecipeInputStepper>;
