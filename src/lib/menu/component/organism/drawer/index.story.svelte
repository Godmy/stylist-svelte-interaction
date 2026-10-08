<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import Drawer from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'open', type: 'boolean', defaultValue: true },
		{
			name: 'position',
			type: 'select',
			defaultValue: 'right',
			options: ['left', 'right', 'top', 'bottom']
		},
		{ name: 'size', type: 'text', defaultValue: '320px' },
		{ name: 'closable', type: 'boolean', defaultValue: true },
		{ name: 'showBackdrop', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	component={Drawer}
	title="Drawer"
	description="Slide-in panel for secondary navigation and settings."
	{controls}
>
	{#snippet children(values: any)}
		<Drawer
			open={values.open as boolean}
			position={values.position as 'left' | 'right' | 'top' | 'bottom'}
			size={values.size as string}
			closable={values.closable as boolean}
			showBackdrop={values.showBackdrop as boolean}
		>
			{#snippet header()}
				<h2 class="_c1">Quick settings</h2>
			{/snippet}
			{#snippet children()}
				<div class="_c2">
					<p>Notifications</p>
					<p>Theme</p>
					<p>Privacy</p>
				</div>
			{/snippet}
			{#snippet actions()}
				<div class="_c3">
					<button class="_c4">Cancel</button>
					<button class="_c5">Save</button>
				</div>
			{/snippet}
		</Drawer>
	{/snippet}
</Story>

<style>
	._c1 {
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
	}
	._c2 {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c2 > * + * {
		margin-top: 0.5rem;
	}
	._c3 {
		display: flex;
		gap: 0.5rem;
	}
	._c4 {
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c5 {
		border-radius: 0.25rem;
		background-color: var(--color-primary-600);
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-inverse);
	}
</style>
