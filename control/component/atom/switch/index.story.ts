import Switch from '$stylist/control/component/atom/switch/index.svelte';
import type { RecipeSwitch } from '$stylist/control/interface/recipe/switch';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Switch with label, description, required, checked, and disabled states. */
export default {
	component: Switch,
	title: 'Switch',
	description: 'Switch with label, description, required, checked, and disabled states.',
	args: {
		label: 'Enable notifications',
		description: 'Receive email notifications for new events',
		size: 'md',
		disabled: false,
		checked: true,
		required: false,
		labelPosition: 'right'
	},
	controls: {
		label: { type: 'text' },
		description: { type: 'text' },
		// Only the scalar sizes xs..xl apply to a switch.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 5) },
		disabled: { type: 'boolean' },
		checked: { type: 'boolean' },
		required: { type: 'boolean' },
		labelPosition: { type: 'select', options: ['left', 'right'] }
	}
} satisfies ContractStory<RecipeSwitch>;
