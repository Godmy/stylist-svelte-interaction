<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import Sidebar from './index.svelte';
	const Home = 'home';
	const Settings = 'settings';
	const User = 'user';
	const Bell = 'bell';
	const Mail = 'mail';

	import { TOKEN_CONTROLLER_TYPE } from '$stylist/domain/const/object/controller-type';

	type NavItem = {
		id: string;
		label: string;
		href?: string;
		icon?: any;
		onClick?: () => void;
		disabled?: boolean;
		active?: boolean;
		badge?: string | number;
	};

	const navItems: NavItem[] = [
		{ id: 'dashboard', label: 'Dashboard', icon: Home, active: true },
		{ id: 'messages', label: 'Messages', icon: Mail, badge: 3 },
		{ id: 'notifications', label: 'Notifications', icon: Bell, badge: 12 },
		{ id: 'profile', label: 'Profile', icon: User },
		{ id: 'settings', label: 'Settings', icon: Settings }
	];

	const controls = [
		{
			name: 'collapsed',
			type: TOKEN_CONTROLLER_TYPE.BOOLEAN,
			defaultValue: false
		},
		{
			name: 'collapsible',
			type: TOKEN_CONTROLLER_TYPE.BOOLEAN,
			defaultValue: true
		},
		{
			name: 'title',
			type: TOKEN_CONTROLLER_TYPE.TEXT,
			defaultValue: 'Navigation'
		}
	];
</script>

<Story
	{controls}
	title="Sidebar"
	category="Organisms/Interaction/Navigation"
	description="Sidebar navigation component for organizing application sections."
	tags={['sidebar', 'navigation', 'menu', 'layout']}
>
	{#snippet children(values: any)}
		<Sidebar
			items={navItems}
			title={values.title}
			collapsed={values.collapsed}
			collapsible={values.collapsible}
		/>
	{/snippet}
</Story>
