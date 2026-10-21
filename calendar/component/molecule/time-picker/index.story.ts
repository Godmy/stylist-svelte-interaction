import TimePicker from './index.svelte';
import type { RecipeTimePicker } from '$stylist/calendar/interface/recipe/time-picker';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Hour/minute (optionally second) selector. */
export default {
	component: TimePicker,
	title: 'TimePicker',
	description: 'Time picker component with customizable options',
	args: { value: '14:30', showSeconds: false, disabled: false },
	controls: {
		value: { type: 'text', description: 'Selected time value' },
		showSeconds: { type: 'boolean', description: 'Whether to show seconds selector' },
		disabled: { type: 'boolean', description: 'Whether the time picker is disabled' }
	},
	presets: { WithSeconds: { showSeconds: true, value: '14:30:15' } },
	layout: 'padded'
} satisfies ContractStory<RecipeTimePicker>;
