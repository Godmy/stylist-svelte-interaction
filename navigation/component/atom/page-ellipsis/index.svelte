<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipePageEllipsis } from '$stylist/navigation/interface/recipe/page-ellipsis';
	import createPageEllipsisState from './state.svelte';

	let props: RecipePageEllipsis & HTMLAttributes<HTMLDivElement> = $props();
	const state = createPageEllipsisState(() => props);
</script>

<div class={`${props.class ?? ''} _c1`} {...props}>
	<span>…</span>
</div>

<style>
	._c1 {
		display: flex;
		align-items: center;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
</style>
