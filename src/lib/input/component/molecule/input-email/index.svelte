<script lang="ts">
	import type { RecipeInputEmail } from '$stylist/input/interface/recipe/input-email';
	import InputText from '$stylist/input/component/molecule/input-text/index.svelte';

	let { value = $bindable<string>(''), ...props }: RecipeInputEmail = $props();
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
	type="email"
	placeholder={props.placeholder ?? 'example@email.com'}
	autocomplete={props.autocomplete ?? 'email'}
	name={props.name}
	required={props.required ?? false}
	readonly={props.readonly ?? false}
	autofocus={props.autofocus ?? false}
	pattern={props.pattern ?? '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'}
	minlength={props.minlength}
	maxlength={props.maxlength}
	{...props}
/>

<style>
</style>
