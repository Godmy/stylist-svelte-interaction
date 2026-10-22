<script lang="ts">
	import BottomSheet from '$stylist/navigation/component/organism/bottom-sheet/index.svelte';
	import type { RecipeBottomSheet } from '$stylist/navigation/interface/recipe/bottom-sheet';

	// Render of index.story.ts: the body and the actions footer are snippet props.
	let args: RecipeBottomSheet = $props();
</script>

<div class="_c1">
	<BottomSheet {...args}>
		<div class="_c2">
			<p class="_c3">Pickup, date and traveler controls can live here on mobile.</p>
			<label>Date <input type="date" /></label>
		</div>
		{#snippet actions()}
			<button type="button">Cancel</button>
			<button type="button">Apply</button>
		{/snippet}
	</BottomSheet>
</div>

<style>
	._c1 {
		min-height: 420px;
		padding: 24px;
		background: #eef2f7;
	}
	._c2 {
		display: grid;
		gap: 12px;
	}
	._c3 {
		margin: 0;
	}
</style>
