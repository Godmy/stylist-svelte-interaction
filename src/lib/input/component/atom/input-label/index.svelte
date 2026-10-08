<script lang="ts">
	import type { RecipeInputLabel as IInputLabelProps } from '$stylist/input/interface/recipe/input-label';
	import createInputLabelState from './state.svelte';

	let props: IInputLabelProps = $props();
	const state = createInputLabelState(() => props);
</script>

{#if props.label}
	<label
		for={props.id}
		class={state.labelClasses}
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
