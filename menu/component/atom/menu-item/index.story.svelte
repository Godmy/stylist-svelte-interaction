<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import MenuItem from './index.svelte';

	const variantOptions = [
		'default',
		'primary',
		'secondary',
		'success',
		'warning',
		'danger',
		'info',
		'ghost',
		'link'
	];

	const controls: SlotStory[] = [
		{
			name: 'active',
			type: 'boolean',
			defaultValue: false,
			description: 'Whether the menu item is active'
		},
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'default',
			options: variantOptions,
			description: 'Variant of the menu item'
		},
		{
			name: 'disabled',
			type: 'boolean',
			defaultValue: false,
			description: 'Whether the menu item is disabled'
		},
		{
			name: 'external',
			type: 'boolean',
			defaultValue: false,
			description: 'Whether the link opens in a new tab'
		}
	];
</script>

<Story
	id="atoms-menu-item"
	title="MenuItem"
	component={MenuItem}
	category="Atoms/Interaction/Controls/Menus"
	description="MenuItem component for navigation menus."
	tags={['menu', 'navigation', 'item', 'link']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<MenuItem
				active={values.active}
				variant={values.variant}
				disabled={values.disabled}
				external={values.external}
				icon="home"
				onValueChange={() => {}}
			>
				Home
			</MenuItem>
		</div>
	{/snippet}

	{#snippet variants()}
		<div class="_c2">
			<MenuItem active={true} variant="default">Active Item</MenuItem>
			<MenuItem active={false} variant="default" disabled={true}>Disabled Item</MenuItem>
			<MenuItem active={false} variant="default" external={true} href="#">External Link</MenuItem>
			<MenuItem active={false} variant="primary">Primary Item</MenuItem>
			<MenuItem active={false} variant="success">Success Item</MenuItem>
			<MenuItem active={false} variant="danger">Danger Item</MenuItem>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 1rem;
		padding: 1rem;
	}
</style>
