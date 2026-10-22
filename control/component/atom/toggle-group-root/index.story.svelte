<script lang="ts">
	// Render of index.story.ts: the root needs ToggleGroupItem children to coordinate.
	import ToggleGroupRoot from '$stylist/control/component/atom/toggle-group-root/index.svelte';
	import ToggleGroupItem from '$stylist/control/component/atom/toggle-group-item/index.svelte';
	import type { RecipeToggleGroupRoot } from '$stylist/control/interface/recipe/toggle-group-root';

	let args: RecipeToggleGroupRoot = $props();
	let valueText = $state('none');
</script>

<div class="_c1">
	<ToggleGroupRoot
		{...args}
		onValueChange={(e) => {
			const value = e.detail.value;
			valueText = Array.isArray(value) ? value.join(', ') : value || 'none';
		}}
	>
		<ToggleGroupItem value="day">Day</ToggleGroupItem>
		<ToggleGroupItem value="week">Week</ToggleGroupItem>
		<ToggleGroupItem value="month">Month</ToggleGroupItem>
	</ToggleGroupRoot>
	<p class="_c2">Current value: {valueText}</p>
</div>

<style>
	._c1 {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
	}
	._c2 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
