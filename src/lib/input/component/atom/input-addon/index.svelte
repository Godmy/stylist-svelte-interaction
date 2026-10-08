<script lang="ts">
	import type { RecipeInputAddon as IInputAddonProps } from '$stylist/input/interface/recipe/input-addon';
	import { createFieldClassState } from '$stylist/input/function/script/create-field-class-state';

	let props: IInputAddonProps = $props();
	const state = createFieldClassState(
		{
			variant: props.variant,
			size: 'md',
			class: props.class
		},
		'input-addon'
	);
	const classes = $derived(
		[
			state.classes,
			(props.position ?? 'left') === 'left' ? 'input-addon--left' : 'input-addon--right'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={classes}>
	{#if props.children}{#if props.children}{@render props.children()}{/if}{/if}
</div>

<style>
	.input-addon {
		display: inline-flex;
		align-items: center;
		height: 2.25rem;
		padding-inline: 0.75rem;
		border: 1px solid var(--color-border-primary);
		background: var(--color-background-secondary);
		color: var(--color-text-secondary);
		font-size: var(--text-size-md, 1rem);
		white-space: nowrap;
	}

	.input-addon--left {
		border-start-start-radius: var(--border-radius-base, 0.375rem);
		border-end-start-radius: var(--border-radius-base, 0.375rem);
		border-start-end-radius: 0;
		border-end-end-radius: 0;
		border-inline-end-color: transparent;
	}

	.input-addon--right {
		border-start-start-radius: 0;
		border-end-start-radius: 0;
		border-start-end-radius: var(--border-radius-base, 0.375rem);
		border-end-end-radius: var(--border-radius-base, 0.375rem);
		border-inline-start-color: transparent;
	}
</style>
