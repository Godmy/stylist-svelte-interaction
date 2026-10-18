<script lang="ts">
	// Render of index.story.ts: the burger only reports clicks, so the open state is toggled here.
	import BurgerMenu from './index.svelte';
	import type { RecipeBurgerMenu } from '$stylist/menu/interface/recipe/burger-menu';

	let args: RecipeBurgerMenu = $props();
	// Follows the open control and is toggled by clicks.
	let open = $derived(args.open ?? false);
</script>

<div class="_c1">
	<BurgerMenu {...args} {open} onValueChange={() => (open = !open)} />
</div>

<style>
	._c1 {
		padding: 1rem;
	}
</style>
