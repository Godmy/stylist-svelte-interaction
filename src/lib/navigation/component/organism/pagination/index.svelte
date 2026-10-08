<script lang="ts">
	import type { RecipePagination } from '$stylist/navigation/interface/recipe/pagination';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createPaginationState } from './state.svelte';

	let props: RecipePagination = $props();
	const state = createPaginationState(() => props);
</script>

<div class={state.containerClass} {...state.restProps}>
	<nav class={state.navClass} aria-label="pagination">
		{#if state.showFirstLast}
			<button
				type="button"
				class={state.currentPage === 1
					? state.disabledButtonClassComputed
					: state.buttonClassComputed}
				onclick={state.goToFirst}
				disabled={state.currentPage === 1 || state.disabled}
				aria-label="First page"
			>
				&laquo;
			</button>
		{/if}

		{#if state.showPrevNext}
			<button
				type="button"
				class={state.currentPage === 1 ? state.disabledButtonClassComputed : state.iconButtonClass}
				onclick={state.goToPrev}
				disabled={state.currentPage === 1 || state.disabled}
				aria-label="Previous page"
			>
				<Icon name="chevron-down" direction="left" size="sm" />
			</button>
		{/if}

		{#if state.showDots && state.getVisiblePages()[0] > 1}
			<button
				type="button"
				class={state.buttonClassComputed}
				onclick={() => state.goToPage(1)}
				aria-label="Go to page 1"
			>
				1
			</button>
			{#if state.getVisiblePages()[0] > 2}
				<span class={state.dotsClass} aria-hidden="true">...</span>
			{/if}
		{/if}

		{#each state.getVisiblePages() as page}
			<button
				type="button"
				class={page === state.currentPage
					? state.activeButtonClassComputed
					: state.buttonClassComputed}
				onclick={() => state.goToPage(page)}
				aria-current={page === state.currentPage ? 'page' : undefined}
				aria-label={`Go to page ${page}`}
			>
				{page}
			</button>
		{/each}

		{#if state.showDots && state.getVisiblePages()[state.getVisiblePages().length - 1] < state.totalPages}
			{#if state.getVisiblePages()[state.getVisiblePages().length - 1] < state.totalPages - 1}
				<span class={state.dotsClass} aria-hidden="true">...</span>
			{/if}
			<button
				type="button"
				class={state.buttonClassComputed}
				onclick={() => state.goToPage(state.totalPages)}
				aria-label={`Go to page ${state.totalPages}`}
			>
				{state.totalPages}
			</button>
		{/if}

		{#if state.showPrevNext}
			<button
				type="button"
				class={state.currentPage === state.totalPages
					? state.disabledButtonClassComputed
					: state.iconButtonClass}
				onclick={state.goToNext}
				disabled={state.currentPage === state.totalPages || state.disabled}
				aria-label="Next page"
			>
				<Icon name="chevron-down" direction="right" size="sm" />
			</button>
		{/if}

		{#if state.showFirstLast}
			<button
				type="button"
				class={state.currentPage === state.totalPages
					? state.disabledButtonClassComputed
					: state.buttonClassComputed}
				onclick={state.goToLast}
				disabled={state.currentPage === state.totalPages || state.disabled}
				aria-label="Last page"
			>
				&raquo;
			</button>
		{/if}
	</nav>
</div>

<style>
	.pagination__pagination {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.pagination__page-item {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		border-radius: 0.375rem;
		transition-property: color, background-color, border-color;
		transition-duration: 150ms;
		background-color: var(--color-primary-600);
		color: var(--color-text-primary);
		cursor: pointer;
		pointer-events: none;
	}
	.pagination__page-item:focus-visible {
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: 0 0 0 3px var(--color-primary-500);
	}
	.pagination__page-item:hover {
		background-color: var(--color-background-secondary);
	}

	.pagination__pagination-ellipsis {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		color: var(--color-text-secondary);
	}

	.pagination__pagination-prev {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		border-radius: 0.375rem;
		transition-property: color, background-color, border-color;
		transition-duration: 150ms;
		height: 2.25rem;
		width: 2.25rem;
		color: var(--color-text-primary);
		cursor: pointer;
		pointer-events: none;
	}
	.pagination__pagination-prev:focus-visible {
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: 0 0 0 3px var(--color-primary-500);
	}
	.pagination__pagination-prev:hover {
		background-color: var(--color-background-secondary);
	}

	.pagination__pagination-next {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		border-radius: 0.375rem;
		transition-property: color, background-color, border-color;
		transition-duration: 150ms;
		height: 2.25rem;
		width: 2.25rem;
		color: var(--color-text-primary);
		cursor: pointer;
		pointer-events: none;
	}
	.pagination__pagination-next:focus-visible {
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: 0 0 0 3px var(--color-primary-500);
	}
	.pagination__pagination-next:hover {
		background-color: var(--color-background-secondary);
	}

	.pagination__pagination-container {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}
</style>
