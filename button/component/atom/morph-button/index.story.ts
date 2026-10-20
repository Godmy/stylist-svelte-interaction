import MorphButton from './index.svelte';
import type { RecipeMorphButton } from '$stylist/button/interface/recipe/morph-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Button whose label morphs through host-controlled request states. */
export default {
	component: MorphButton,
	title: 'Morph Button',
	description: 'Host-controlled idle, loading, success and retry states; no simulated request.',
	args: { state: 'idle' },
	controls: {
		state: { type: 'select', options: ['idle', 'loading', 'success', 'error'] }
	},
	presets: { Success: { state: 'success' }, Error: { state: 'error' } },
	content: [{ kind: 'text', value: 'Отправить заявку' }],
	layout: 'centered'
} satisfies ContractStory<RecipeMorphButton>;
