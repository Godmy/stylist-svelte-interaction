<script lang="ts">
	// Render of index.story.ts: the item needs a ToggleGroupRoot parent that provides its context.
	import ToggleGroupItem from '$stylist/control/component/atom/toggle-group-item/index.svelte';
	import ToggleGroupRoot from '$stylist/control/component/atom/toggle-group-root/index.svelte';
	import type { RecipeToggleGroupItem } from '$stylist/control/interface/recipe/toggle-group-item';
	import type { TokenSelectionType } from '$stylist/control/type/alias/selection-type';

	let { groupType, ...item }: RecipeToggleGroupItem & { groupType?: TokenSelectionType } = $props();
	let selected = $state<string | null>(null);
</script>

<div class="_c1">
	<ToggleGroupRoot
		type={groupType}
		onValueChange={(e) =>
			(selected = Array.isArray(e.detail.value) ? e.detail.value.join(', ') : e.detail.value)}
	>
		<ToggleGroupItem {...item}>Bold</ToggleGroupItem>
		<ToggleGroupItem value="italic" disabled={item.disabled}>Italic</ToggleGroupItem>
		<ToggleGroupItem value="underline" disabled={item.disabled}>Underline</ToggleGroupItem>
	</ToggleGroupRoot>
	<p class="_c2">Selected: {selected || 'none'}</p>
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
