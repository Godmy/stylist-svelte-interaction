<script lang="ts">
	import { PresetCombobox } from '$stylist/control/const/preset/combobox';
	import type { RecipeCombobox } from '$stylist/control/interface/recipe/combobox';
	import { createComboboxState } from './state.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeCombobox = $props();
	const state = createComboboxState(() => props);

	const restProps = $derived.by(() => {
		const {
			class: _class,
			id: _id,
			items: _items,
			value: _value,
			label: _label,
			description: _description,
			placeholder: _placeholder,
			emptyText: _emptyText,
			disabled: _disabled,
			clearable: _clearable,
			loading: _loading,
			...rest
		} = props;
		return rest;
	});
</script>

<div
	class={['c-combobox', state.className].filter(Boolean).join(' ')}
	data-combobox={state.id}
	data-disabled={state.disabled || undefined}
>
	{#if state.label}
		<label for={state.id} class="c-combobox__label">
			{state.label}
		</label>
	{/if}

	<div class="c-combobox__input-wrap">
		<div class="c-combobox__input-row">
			<input
				id={state.id}
				type="text"
				bind:this={state.inputRef}
				class="c-combobox__input"
				placeholder={state.placeholder}
				bind:value={state.query}
				oninput={state.handleInput}
				onkeydown={state.handleKeydown}
				onfocus={state.handleFocus}
				onblur={state.handleBlur}
				disabled={state.disabled}
				aria-autocomplete="list"
				aria-controls={`${state.id}-listbox`}
			/>

			{#if state.loading}
				<BaseIcon name={PresetCombobox.Loader2} class="c-combobox__spinner" aria-hidden="true" />
			{:else if state.clearable && state.query}
				<button
					type="button"
					class="c-combobox__clear-btn"
					onclick={state.clearSelection}
					aria-label="Очистить выбор"
				>
					<BaseIcon name={PresetCombobox.X} class="c-combobox__icon" aria-hidden="true" />
				</button>
			{/if}

			<button
				type="button"
				class="c-combobox__toggle-btn"
				aria-label="Переключить список вариантов"
				onclick={() => (state.isOpen ? state.closeList() : state.openList())}
				disabled={state.disabled}
			>
				<BaseIcon name={PresetCombobox.ChevronDown} class="c-combobox__icon" aria-hidden="true" />
			</button>
		</div>

		{#if state.isOpen}
			<div id={`${state.id}-listbox`} class="c-combobox__dropdown" role="listbox">
				{#if !state.loading && state.hasResults}
					{@const options = state.filteredItems}
					{#each options as item, index (item.id)}
						<button
							type="button"
							class="c-combobox__option"
							data-selected={state.selectedItem?.id === item.id || undefined}
							data-highlighted={state.highlighted === index || undefined}
							data-disabled={item.disabled || undefined}
							disabled={item.disabled}
							onclick={() => state.selectItem(item)}
							onmouseenter={() => (state.highlighted = index)}
							onfocus={() => (state.highlighted = index)}
						>
							<span class="c-combobox__option-label">{item.label}</span>
							{#if item.description}
								<span class="c-combobox__option-desc">{item.description}</span>
							{/if}
							{#if item.meta}
								<span class="c-combobox__option-meta">{item.meta}</span>
							{/if}
						</button>
					{/each}
				{:else if state.loading}
					<div class="c-combobox__loading">Загрузка...</div>
				{:else}
					<div class="c-combobox__empty">{state.emptyText}</div>
				{/if}
			</div>
		{/if}
	</div>

	{#if state.description}
		<p class="c-combobox__description">{state.description}</p>
	{/if}
</div>

<style>
	.c-combobox {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.c-combobox__label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.c-combobox__input-wrap {
		position: relative;
	}

	.c-combobox__input-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		background: var(--color-background-primary);
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		transition: border-color var(--motion-duration-120, 120ms);
	}

	.c-combobox__input-row:focus-within {
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary-500) 20%, transparent);
	}

	.c-combobox[data-disabled] .c-combobox__input-row {
		cursor: not-allowed;
		background: var(--color-background-secondary);
		opacity: var(--opacity-70, 0.7);
	}

	.c-combobox__input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: var(--color-text-primary);
	}

	.c-combobox__input::placeholder {
		color: var(--color-text-tertiary);
	}

	:global(.c-combobox__spinner) {
		width: 1rem;
		height: 1rem;
		animation: spin 1s linear infinite;
		color: var(--color-text-tertiary);
		flex-shrink: 0;
	}

	:global(.c-combobox__spinner circle) {
		opacity: 0.25;
	}

	:global(.c-combobox__spinner path) {
		opacity: 0.75;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.c-combobox__icon {
		width: 1rem;
		height: 1rem;
	}

	.c-combobox__clear-btn,
	.c-combobox__toggle-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		border: none;
		background: transparent;
		cursor: pointer;
		border-radius: 0.25rem;
		color: var(--color-text-tertiary);
		flex-shrink: 0;
	}

	.c-combobox__clear-btn:hover,
	.c-combobox__toggle-btn:hover {
		color: var(--color-text-secondary);
	}

	.c-combobox__clear-btn:focus-visible,
	.c-combobox__toggle-btn:focus-visible {
		outline: 2px solid var(--color-primary-500);
	}

	.c-combobox__dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: var(--layout-z-index-docked, 10);
		margin-top: 0.5rem;
		max-height: 15rem;
		width: 100%;
		overflow-y: auto;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		background: var(--color-background-primary);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	}

	.c-combobox__option {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 100%;
		padding: 0.5rem 0.75rem;
		text-align: left;
		font-size: 0.875rem;
		border: none;
		background: transparent;
		cursor: pointer;
		color: var(--color-text-primary);
		transition: background-color var(--motion-duration-120, 120ms);
	}

	.c-combobox__option:hover:not([data-disabled]) {
		background: var(--color-primary-50);
	}

	.c-combobox__option[data-highlighted] {
		background: var(--color-primary-50);
	}

	.c-combobox__option[data-selected] {
		background: var(--color-primary-100);
		color: var(--color-primary-700);
	}

	.c-combobox__option[data-disabled] {
		cursor: not-allowed;
		color: var(--color-text-tertiary);
	}

	.c-combobox__option-label {
		font-weight: 500;
	}

	.c-combobox__option-desc {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.c-combobox__option-meta {
		font-size: 0.75rem;
		color: var(--color-text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.c-combobox__loading,
	.c-combobox__empty {
		display: flex;
		justify-content: center;
		padding: 1rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.c-combobox__description {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
