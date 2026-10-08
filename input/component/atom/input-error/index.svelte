<script lang="ts">
	import type { RecipeInputError } from '$stylist/input/interface/recipe/input-error';
	import { createFieldClassState } from '$stylist/input/function/script/create-field-class-state';

	let props: RecipeInputError = $props();
	const state = $derived(
		createFieldClassState(
			{
				variant: 'error',
				size: 'md',
				class: props.class
			},
			'input-field-error-text'
		)
	);
	const restProps = $derived.by(() => {
		const { class: _class, text: _text, visible: _visible, ...rest } = props;
		return rest;
	});
</script>

{#if props.visible ?? true}
	<p class={state.classes} {...restProps}>
		{props.text ?? ''}
	</p>
{/if}

<style>
</style>
