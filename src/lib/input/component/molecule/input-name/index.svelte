<script lang="ts">
	import type { RecipeInputName } from '$stylist/input/interface/recipe/input-name';
	import InputText from '$stylist/input/component/molecule/input-text/index.svelte';

	let { value = $bindable<string>(''), ...props }: RecipeInputName = $props();
</script>

<InputText
	label={props.label}
	id={props.id}
	showRequiredIndicator={props.showRequiredIndicator ?? true}
	errors={props.errors ?? []}
	showErrors={props.showErrors ?? true}
	helperText={props.helperText}
	showHelperWhenError={props.showHelperWhenError ?? false}
	variant={props.variant ?? 'default'}
	size={props.size ?? 'md'}
	disabled={props.disabled ?? false}
	error={props.error ?? false}
	block={props.block ?? false}
	class={props.class ?? ''}
	bind:value
	type="text"
	placeholder={props.placeholder ?? 'Full name'}
	autocomplete={props.autocomplete ?? 'name'}
	name={props.name}
	required={props.required ?? false}
	readonly={props.readonly ?? false}
	autofocus={props.autofocus ?? false}
	pattern={props.pattern}
	minlength={props.minlength}
	maxlength={props.maxlength}
	{...props}
/>

<style>
</style>
