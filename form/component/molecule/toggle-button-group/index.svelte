<script lang="ts">
	import type { RecipeToggleButtonGroup } from '$stylist/form/interface/recipe/toggle-button-group';
	import createToggleButtonGroupState from './state.svelte';

	let {
		options = [],
		value = '',
		multiple = false,
		disabled = false,
		size = 'md',
		class: className = '',
		buttonClass = '',
		activeButtonClass = '',
		inactiveButtonClass = '',
		onValueInput,
		onValueChange,
		onInput,
		onChange,
		...restProps
	}: RecipeToggleButtonGroup = $props();
	const state = createToggleButtonGroupState({
		options,
		value,
		multiple,
		disabled,
		size,
		class: className,
		buttonClass,
		activeButtonClass,
		inactiveButtonClass,
		onValueInput,
		onValueChange,
		onInput,
		onChange,
		...restProps
	});
</script>

<div
	class={['c-toggle-btn-group', className].filter(Boolean).join(' ')}
	role="group"
	data-size={state.size}
	{...restProps}
>
	{#each options as option}
		<button
			type="button"
			class="c-toggle-btn-group__btn"
			data-active={state.isSelected(option.value) || undefined}
			data-disabled={option.disabled || disabled || undefined}
			onclick={() => state.handleToggle(option.value)}
			disabled={option.disabled || disabled}
			aria-pressed={state.isSelected(option.value)}
		>
			{option.label}
		</button>
	{/each}
</div>

<style>
	.c-toggle-btn-group {
		display: inline-flex;
		border-radius: 0.375rem;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		overflow: hidden;
	}

	.c-toggle-btn-group__btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		border: 1px solid var(--color-border-primary);
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color var(--duration-120, 120ms),
			color var(--duration-120, 120ms);
		background: var(--color-background-primary);
		color: var(--color-text-primary);
	}

	.c-toggle-btn-group__btn:not(:first-child) {
		margin-left: -1px;
	}

	.c-toggle-btn-group__btn:first-child {
		border-radius: 0.375rem 0 0 0.375rem;
	}

	.c-toggle-btn-group__btn:last-child {
		border-radius: 0 0.375rem 0.375rem 0;
	}

	.c-toggle-btn-group__btn:hover:not([data-disabled]):not([data-active]) {
		background: var(--color-background-secondary);
	}

	.c-toggle-btn-group__btn[data-active] {
		z-index: 1;
		background: var(--color-primary-500);
		color: var(--color-text-inverse);
		border-color: var(--color-primary-500);
	}

	.c-toggle-btn-group__btn[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	.c-toggle-btn-group__btn:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: -2px;
		z-index: 2;
	}

	/* sizes */
	.c-toggle-btn-group[data-size='xs'] .c-toggle-btn-group__btn {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
	}

	.c-toggle-btn-group[data-size='sm'] .c-toggle-btn-group__btn {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
	}

	.c-toggle-btn-group[data-size='md'] .c-toggle-btn-group__btn {
		font-size: 0.875rem;
		padding: 0.5rem 0.75rem;
	}

	.c-toggle-btn-group[data-size='lg'] .c-toggle-btn-group__btn {
		font-size: 1rem;
		padding: 0.75rem 1rem;
	}
</style>
