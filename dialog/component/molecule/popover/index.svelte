<script lang="ts">
	import createPopoverState from '$stylist/dialog/component/molecule/popover/state.svelte';
	import type { RecipePopover } from '$stylist/dialog/interface/recipe/popover';

	let props: RecipePopover = $props();
	const state = createPopoverState(() => props);
</script>

<div class={['layout-popover', props.class].filter(Boolean).join(' ')}>
	<div
		bind:this={state.triggerElement}
		class="layout-popover__trigger"
		role="button"
		tabindex="0"
		aria-expanded={state.isVisible}
		aria-haspopup="dialog"
		onclick={state.toggleOpen}
		onkeydown={(event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				state.toggleOpen();
			}
		}}
	>
		{@render props.trigger()}
	</div>

	{#if state.isVisible}
		<div
			bind:this={state.popoverElement}
			class={[
				'layout-popover__content',
				`layout-popover__content--${state.popoverId ? 'visible' : ''}`
			]
				.filter(Boolean)
				.join(' ')}
			data-position={props.position ?? 'bottom'}
		>
			{#if props.title}
				<h3 class="layout-popover__title">{props.title}</h3>
			{/if}
			<div>
				{@render props.content()}
			</div>
		</div>
	{/if}
</div>

<style>
	.layout-popover {
		position: relative;
		display: inline-block;
	}

	.layout-popover__trigger {
		display: contents;
	}

	.layout-popover__content {
		position: absolute;
		z-index: var(--z-index-docked, 40);
		background-color: var(--color-background-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-2);
		box-shadow:
			0 4px 6px rgba(0, 0, 0, 0.07),
			0 10px 15px rgba(0, 0, 0, 0.1);
		padding: var(--space-4);
		min-width: 200px;
	}

	.layout-popover__content[data-position='bottom'] {
		top: 100%;
		left: 0;
		margin-top: var(--space-2);
	}

	.layout-popover__content[data-position='top'] {
		bottom: 100%;
		left: 0;
		margin-bottom: var(--space-2);
	}

	.layout-popover__content[data-position='left'] {
		right: 100%;
		top: 0;
		margin-right: var(--space-2);
	}

	.layout-popover__content[data-position='right'] {
		left: 100%;
		top: 0;
		margin-left: var(--space-2);
	}

	.layout-popover__title {
		font-weight: 600;
		margin-bottom: var(--space-2);
	}
</style>
