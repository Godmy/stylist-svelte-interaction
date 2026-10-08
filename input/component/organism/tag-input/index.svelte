<script lang="ts">
	import type { RecipeTagInput } from '$stylist/input/interface/recipe/tag-input';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createTagInputState } from './state.svelte';
	const X = 'x';

	let props: RecipeTagInput = $props();
	const state = createTagInputState(() => props);
</script>

<div class={`c-tag-input ${state.className}`} {...props}>
	{#each state.currentTags as tag, index}
		<span class={`c-tag-input__tag ${state.tagClass}`}>
			{tag}
			<button
				type="button"
				class={`c-tag-input__remove ${state.removeButtonClass}`}
				onclick={() => state.removeTag(index)}
			>
				<BaseIcon name={X} size={16} />
			</button>
		</span>
	{/each}

	<input
		class={`c-tag-input__input ${state.inputClass}`}
		placeholder={state.placeholder}
		value={state.inputText}
		disabled={state.disabled}
		oninput={state.handleInput}
		onkeydown={state.handleKeyDown}
	/>
</div>

<style>
	.c-tag-input {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-base, 0.375rem);
		padding: 0.5rem;
		background-color: var(--color-background-primary);
	}

	.c-tag-input__tag {
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		background-color: var(--color-primary-100);
		padding-block: 0.25rem;
		padding-inline: 0.75rem;
		font-size: var(--text-size-sm, 0.875rem);
		color: var(--color-primary-800);
	}

	.c-tag-input__remove {
		margin-inline-start: 0.5rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
		color: inherit;
	}

	.c-tag-input__input {
		flex: 1;
		min-width: 11.25rem;
		padding: 0.5rem 0.75rem;
		border: none;
		outline: none;
		background: transparent;
	}
</style>
