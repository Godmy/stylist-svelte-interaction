<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import type { RecipePhoneNumberInput as IPhoneNumberInputProps } from '$stylist/input/interface/recipe/phone-number-input';
	import { createPhoneNumberInputState } from '$stylist/input/component/molecule/phone-number-input/state.svelte';
	import HtmlInputTel from '$stylist/html/component/atom/input-tel/index.svelte';
	import { resolveInputAttributes } from '$stylist/input/function/resolve/input-attributes';
	import { normalizePhoneInputValue } from '$stylist/input/function/state/normalize-phone-input-value/state.svelte';

	let {
		value = $bindable(''),
		element = $bindable<HTMLInputElement | null>(null),
		...props
	}: IPhoneNumberInputProps = $props();
	const nativeProps = $derived(resolveInputAttributes(props));
	const state = createPhoneNumberInputState(() => ({ ...props, value }));
	const generatedId = $props.id();
	const controlId = $derived(props.id ?? generatedId);
</script>

<div class={state.containerClass}>
	<HtmlInputTel
		{...nativeProps}
		id={controlId}
		bind:element
		bind:value={
			() => state.formattedValue, (next) => (value = normalizePhoneInputValue(String(next ?? '')))
		}
		oninput={(event) => {
			state.handleInput(event);
			value = state.value;
			props.oninput?.call(event.currentTarget, event);
		}}
		placeholder={props.placeholder ?? '+7 (___) ___-__-__'}
		disabled={props.disabled ?? false}
		required={props.required ?? false}
		class={state.inputClass}
		data-variant="default"
		data-size="md"
		data-disabled={state.disabled || undefined}
		data-error={state.error || undefined}
		aria-invalid={state.error ? 'true' : props['aria-invalid']}
		aria-describedby={[
			props['aria-describedby'],
			props.helpText ? `${controlId}-helper` : undefined
		]
			.filter(Boolean)
			.join(' ') || undefined}
	/>
	{#if props.helpText}
		<p id={`${controlId}-helper`} class={state.helpTextClass}>{props.helpText}</p>
	{/if}
</div>
