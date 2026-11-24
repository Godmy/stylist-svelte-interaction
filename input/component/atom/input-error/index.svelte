<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import type { RecipeInputError } from '$stylist/input/interface/recipe/input-error';

	import createInputErrorComponentState from '$stylist/input/component/atom/input-error/state.svelte';

	let props: RecipeInputError = $props();

	const state = createInputErrorComponentState(() => props);
</script>

{#if props.visible ?? true}
	<p class={state.viewState.classes} {...state.restProps}>
		{#if props.children}{@render props.children()}{:else}{props.text ?? ''}{/if}
	</p>
{/if}

<style>
</style>
