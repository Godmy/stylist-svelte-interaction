<script lang="ts">
	import type { RecipeInputHelper as IInputHelperProps } from '$stylist/input/interface/recipe/input-helper';
	import { createFieldClassState } from '$stylist/input/function/script/create-field-class-state';

	let props: IInputHelperProps = $props();
	const state = $derived(
		createFieldClassState(
			{
				variant: props.variant,
				size: 'md',
				class: props.class
			},
			'input-field-helper-text'
		)
	);
	const restProps = $derived.by(() => {
		const { class: _class, text: _text, variant: _variant, ...rest } = props;
		return rest;
	});
</script>

<p class={state.classes} {...restProps}>
	{props.text ?? ''}
</p>

<style>
</style>
