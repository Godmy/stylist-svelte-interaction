import Sidebar from './index.svelte';
import type { RecipeSidebar } from '$stylist/navigation/interface/recipe/sidebar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Collapsible sidebar navigation. */
export default {
	component: Sidebar,
	title: 'Sidebar',
	description: 'Sidebar navigation component for organizing application sections.',
	args: {
		title: 'Navigation',
		collapsed: false,
		collapsible: true,
		items: [
			{ id: 'dashboard', label: 'Dashboard', href: '#dashboard', active: true },
			{ id: 'messages', label: 'Messages', href: '#messages', badge: 3 },
			{ id: 'notifications', label: 'Notifications', href: '#notifications', badge: 12 },
			{ id: 'profile', label: 'Profile', href: '#profile' },
			{ id: 'settings', label: 'Settings', href: '#settings', disabled: true }
		]
	},
	controls: {
		collapsed: { type: 'boolean' },
		collapsible: { type: 'boolean' },
		title: { type: 'text' }
	},
	presets: { Collapsed: { collapsed: true } },
	layout: 'fullscreen'
} satisfies ContractStory<RecipeSidebar>;
