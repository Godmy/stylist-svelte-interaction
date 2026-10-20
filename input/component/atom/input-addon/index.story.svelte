<script lang="ts">
	// Render of index.story.ts: the addon is attached to a demo input and may hold an icon component.
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import InputAddon from './index.svelte';
	import type { RecipeInputAddon } from '$stylist/input/interface/recipe/input-addon';

	let {
		withIcon = true,
		addonText = '$',
		placeholder = 'Search projects...',
		...args
	}: RecipeInputAddon & { withIcon?: boolean; addonText?: string; placeholder?: string } = $props();
	const position = $derived(args.position ?? 'left');
</script>

{#snippet addon()}
	<InputAddon {...args} {position}>
		{#if withIcon}<BaseIcon name="search" />{:else}{addonText}{/if}
	</InputAddon>
{/snippet}

<div class="_c1">
	{#if position === 'left'}{@render addon()}{/if}
	<input type="text" {placeholder} class="_c3" />
	{#if position === 'right'}{@render addon()}{/if}
</div>

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
