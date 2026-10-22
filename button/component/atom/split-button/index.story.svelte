<script lang="ts">
	import SplitButton from '$stylist/button/component/atom/split-button/index.svelte';
	import type { RecipeSplitButton } from '$stylist/button/interface/recipe/split-button';

	// Render of index.story.ts: items and primaryAction are required callbacks, not cloneable args.
	let args: RecipeSplitButton = $props();
	let lastAction = $state('none yet');
	const items = [
		{ label: 'Duplicate', onClick: () => (lastAction = 'Duplicate') },
		{ label: 'Archive', onClick: () => (lastAction = 'Archive') },
		{ label: 'Delete', onClick: () => (lastAction = 'Delete'), disabled: true }
	];
</script>

<div class="_c1">
	<SplitButton {...args} {items} primaryAction={() => (lastAction = 'Action')} />
	<p class="_c2">Last action: {lastAction}</p>
</div>

<style>
	._c1 {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
	}
	._c2 {
		margin: 0;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
