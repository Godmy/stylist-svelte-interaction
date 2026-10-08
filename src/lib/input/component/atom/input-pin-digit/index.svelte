<script lang="ts">
	import type { RecipeInputPinDigit as IPinInputDigitProps } from '$stylist/input/interface/recipe/input-pin-digit';
	import { createFieldClassState } from '$stylist/input/function/script/create-field-class-state';

	let props: IPinInputDigitProps = $props();
	const state = createFieldClassState(
		{
			variant: props.variant ?? 'default',
			size: props.size ?? 'md',
			error: props.invalid,
			class: props.class
		},
		'input-pin-digit'
	);
	const classes = $derived(
		[state.classes, props.focused ? 'input-pin-digit--focused' : ''].filter(Boolean).join(' ')
	);
</script>

<input
	class={classes}
	data-size={state.size}
	data-error={state.hasError || undefined}
	maxLength={1}
	value={props.value}
/>

<style>
	.input-pin-digit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-base, 0.375rem);
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		outline: none;
	}

	.input-pin-digit[data-size='sm'] {
		width: 2rem;
		height: 2rem;
		font-size: var(--text-size-sm, 0.875rem);
	}

	.input-pin-digit[data-size='md'] {
		width: 2.5rem;
		height: 2.5rem;
		font-size: var(--text-size-md, 1rem);
	}

	.input-pin-digit[data-size='lg'] {
		width: 3rem;
		height: 3rem;
		font-size: var(--text-size-lg, 1.125rem);
	}

	.input-pin-digit[data-error] {
		border-color: var(--color-danger-500);
	}

	.input-pin-digit--focused {
		outline: 2px solid var(--color-primary-500, #3b82f6);
		outline-offset: 2px;
	}
</style>
