<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import AppHeader from './index.svelte';
	import { TOKEN_CONTROLLER_TYPE } from '$stylist/domain/const/object/controller-type';

	const navLinks = [
		{ href: '#overview', label: 'Overview', active: true },
		{ href: '#projects', label: 'Projects' },
		{ href: '#reports', label: 'Reports' },
		{ href: '#settings', label: 'Settings' }
	];

	const controls = [
		{
			name: 'brand',
			type: TOKEN_CONTROLLER_TYPE.TEXT,
			defaultValue: 'Vibe Manager'
		},
		{
			name: 'brandHref',
			type: TOKEN_CONTROLLER_TYPE.TEXT,
			defaultValue: '#home'
		}
	];
</script>

<Story
	{controls}
	title="AppHeader"
	category="Organisms/Interaction/Navigation"
	description="Top-level application header combining brand, primary navigation links, and trailing actions."
	tags={['app-header', 'navigation', 'header', 'layout']}
>
	{#snippet children(values: any)}
		<AppHeader brand={values.brand} brandHref={values.brandHref} {navLinks}>
			{#snippet trailing()}
				<div class="_c1">Account</div>
			{/snippet}
		</AppHeader>
	{/snippet}
</Story>

<style>
	._c1 {
		border-radius: 999px;
		background: var(--color-background-secondary, #f1f5f9);
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-secondary, #6b7280);
	}
</style>
