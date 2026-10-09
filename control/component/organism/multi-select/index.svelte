<script lang="ts">
	import type { RecipeMultiSelect } from '$stylist/control/interface/recipe/multi-select';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createMultiSelectState } from './state.svelte';

	let props: RecipeMultiSelect = $props();
	const state = createMultiSelectState(() => props);

	const restProps = $derived.by(() => {
		const {
			class: _class,
			options: _options,
			value: _value,
			placeholder: _placeholder,
			disabled: _disabled,
			searchable: _searchable,
			maxSelections: _maxSelections,
			dropdownClass: _dropdownClass,
			selectedClass: _selectedClass,
			optionClass: _optionClass,
			placeholderClass: _placeholderClass,
			searchInputClass: _searchInputClass,
			onInput: _onInput,
			onChange: _onChange,
			...rest
		} = props;
		return rest;
	});
</script>

<div class={state.containerClasses} bind:this={state.containerRef} {...restProps}>
	<div
		class={state.selectDisplayClasses}
		onclick={state.toggleDropdown}
		onkeydown={(event: KeyboardEvent) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				state.toggleDropdown();
			}
		}}
		role="button"
		tabindex={state.disabled ? -1 : 0}
	>
		{#if state.selectedValues.length === 0}
			<span class={state.placeholderClasses}>{state.placeholder}</span>
		{:else}
			{#each state.selectedValues as selectedValue}
				{@const foundOption = state.options.find((opt) => opt.value === selectedValue)}
				{#if foundOption}
					<span class={state.selectedValueContainerClasses}>
						{foundOption.label}
						<button
							type="button"
							class={state.removeButtonClasses}
							onclick={(event) => {
								event.stopPropagation();
								state.removeOption(selectedValue);
							}}
							aria-label={`Remove ${foundOption.label}`}
						>
							<BaseIcon name={state.X} size={12} />
						</button>
					</span>
				{/if}
			{/each}
		{/if}

		<button
			type="button"
			class={state.clearButtonClasses}
			onclick={(event) => {
				event.stopPropagation();
				state.clearSelections();
			}}
			disabled={state.disabled || state.selectedValues.length === 0}
		>
			<BaseIcon name={state.X} size={16} />
		</button>
		<BaseIcon name={state.ChevronDown} class={state.chevronClasses} size={16} />
	</div>

	{#if state.isOpen}
		<div
			bind:this={state.dropdownRef}
			class={state.dropdownClasses}
			onclick={(event) => event.stopPropagation()}
			onkeydown={(event) => event.stopPropagation()}
			role="dialog"
			tabindex={0}
		>
			{#if state.searchable}
				<div class={state.searchContainerClasses}>
					<input
						type="text"
						class={state.searchInputClasses}
						placeholder="Search..."
						bind:value={state.searchQuery}
						onkeydown={(event) => {
							if (event.key === 'Enter') {
								event.preventDefault();
								const firstOption = state.getFilteredOptions()[0];
								if (firstOption) {
									state.selectOption(firstOption.value);
								}
							}
						}}
					/>
				</div>
			{/if}

			{#if state.filteredOptions.length > 0}
				{#each state.filteredOptions as option}
					<div
						class={state.getOptionClasses(option)}
						onclick={() => state.selectOption(option.value)}
						onkeydown={(event) => {
							if (event.key === 'Enter' || event.key === ' ') {
								event.preventDefault();
								state.selectOption(option.value);
							}
						}}
						role="option"
						aria-selected={state.selectedValues.includes(option.value)}
						tabindex={0}
					>
						{option.label}
					</div>
				{/each}
			{:else}
				<div class={state.noOptionsMessageClasses}>
					{state.searchQuery ? 'No options match your search' : 'No options available'}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.c-multiselect {
		position: relative;
	}

	.c-multiselect__display {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		padding: 0.375rem 0.5rem;
		background: var(--color-background-primary);
		cursor: pointer;
		min-height: 2.5rem;
	}

	.c-multiselect__display:focus {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	.c-multiselect__placeholder {
		color: var(--color-text-secondary);
		font-size: 0.875rem;
	}

	.c-multiselect__tag {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		background: var(--color-primary-100);
		color: var(--color-primary-700);
		border-radius: 0.25rem;
		padding: 0.125rem 0.375rem;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.c-multiselect__tag-remove {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--color-primary-600);
		border-radius: 0.125rem;
	}

	.c-multiselect__tag-remove:hover {
		color: var(--color-primary-800);
	}

	.c-multiselect__clear-btn {
		margin-left: 0.5rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--color-text-secondary);
		display: inline-flex;
		align-items: center;
	}

	.c-multiselect__clear-btn:hover {
		color: var(--color-text-primary);
	}

	.c-multiselect__chevron {
		margin-left: 0.5rem;
		color: var(--color-text-secondary);
	}

	.c-multiselect__dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: var(--layout-z-index-docked, 10);
		margin-top: 0.25rem;
		width: 100%;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		background: var(--color-background-primary);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.c-multiselect__search {
		padding: 0.5rem;
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-multiselect__search-input {
		width: 100%;
		padding: 0.375rem 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.25rem;
		font-size: 0.875rem;
		outline: none;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
	}

	.c-multiselect__option {
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		font-size: 0.875rem;
		color: var(--color-text-primary);
		transition: background-color var(--motion-duration-120, 120ms);
	}

	.c-multiselect__option:hover:not(.c-multiselect__option--disabled) {
		background: var(--color-background-secondary);
	}

	.c-multiselect__option--selected {
		background: var(--color-primary-50);
		color: var(--color-primary-700);
	}

	.c-multiselect__option--disabled {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
	}

	.c-multiselect__empty {
		padding: 0.75rem;
		text-align: center;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
