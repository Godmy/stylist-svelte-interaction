import RadioGroup from './index.svelte';
import type { RecipeRadioGroup } from '$stylist/input/interface/recipe/radio-group';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_ORIENTATION } from '$stylist/layout/const/array/orientation';

/** Radio group with option descriptions and a horizontal mode. */
export default {
	component: RadioGroup,
	title: 'RadioGroup',
	description: 'Группа радиокнопок с описанием и поддержкой горизонтального режима',
	args: {
		name: 'plan-choice',
		label: 'Выберите план',
		description: 'Определите подходящий тариф для команды.',
		options: [
			{ value: 'starter', label: 'Starter', description: 'Базовые функции для малого проекта.' },
			{
				value: 'pro',
				label: 'Pro',
				description: 'Продвинутые инструменты для команд средней величины.'
			},
			{
				value: 'enterprise',
				label: 'Enterprise',
				description: 'Расширенные настройки и поддержка 24/7.',
				disabled: false
			}
		],
		value: 'pro',
		orientation: TOKEN_ORIENTATION[1],
		disabled: false,
		required: true,
		error: ''
	},
	controls: {
		label: { type: 'text', description: 'Label for the radio group' },
		description: { type: 'text', description: 'Description for the radio group' },
		value: {
			type: 'select',
			options: ['starter', 'pro', 'enterprise'],
			description: 'Selected value'
		},
		orientation: {
			type: 'select',
			options: TOKEN_ORIENTATION,
			description: 'Orientation of the radio group'
		},
		disabled: { type: 'boolean', description: 'Whether the radio group is disabled' },
		required: { type: 'boolean', description: 'Whether the radio group is required' },
		error: { type: 'text', description: 'Error message' }
	},
	presets: {
		Error: { value: '', error: 'Пожалуйста, выберите тариф.' },
		Horizontal: { orientation: TOKEN_ORIENTATION[0] }
	}
} satisfies ContractStory<RecipeRadioGroup>;
