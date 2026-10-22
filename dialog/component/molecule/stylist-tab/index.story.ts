import StylistTab from '$stylist/dialog/component/molecule/stylist-tab/index.svelte';
import type { RecipeStylistTab } from '$stylist/dialog/interface/recipe/stylist-tab';
import type { ContractStory } from '$stylist/html/interface/contract/story';

export default {
	component: StylistTab,
	title: 'StylistTab',
	description: 'Domain-specific taxonomy switcher used by StylistMenu.',
	args: {
		selectedId: 'architecture'
	},
	controls: {
		selectedId: {
			type: 'select',
			options: ['architecture', 'information', 'interaction'],
			description: 'Selected taxonomy item id.'
		}
	},
	presets: {
		'Custom items': {
			items: [
				{ id: 'dashboard', label: 'Dashboard', icon: 'grid-layout' },
				{ id: 'analytics', label: 'Analytics', icon: 'chart' },
				{ id: 'settings', label: 'Settings', icon: 'settings' },
				{ id: 'profile', label: 'Profile', icon: 'user' }
			],
			selectedId: 'dashboard'
		}
	}
} satisfies ContractStory<RecipeStylistTab>;
