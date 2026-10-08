<script lang="ts">
	import type { RecipeFormFooter } from '$stylist/form/interface/recipe/form-footer';
	import { createFormFooterState } from './state.svelte';

	let {
		primaryButtonLabel = 'Submit',
		secondaryButtonLabel = 'Cancel',
		primaryButtonDisabled = false,
		secondaryButtonDisabled = false,
		showSecondaryButton = true,
		onPrimaryClick,
		onSecondaryClick,
		class: className = '',
		primaryButtonClass = '',
		secondaryButtonClass = '',
		actionsClass = '',
		...restProps
	}: RecipeFormFooter = $props();

	const state = createFormFooterState({
		primaryButtonLabel,
		secondaryButtonLabel,
		primaryButtonDisabled,
		secondaryButtonDisabled,
		showSecondaryButton,
		onPrimaryClick,
		onSecondaryClick,
		class: className,
		primaryButtonClass,
		secondaryButtonClass,
		actionsClass
	});
</script>

<div class={state.rootClass} {...restProps}>
	<div class="form-footer-actions">
		{#if showSecondaryButton}
			<button
				type="button"
				class={state.secondaryButtonClass}
				onclick={onSecondaryClick}
				disabled={secondaryButtonDisabled}
			>
				{secondaryButtonLabel}
			</button>
		{/if}

		<button
			type="button"
			class={state.primaryButtonClass}
			onclick={onPrimaryClick}
			disabled={primaryButtonDisabled}
		>
			{primaryButtonLabel}
		</button>
	</div>
</div>

<style>
	.form-footer-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}
</style>
