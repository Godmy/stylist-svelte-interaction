<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import Svg from '$stylist/svg/component/atom/svg/index.svelte';

	import type { RecipeAccordionLayout } from '$stylist/dialog/interface/recipe/accordion-layout';
	import createAccordionLayoutComponentState from '$stylist/dialog/component/atom/accordion-layout/state.svelte';

	let props: RecipeAccordionLayout = $props();

	const state = createAccordionLayoutComponentState(() => props);
</script>

<div
	{...state.restProps}
	class={['c-accordion-layout', props.class].filter(Boolean).join(' ')}
	data-expanded={state.open || undefined}
	data-disabled={props.disabled || undefined}
>
	<button
		type="button"
		class="c-accordion-layout__header"
		onclick={() => !props.disabled && !props.alwaysOpen && state.ctx.handleValueChange(props.value)}
		aria-expanded={state.open}
		aria-disabled={props.disabled || props.alwaysOpen || undefined}
		aria-label={props.title}
		title={props.title}
		disabled={props.disabled}
	>
		{#if props.icon || props.iconSvg}
			<span class="c-accordion-layout__icon" aria-hidden="true">
				{#if props.iconSvg}
					<Svg svg={props.iconSvg} size={24} />
				{:else}
					<BaseIcon name={props.icon} size={24} />
				{/if}
			</span>
		{/if}
		<span class="c-accordion-layout__title-group">
			<span class="c-accordion-layout__titles">
				<span class="c-accordion-layout__title">{props.title}</span>
				{#if props.subtitle}
					<span class="c-accordion-layout__subtitle">{props.subtitle}</span>
				{/if}
			</span>
			{#if props.headerEnd}
				<span class="c-accordion-layout__header-end">{@render props.headerEnd()}</span>
			{/if}
		</span>
		<span class="c-accordion-layout__chevron">
			<BaseIcon name="chevron-down" size={20} />
		</span>
	</button>
	<div
		class="c-accordion-layout__panel"
		aria-hidden={!state.open}
		data-expanded={state.open || undefined}
	>
		<div class="c-accordion-layout__content">
			{#if props.children}{@render props.children()}{/if}
		</div>
	</div>
</div>

<style>
	.c-accordion-layout {
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-accordion-layout:last-child {
		border-bottom: none;
	}

	.c-accordion-layout__header {
		gap: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		text-align: left;
		padding: var(--space-4, 1rem);
		font-weight: 500;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border: none;
		cursor: pointer;
		transition: background-color var(--duration-120, 120ms);
	}

	.c-accordion-layout__icon {
		display: inline-grid;
		place-items: center;
		flex-shrink: 0;
	}

	.c-accordion-layout__header:hover {
		background: var(--color-background-secondary);
	}

	.c-accordion-layout__header:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-500) inset;
	}

	.c-accordion-layout[data-disabled] .c-accordion-layout__header {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	.c-accordion-layout[data-expanded] .c-accordion-layout__header {
		background: var(--color-primary-50);
		color: var(--color-primary-700);
	}

	.c-accordion-layout__title-group {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		min-width: 0;
	}

	.c-accordion-layout__titles {
		display: grid;
		gap: 0.15rem;
		min-width: 0;
	}

	.c-accordion-layout__subtitle {
		font-size: 0.85em;
		font-weight: 400;
		opacity: 0.7;
	}

	.c-accordion-layout__header-end {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		flex-shrink: 0;
	}

	.c-accordion-layout__chevron {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		transition: transform var(--duration-200, 200ms)
			var(--easing-ease, cubic-bezier(0.4, 0, 0.2, 1));
	}

	.c-accordion-layout[data-expanded] .c-accordion-layout__chevron {
		transform: rotate(180deg);
	}

	.c-accordion-layout__panel {
		max-height: 0;
		overflow: hidden;
		transition: max-height var(--duration-200, 200ms) ease;
	}

	.c-accordion-layout__panel[data-expanded] {
		max-height: 2000px;
	}

	.c-accordion-layout__content {
		padding: var(--space-4, 1rem);
		border-top: 1px solid var(--color-border-primary);
		background: var(--color-background-primary);
	}
</style>
