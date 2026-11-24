<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import type { RecipeInputHelper as IInputHelperProps } from '$stylist/input/interface/recipe/input-helper';

	import createInputHelperComponentState from '$stylist/input/component/atom/input-helper/state.svelte';

	let props: IInputHelperProps = $props();

	const state = createInputHelperComponentState(() => props);
</script>

<p class={state.viewState.classes} {...state.restProps}>
	{#if props.children}{@render props.children()}{:else}{props.text ?? ''}{/if}
</p>

<style>
</style>
