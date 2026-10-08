<script lang="ts">
	import InputText from '$stylist/input/component/molecule/input-text/index.svelte';
	import type { RecipeInputDouble as IInputDoubleProps } from '$stylist/input/interface/recipe/input-double';

	let {
		value1 = $bindable<string>(''),
		value2 = $bindable<string>(''),
		...props
	}: IInputDoubleProps = $props();
</script>

<div class="input-double-container">
	<InputText
		label={props.label1 ?? 'Field 1'}
		id={props.id1}
		bind:value={value1}
		placeholder={props.placeholder1}
		type={props.type1}
		disabled={props.disabled1}
		errors={props.errors1 ?? []}
		required={props.required1}
		variant={props.variant}
		size={props.size}
		class={props.class}
	/>
	<InputText
		label={props.label2 ?? 'Field 2'}
		id={props.id2}
		bind:value={value2}
		placeholder={props.placeholder2}
		type={props.type2}
		disabled={props.disabled2}
		errors={props.errors2 ?? []}
		required={props.required2}
		variant={props.variant}
		size={props.size}
		class={props.class}
	/>
</div>

<style>
	.input-double-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
</style>
