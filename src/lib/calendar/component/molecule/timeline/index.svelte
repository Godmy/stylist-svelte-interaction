<script lang="ts">
	import type { RecipeTimeline } from '$stylist/calendar/interface/recipe/timeline';
	import createTimelineState from './state.svelte';

	let props: RecipeTimeline = $props();
	const state = createTimelineState(() => props);
</script>

<div
	class="c-timeline {state.className} {state.orientation === 'vertical'
		? 'c-timeline--vertical'
		: 'c-timeline--horizontal'}"
	{...state.restProps}
>
	{#each state.items as item, index}
		<div
			class="c-timeline__item {state.orientation === 'vertical'
				? 'c-timeline__item--vertical'
				: 'c-timeline__item--horizontal'}"
		>
			<div
				class="c-timeline__connector-row {state.orientation === 'vertical'
					? 'c-timeline__connector-row--v'
					: 'c-timeline__connector-row--h'}"
			>
				<div
					class="c-timeline__step-wrap {state.orientation === 'vertical'
						? 'c-timeline__step-wrap--v'
						: 'c-timeline__step-wrap--h'}"
				>
					{#if item.icon}
						<div
							class="c-timeline__step c-timeline__step--{item.status ||
								'upcoming'} {state.iconClass}"
						>
							{@render item.icon()}
						</div>
					{:else}
						<div
							class="c-timeline__step c-timeline__step--{item.status ||
								'upcoming'} {state.iconClass}"
						>
							{index + 1}
						</div>
					{/if}
				</div>

				<div
					class="c-timeline__content {state.itemClass} {state.orientation === 'vertical'
						? 'c-timeline__content--v'
						: ''}"
				>
					<div class="c-timeline__card c-timeline__card--{item.status || 'upcoming'}">
						<div class="c-timeline__card-head">
							<h3 class="c-timeline__card-title">{item.title}</h3>
							{#if item.date}
								<span class="c-timeline__card-date">{item.date}</span>
							{/if}
						</div>
						{#if item.content}
							<div class="c-timeline__card-body">
								{@render item.content()}
							</div>
						{/if}
					</div>
				</div>
			</div>

			{#if index < state.items.length - 1}
				<div
					class="c-timeline__line {state.orientation === 'vertical'
						? 'c-timeline__line--v'
						: 'c-timeline__line--h'} {state.connectorClass}"
				></div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.c-timeline {
		width: 100%;
		box-sizing: border-box;
	}
	.c-timeline--vertical {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.c-timeline--horizontal {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(12rem, 1fr);
		gap: 1rem;
		overflow-x: auto;
		padding-block-end: 0.25rem;
	}

	.c-timeline__item {
		position: relative;
	}
	.c-timeline__item--vertical {
		display: flex;
		flex-direction: column;
	}
	.c-timeline__item--horizontal {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.c-timeline__connector-row {
		display: flex;
	}
	.c-timeline__connector-row--v {
		flex-direction: row;
	}
	.c-timeline__connector-row--h {
		flex-direction: column;
		align-items: stretch;
	}

	.c-timeline__step-wrap {
		z-index: var(--z-index-docked, 10);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.c-timeline__step-wrap--v {
		margin-right: 1rem;
	}
	.c-timeline__step-wrap--h {
		margin-bottom: 1rem;
		justify-content: center;
	}

	.c-timeline__step {
		display: flex;
		width: 2rem;
		height: 2rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.c-timeline__step--completed {
		background: var(--color-success-500);
		color: var(--color-text-inverse);
	}
	.c-timeline__step--active {
		background: var(--color-primary-500);
		color: var(--color-text-inverse);
	}
	.c-timeline__step--upcoming {
		background: var(--color-background-secondary);
		color: var(--color-text-secondary);
		border: 2px solid var(--color-border-primary);
	}
	.c-timeline__step--skipped {
		background: var(--color-neutral-300, var(--color-border-primary));
		color: var(--color-text-secondary);
	}

	.c-timeline__content {
		min-width: 0;
		margin-bottom: 1rem;
	}
	.c-timeline__content--v {
		flex: 1;
	}

	.c-timeline__card {
		box-sizing: border-box;
		min-height: 5rem;
		border-radius: 0.5rem;
		padding: 1rem;
		border: 1px solid var(--color-border-primary);
	}

	.c-timeline__card--completed {
		background: color-mix(in srgb, var(--color-success-500) 8%, var(--color-background-primary));
	}
	.c-timeline__card--active {
		background: color-mix(in srgb, var(--color-primary-500) 8%, var(--color-background-primary));
		border: 1px solid var(--color-primary-200, var(--color-primary-500));
	}
	.c-timeline__card--upcoming {
		background: var(--color-background-secondary);
	}
	.c-timeline__card--skipped {
		background: var(--color-background-secondary);
		opacity: 0.7;
	}

	.c-timeline__card-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.c-timeline__card-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0;
	}

	.c-timeline__card-date {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		white-space: nowrap;
	}

	.c-timeline__card-body {
		margin-top: 0.5rem;
		color: var(--color-text-secondary);
	}

	.c-timeline__line {
		background: var(--color-background-tertiary, var(--color-border-primary));
	}
	.c-timeline__line--v {
		position: absolute;
		left: 1rem;
		top: 2rem;
		width: 2px;
		height: calc(100% - 1rem);
	}
	.c-timeline__line--h {
		position: absolute;
		top: 1rem;
		left: calc(50% + 1rem);
		height: 2px;
		width: calc(100% + 1rem);
	}
</style>
