<script lang="ts">
	import { untrack } from 'svelte';
	import type { RecipeCheckbox } from '$stylist/control/interface/recipe/checkbox';
	import createCheckboxState from './state.svelte';

	let {
		id,
		label,
		description,
		checked = $bindable<boolean>(),
		errors = [],
		required = false,
		disabled = false,
		class: className = '',
		...restProps
	}: RecipeCheckbox = $props();

	const inputProps = $derived.by(() => {
		const {
			id: _id,
			label: _label,
			description: _description,
			errors: _errors,
			class: _class,
			disabled: _disabled,
			required: _required,
			checked: _checked,
			size: _size,
			...filteredProps
		} = {
			id,
			label,
			description,
			checked,
			errors,
			required,
			disabled,
			class: className,
			...restProps
		};
		return filteredProps;
	});

	const state = createCheckboxState(
		untrack(() => ({
		id,
		label,
		description,
		checked,
		errors,
		required,
		disabled,
		class: className
		}))
	);
</script>

<div
	class={state.containerClass}
	data-disabled={disabled || undefined}
	data-error={state.hasError || undefined}
	data-required={state.required || undefined}
>
	<div class="c-checkbox__wrapper">
		<input
			{id}
			type="checkbox"
			bind:checked
			class="c-checkbox__input"
			data-size={state.size}
			disabled={state.disabled}
			required={state.required}
			aria-describedby={state.hasError ? state.errorId : undefined}
			{...inputProps}
		/>
	</div>
	<div class="c-checkbox__label-wrapper">
		<label for={id} class="c-checkbox__label">
			{label}
			{#if state.required}
				<span class="c-checkbox__required-mark" aria-hidden="true">*</span>
			{/if}
		</label>
		{#if description}
			<p class="c-checkbox__description">{description}</p>
		{/if}
	</div>

	{#if state.hasError}
		<p id={state.errorId} class="c-checkbox__error">
			{#each state.errors as error, i}
				{error}{i < state.errors.length - 1 ? ' ' : ''}
			{/each}
		</p>
	{/if}
</div>

<style>
	.c-checkbox {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.c-checkbox__wrapper {
		display: flex;
		align-items: center;
		height: 1.25rem;
	}

	.c-checkbox__input {
		width: 1rem;
		height: 1rem;
		border-radius: 0.25rem;
		border: 2px solid var(--color-border-primary);
		accent-color: var(--color-primary-500);
		cursor: pointer;
		transition: border-color var(--motion-duration-120, 120ms);
	}

	.c-checkbox__input[data-size='xs'] {
		width: 0.75rem;
		height: 0.75rem;
	}

	.c-checkbox__input[data-size='sm'] {
		width: 1rem;
		height: 1rem;
	}

	.c-checkbox__input[data-size='md'] {
		width: 1.25rem;
		height: 1.25rem;
	}

	.c-checkbox__input[data-size='lg'] {
		width: 1.5rem;
		height: 1.5rem;
	}

	.c-checkbox__input[data-size='xl'] {
		width: 1.75rem;
		height: 1.75rem;
	}

	.c-checkbox__input[data-size='2xl'] {
		width: 2rem;
		height: 2rem;
	}

	.c-checkbox[data-error] .c-checkbox__input {
		border-color: var(--color-danger-500, #ef4444);
	}

	.c-checkbox[data-required]:not([data-error]) .c-checkbox__input {
		border-color: color-mix(in srgb, var(--color-primary-500) 70%, var(--color-border-primary));
	}

	.c-checkbox[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	.c-checkbox__label-wrapper {
		margin-left: 0.5rem;
	}

	.c-checkbox__label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		color: var(--color-text-primary);
		cursor: pointer;
	}

	.c-checkbox__description {
		display: block;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.c-checkbox__error {
		margin-top: 0.25rem;
		font-size: 0.875rem;
		color: var(--color-danger-500, #ef4444);
	}

	.c-checkbox__required-mark {
		color: var(--color-danger-500, #ef4444);
	}
</style>
