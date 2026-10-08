<script lang="ts">
	import type { RecipeAutoComplete } from '$stylist/search/interface/recipe/auto-complete';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createAutoCompleteState } from './state.svelte';
	const Search = 'search';

	let props: RecipeAutoComplete = $props();
	const state = createAutoCompleteState(() => props);
</script>

<div class={`c-auto-complete ${state.className}`.trim()}>
	<div class="c-auto-complete__input-wrap">
		<div class="c-auto-complete__icon">
			<BaseIcon
				name={Search}
				size={20} style="color: var(--color-text-tertiary)"
			/>
		</div>
		<input
			type="text"
			class={`c-auto-complete__input ${state.inputClass}`}
			placeholder={state.placeholder}
			value={state.inputValue}
			oninput={state.handleInput}
			onkeydown={state.handleKeyDown}
			onfocus={state.open}
			onblur={state.close}
			{...props}
		/>
	</div>

	{#if state.isOpen && state.options.length > 0}
		<ul class={`c-auto-complete__list ${state.listClass}`} role="listbox">
			{#each state.options as option, index}
				<li
					class={`c-auto-complete__item ${index === state.highlightedIndex ? 'c-auto-complete__item--highlighted' : ''} ${state.itemClass}`}
					role="option"
					aria-selected={index === state.highlightedIndex}
					onclick={() => state.handleSelect(option)}
					onkeydown={(event) => {
						if (event.key === 'Enter' || event.key === ' ') {
							event.preventDefault();
							state.handleSelect(option);
						}
					}}
					tabindex={0}
				>
					<span>{option.label}</span>
					{#if option.meta}
						<span class="c-auto-complete__meta">{option.meta}</span>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.c-auto-complete {
		position: relative;
	}

	.c-auto-complete__input-wrap {
		position: relative;
	}

	.c-auto-complete__icon {
		pointer-events: none;
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		display: flex;
		align-items: center;
		padding-inline-start: 0.75rem;
	}

	.c-auto-complete__input {
		display: block;
		width: 100%;
		padding-block: 0.5rem;
		padding-inline-start: 2.5rem;
		padding-inline-end: 0.75rem;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-base, 0.375rem);
		background-color: var(--color-background-primary);
	}

	.c-auto-complete__input:focus {
		outline: none;
		box-shadow: 0 0 0 1px var(--color-primary-500);
	}

	.c-auto-complete__list {
		position: absolute;
		z-index: var(--z-index-docked);
		margin-block-start: 0.25rem;
		max-height: 15rem;
		width: 100%;
		overflow: auto;
		border-radius: var(--border-radius-base, 0.375rem);
		background-color: var(--color-background-primary);
		padding-block: 0.25rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		list-style: none;
		margin: 0;
		padding-inline: 0;
	}

	.c-auto-complete__item {
		position: relative;
		cursor: pointer;
		padding: 0.5rem 0.75rem;
	}

	.c-auto-complete__item:hover {
		background-color: var(--color-primary-100);
	}

	.c-auto-complete__item--highlighted {
		background-color: var(--color-primary-100);
	}

	.c-auto-complete__meta {
		margin-inline-start: 0.5rem;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}
</style>
