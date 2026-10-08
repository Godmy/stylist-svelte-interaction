<script lang="ts">
	import createValidationState from './state.svelte';

	const props = $props();
	const state = createValidationState(() => props);
</script>

<div class={state.containerClasses} {...props}>
	{#if props.label}
		<label for={props.id} class={state.labelClass}>
			{props.label}
			{#if props.required}
				<span class={state.requiredMarkClass} aria-label="required field">*</span>
			{/if}
		</label>
	{/if}

	<div class={state.contentClass}>
		{#if props.children}{@render props.children()}{/if}

		{#if props.description}
			<p class={state.descriptionClass}>
				{props.description}
			</p>
		{/if}

		{#if state.hasError}
			<p class={state.errorClass} aria-live="polite">
				{props.error}
			</p>
		{/if}

		{#if props.hint && !state.hasError}
			<p class={state.hintClass}>
				{props.hint}
			</p>
		{/if}
	</div>
</div>

<style>
	.field-group {
		width: 100%;
		display: flex;
		gap: 0.5rem;
	}

	.field-group.horizontal {
		align-items: flex-start;
		gap: 0.75rem;
	}

	.field-group.vertical {
		flex-direction: column;
	}

	.field-group--disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.field-label {
		min-width: 120px;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.field-required-mark {
		color: var(--color-danger-500);
	}

	.field-content {
		width: 100%;
		flex: 1;
	}

	.field-description {
		margin-top: 0.25rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.field-error {
		margin-top: 0.25rem;
		font-size: 0.875rem;
		color: var(--color-danger-600);
	}

	.field-hint {
		margin-top: 0.25rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.field-group.horizontal .field-label {
		padding-top: var(--spacing-2);
	}

	.field-group.vertical .field-label {
		padding-bottom: var(--spacing-1);
	}
</style>
