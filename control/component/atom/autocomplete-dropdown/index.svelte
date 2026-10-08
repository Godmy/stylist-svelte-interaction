<script lang="ts">
	import createAutocompleteDropdownState from './state.svelte';
	import type { RecipeAutocompleteDropdown } from '$stylist/control/interface/recipe/autocomplete-dropdown';

	let {
		options = [],
		value = '',
		placeholder = 'Select...',
		onValueInput,
		onValueChange,
		/** @deprecated use onValueInput/onValueChange */
		onChange = (value: string) => {},
		class: className = ''
	}: RecipeAutocompleteDropdown = $props();

	const state = createAutocompleteDropdownState({
		options,
		value,
		placeholder,
		onValueInput,
		onValueChange,
		onChange,
		class: className
	});
</script>

<div class={state.rootClass}>
	<button
		class={state.triggerClass}
		data-placeholder={!state.selectedOption || undefined}
		onclick={state.toggle}
		onkeydown={state.handleKeyDown}
		aria-haspopup="listbox"
		aria-expanded={state.isOpen}
	>
		{state.selectedOption ? state.selectedOption.label : placeholder}
		<svg
			class={state.chevronClass}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
			></path>
		</svg>
	</button>

	{#if state.isOpen}
		<div role="listbox" class={state.listboxClass}>
			{#each options as option, i}
				<div
					role="option"
					aria-selected={state.localValue === option.value}
					tabindex={0}
					class={state.optionClass}
					onclick={() => state.handleSelect(option)}
					onkeydown={(event) => state.handleOptionKeyDown(event, option)}
				>
					{option.label}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.autocomplete-dropdown {
		position: relative;
		width: 100%;
	}

	.autocomplete-dropdown__trigger {
		width: 100%;
		padding: 0.5rem 2.5rem 0.5rem 1rem;
		text-align: left;
		background-color: var(--color-background-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		cursor: pointer;
		position: relative;
		color: var(--color-text-primary);
	}

	.autocomplete-dropdown__trigger[data-placeholder] {
		color: var(--color-text-secondary);
	}

	.autocomplete-dropdown__trigger:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-500);
	}

	.autocomplete-dropdown__chevron {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		width: 1.25rem;
		height: 1.25rem;
		transition: transform 0.15s ease;
	}

	.autocomplete-dropdown__chevron--open {
		transform: translateY(-50%) rotate(180deg);
	}

	.autocomplete-dropdown__listbox {
		position: absolute;
		z-index: var(--layout-z-index-docked, 10);
		margin-top: 0.25rem;
		width: 100%;
		background-color: var(--color-background-primary);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		border-radius: 0.375rem;
		border: 1px solid var(--color-border-primary);
		max-height: 15rem;
		overflow: auto;
	}

	.autocomplete-dropdown__option {
		padding: 0.5rem 1rem;
		cursor: pointer;
		color: var(--color-text-primary);
	}

	.autocomplete-dropdown__option:hover {
		background-color: var(--color-background-secondary);
	}
</style>
