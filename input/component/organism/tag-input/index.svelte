<script lang="ts">
	import type { RecipeTagInput } from '$stylist/input/interface/recipe/tag-input';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createTagInputState } from '$stylist/input/component/organism/tag-input/state.svelte';
	import { resolveInputAttributes } from '$stylist/input/function/resolve/input-attributes';
	const X = 'x';

	let { tags = $bindable<string[]>([]), ...props }: RecipeTagInput = $props();
	const nativeProps = $derived(resolveInputAttributes(props, ['disabled', 'placeholder', 'name']));
	const state = createTagInputState(() => ({
		...props,
		tags,
		onInput: (next) => {
			tags = next;
			props.onInput?.(next);
		}
	}));
</script>

<div {...nativeProps} class={`c-tag-input ${state.className}`}>
	{#each state.currentTags as tag, index (index)}
		<span class={`c-tag-input__tag ${state.tagClass}`}>
			{tag}
			<button
				type="button"
				class={`c-tag-input__remove ${state.removeButtonClass}`}
				disabled={state.disabled}
				aria-label={`Remove ${tag}`}
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
		background: transparent;
	}
	.c-tag-input:focus-within {
		outline: var(--focus-width, 2px) solid var(--color-primary-500, Highlight);
		outline-offset: var(--focus-offset, 2px);
	}
</style>
