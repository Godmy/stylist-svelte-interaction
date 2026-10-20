<script lang="ts">
	import MarqueeTicker from './index.svelte';
	import type { RecipeMarqueeTicker } from '$stylist/animation/interface/recipe/marquee-ticker';

	// Render of index.story.ts: the editable `text` knob becomes `items`, so changing it plays the letter change transition.
	let { text = '', ...args }: Partial<RecipeMarqueeTicker> & { text?: string } = $props();
</script>

<div class="_c1">
	<MarqueeTicker {...args} items={[text]} />
</div>

<style>
	._c1 {
		padding: 14px 0;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
</style>
