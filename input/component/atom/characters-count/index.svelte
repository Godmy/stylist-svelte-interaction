<script lang="ts">
	import type { RecipeCharactersCount } from '$stylist/input/interface/recipe/characters-count';
	import createCharactersCountState from '$stylist/input/component/atom/characters-count/state.svelte';

	let props: RecipeCharactersCount = $props();
	const state = createCharactersCountState(() => props);
	const rest = $derived.by(() => {
		const {
			class: _class,
			children: _children,
			current: _current,
			max: _max,
			showPercentage: _percentage,
			text: _text,
			variant: _variant,
			...native
		} = props;
		return native;
	});
</script>

<div {...rest} class={state.classes}>
	{#if props.children}
		{@render props.children()}
	{:else}
		{state.message}
	{/if}
</div>

<style>
	.characters-count {
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}

	.characters-count--warning {
		color: var(--color-warning-600);
	}

	.characters-count--danger {
		color: var(--color-danger-600);
	}
</style>
