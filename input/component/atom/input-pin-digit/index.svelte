<script lang="ts">
	import type { RecipeInputPinDigit as IPinInputDigitProps } from '$stylist/input/interface/recipe/input-pin-digit';
	import { createFieldClassState } from '$stylist/input/function/script/create-field-class-state';
	import HtmlInputText from '$stylist/html/component/atom/input-text/index.svelte';
	import { resolveInputAttributes } from '$stylist/input/function/resolve/input-attributes';

	let {
		value = $bindable(''),
		element = $bindable<HTMLInputElement | null>(null),
		...props
	}: IPinInputDigitProps = $props();
	const nativeProps = $derived(resolveInputAttributes(props));
	const state = $derived(
		createFieldClassState(
			{
				variant: props.variant ?? 'default',
				size: props.size ?? 'md',
				error: props.invalid,
				class: props.class
			},
			'input-pin-digit'
		)
	);
	const classes = $derived(
		[state.classes, props.focused ? 'input-pin-digit--focused' : ''].filter(Boolean).join(' ')
	);
</script>

<HtmlInputText
	bind:element
	{...nativeProps}
	inputmode={props.inputmode ?? 'numeric'}
	class={classes}
	data-size={state.size}
	data-error={state.hasError || undefined}
	maxlength={1}
	bind:value
/>

<style>
	:global(.input-pin-digit) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-1-5, 0.375rem);
		background: var(--color-background-primary);
		color: var(--color-text-primary);
	}

	:global(.input-pin-digit[data-size='sm']) {
		width: 2rem;
		height: 2rem;
		font-size: var(--font-size-3-5, 0.875rem);
	}

	:global(.input-pin-digit[data-size='md']) {
		width: 2.5rem;
		height: 2.5rem;
		font-size: var(--font-size-4, 1rem);
	}

	:global(.input-pin-digit[data-size='lg']) {
		width: 3rem;
		height: 3rem;
		font-size: var(--font-size-4-5, 1.125rem);
	}

	:global(.input-pin-digit[data-error]) {
		border-color: var(--color-danger-500);
	}

	:global(.input-pin-digit--focused),
	:global(.input-pin-digit:focus-visible) {
		outline: 2px solid var(--color-primary-500, #3b82f6);
		outline-offset: 2px;
	}
</style>
