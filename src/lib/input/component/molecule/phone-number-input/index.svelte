<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import type { RecipePhoneNumberInput as IPhoneNumberInputProps } from '$stylist/input/interface/recipe/phone-number-input';
	import { createPhoneNumberInputState } from './state.svelte';

	let props: IPhoneNumberInputProps = $props();
	const state = createPhoneNumberInputState(() => props);
</script>

<div class={state.containerClass}>
	<input
		type="tel"
		value={state.formattedValue}
		oninput={state.handleInput}
		placeholder={props.placeholder ?? '+7 (___) ___-__-__'}
		disabled={props.disabled ?? false}
		required={props.required ?? false}
		class={state.inputClass}
		data-variant="default"
		data-size="md"
		data-disabled={state.disabled || undefined}
		data-error={state.error || undefined}
	/>
	{#if props.helpText}
		<p class={state.helpTextClass}>{props.helpText}</p>
	{/if}
</div>
