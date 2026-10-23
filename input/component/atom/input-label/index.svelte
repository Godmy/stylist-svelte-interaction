<script lang="ts">
	import '$stylist/input/const/style/field/index.css';
	import type { RecipeInputLabel as IInputLabelProps } from '$stylist/input/interface/recipe/input-label';
	import createInputLabelState from '$stylist/input/component/atom/input-label/state.svelte';

	let props: IInputLabelProps = $props();
	const state = createInputLabelState(() => props);
	const rest = $derived.by(() => {
		const {
			label: _label,
			id: _id,
			labelId: _labelId,
			size: _size,
			disabled: _disabled,
			required: _required,
			showRequiredIndicator: _show,
			class: _class,
			...native
		} = props;
		return native;
	});
</script>

{#if props.label}
	<label
		{...rest}
		for={props.id}
		class={[state.labelClasses, props.class]}
		id={props.labelId}
		data-size={props.size ?? 'md'}
		data-disabled={props.disabled ? 'true' : 'false'}
	>
		{props.label}
		{#if props.required && (props.showRequiredIndicator ?? true)}
			<span class={state.requiredIndicatorClasses} aria-hidden="true">*</span>
		{/if}
	</label>
{/if}

<style>
</style>
