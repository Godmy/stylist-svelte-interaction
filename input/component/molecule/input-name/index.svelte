<script lang="ts">
	import type { RecipeInputName } from '$stylist/input/interface/recipe/input-name';
	import InputText from '$stylist/input/component/molecule/input-text/index.svelte';

	let { value = $bindable<string>(''), ...props }: RecipeInputName = $props();
</script>

<InputText
	{...props}
	bind:value
	type="text"
	placeholder={props.placeholder ?? 'Full name'}
	autocomplete={props.autocomplete ?? 'name'}
/>

<style>
</style>
