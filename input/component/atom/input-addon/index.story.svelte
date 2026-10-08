<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import InputAddon from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'position', type: 'select', defaultValue: 'left', options: ['left', 'right'] },
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'solid',
			options: ['solid', 'ghost', 'outline']
		},
		{ name: 'withIcon', type: 'boolean', defaultValue: true },
		{ name: 'addonText', type: 'text', defaultValue: '$' },
		{ name: 'placeholder', type: 'text', defaultValue: 'Search projects...' }
	];
</script>

<Story
	component={InputAddon}
	title="InputAddon"
	description="Prefix/suffix element attached to input controls."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			{#if values.position === 'left'}
				<InputAddon position="left" variant={values.variant}>
					{#if values.withIcon}<BaseIcon name="search" class="_c2" />{:else}{values.addonText}{/if}
				</InputAddon>
			{/if}
			<input type="text" placeholder={values.placeholder} class="_c3" />
			{#if values.position === 'right'}
				<InputAddon position="right" variant={values.variant}>
					{#if values.withIcon}<BaseIcon name="search" class="_c2" />{:else}{values.addonText}{/if}
				</InputAddon>
			{/if}
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: flex;
		align-items: center;
		max-width: 32rem;
		border-radius: 0.375rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
	}
	._c2 {
		height: 1rem;
		width: 1rem;
	}
	._c3 {
		flex: 1 1 0%;
		border-width: 0;
		background-color: transparent;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	._c3:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
	}
</style>
