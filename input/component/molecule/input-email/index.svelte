<script lang="ts">
	import type { RecipeInputEmail } from '$stylist/input/interface/recipe/input-email';
	import InputText from '$stylist/input/component/molecule/input-text/index.svelte';

	let { value = $bindable<string>(''), ...props }: RecipeInputEmail = $props();
</script>

<InputText
	{...props}
	bind:value
	type="email"
	placeholder={props.placeholder ?? 'example@email.com'}
	autocomplete={props.autocomplete ?? 'email'}
/>

<style>
</style>
