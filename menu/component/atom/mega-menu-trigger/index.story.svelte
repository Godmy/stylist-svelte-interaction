<script lang="ts">
	// Render of index.story.ts: the trigger only reports clicks, so open states are toggled here (single trigger and a coordinated row).
	import MegaMenuTrigger from './index.svelte';
	import type { RecipeMegaMenuTrigger } from '$stylist/menu/interface/recipe/mega-menu-trigger';

	let args: RecipeMegaMenuTrigger = $props();
	// Follows the open control and is toggled by clicks.
	let open = $derived(args.open ?? false);
	let selected = $state('tours');
	const sections = [
		['excursions', 'Экскурсии'],
		['tours', 'Туры'],
		['destinations', 'Направления'],
		['info', 'Туристам']
	];
</script>

<div class="_c1">
	<MegaMenuTrigger {...args} {open} onclick={() => (open = !open)} />
	<span class="_c2">aria-expanded = {open}</span>
</div>

<div class="_c3">
	{#each sections as [id, label] (id)}
		<MegaMenuTrigger
			{label}
			open={selected === id}
			active={id === 'excursions'}
			onclick={() => (selected = selected === id ? '' : id)}
		/>
	{/each}
</div>

<style>
	._c1 {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	}

	._c2 {
		font-family: var(--font-mono, monospace);
		font-size: 0.8125rem;
		color: var(--color-text-secondary, #64748b);
	}

	._c3 {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		padding: 0.5rem;
		border-bottom: 1px solid var(--color-border-primary, #e2e8f0);
	}
</style>
