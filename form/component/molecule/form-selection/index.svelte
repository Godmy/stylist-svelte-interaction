<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import createFormSelectionState from './state.svelte';
	import { FormManager } from '$stylist/form/class/manager/form';
	import type { RecipeFormSelection } from '$stylist/form/interface/recipe/form-selection';

	const props: RecipeFormSelection = $props();
	const state = createFormSelectionState(() => props);
	const ChevronDown = 'chevron-down';
</script>

<section class={state.sectionClasses} {...props}>
	{#if state.showHeader}
		<header
			class="section-header {props.collapsible ? 'section-header--collapsible' : ''}"
			onclick={() => FormManager.toggleCollapsed(state, props.collapsible ?? false)}
			role={props.collapsible ? 'button' : undefined}
			aria-expanded={props.collapsible ? !state.isCollapsed : undefined}
		>
			<div class="header-content">
				<h2 class="{state.titleClass} form-selection-title">
					{props.title}
					{#if props.required}
						<span class={state.requiredMarkClass} aria-label="required section">*</span>
					{/if}
				</h2>
			</div>

			{#if props.collapsible}
				<button
					class={state.collapseButtonClass}
					aria-label={state.isCollapsed
						? `Expand ${props.title} section`
						: `Collapse ${props.title} section`}
					onclick={(e) => {
						e.stopPropagation();
						FormManager.toggleCollapsed(state, true);
					}}
				>
					<BaseIcon name={ChevronDown} class={state.iconClass} />
				</button>
			{/if}
		</header>
	{/if}

	{#if props.description}
		<p class="section-description">
			{props.description}
		</p>
	{/if}

	{#if !state.isCollapsed || !props.collapsible}
		<div class="section-content">
			{#if props.children}{@render props.children()}{/if}
		</div>
	{/if}
</section>

<style>
	.form-section {
		width: 100%;
		background-color: white;
	}

	.section-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding-bottom: 1rem;
		width: 100%;
	}

	.section-header--collapsible {
		cursor: pointer;
	}

	.header-content {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.form-selection-title {
		display: flex;
		align-items: center;
	}

	.section-content {
		width: 100%;
	}

	.section-description {
		margin-bottom: 1rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		width: 100%;
	}
</style>
