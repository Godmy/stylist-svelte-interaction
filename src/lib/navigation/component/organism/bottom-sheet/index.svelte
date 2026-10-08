<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		open?: boolean;
		title?: string;
		closable?: boolean;
		onClose?: () => void;
		children?: Snippet;
		actions?: Snippet;
	};

	let { open = false, title = 'Sheet', closable = true, onClose, children, actions }: Props = $props();

	function close() {
		if (!closable) return;
		open = false;
		onClose?.();
	}
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && close()} />

{#if open}
	<div class="c-bottom-sheet__backdrop" role="presentation" onclick={close}></div>
	<section class="c-bottom-sheet" role="dialog" aria-modal="true" aria-label={title}>
		<div class="c-bottom-sheet__handle" aria-hidden="true"></div>
		<header class="c-bottom-sheet__header">
			<h2>{title}</h2>
			{#if closable}
				<button type="button" aria-label="Close" onclick={close}>x</button>
			{/if}
		</header>
		<div class="c-bottom-sheet__body">
			{#if children}
				{@render children()}
			{/if}
		</div>
		{#if actions}
			<footer class="c-bottom-sheet__actions">
				{@render actions()}
			</footer>
		{/if}
	</section>
{/if}

<style>
	.c-bottom-sheet__backdrop {
		position: fixed;
		inset: 0;
		z-index: var(--z-index-modal, 50);
		background: rgba(0, 0, 0, 0.42);
	}
	.c-bottom-sheet {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: calc(var(--z-index-modal, 50) + 1);
		display: grid;
		gap: 1rem;
		max-height: min(86vh, 42rem);
		padding: 0.75rem 1rem 1rem;
		overflow: auto;
		border-radius: 1rem 1rem 0 0;
		background: var(--color-background-primary, #fff);
		box-shadow: 0 -24px 72px rgba(15, 23, 42, 0.24);
	}
	.c-bottom-sheet__handle {
		justify-self: center;
		width: 3rem;
		height: 0.25rem;
		border-radius: 999px;
		background: var(--color-border-secondary, rgba(15, 23, 42, 0.18));
	}
	.c-bottom-sheet__header,
	.c-bottom-sheet__actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}
	.c-bottom-sheet__header h2 {
		margin: 0;
		font-size: 1rem;
		line-height: 1.25;
	}
	.c-bottom-sheet__header button {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border: 0;
		border-radius: 999px;
		background: var(--color-background-secondary, rgba(15, 23, 42, 0.06));
		cursor: pointer;
	}
	.c-bottom-sheet__body {
		min-width: 0;
	}
</style>
