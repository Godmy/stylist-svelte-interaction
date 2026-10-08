<script lang="ts">
	import { setContext } from 'svelte';
	import { createAccordionGroupState } from './state.svelte';
	import type { RecipeAccordionGroup } from '$stylist/dialog/interface/recipe/accordion-group';

	let props: RecipeAccordionGroup = $props();
	const state = createAccordionGroupState(() => props);

	setContext('accordion-context', {
		isPanelOpen: state.isPanelOpen,
		handleValueChange: state.handleValueChange
	});

	const restProps = $derived.by(() => {
		const {
			children: _c,
			defaultValues: _d,
			value: _v,
			onValueChange: _o,
			class: _cl,
			...rest
		} = props;
		return rest;
	});
</script>

<div {...restProps} class={['c-accordion-group', props.class].filter(Boolean).join(' ')}>
	{#if props.children}{@render props.children()}{/if}
</div>

<style>
	.c-accordion-group {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		overflow: hidden;
	}
</style>
