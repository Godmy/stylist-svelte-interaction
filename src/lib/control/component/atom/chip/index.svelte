<script lang="ts">
	import type { RecipeChip } from '$stylist/control/interface/recipe/chip';
	import createChipState from './state.svelte';

	let props: RecipeChip = $props();

	const state = createChipState(() => props);
	const children = $derived(props.children);

	const restProps = $derived(
		(() => {
			const {
				class: _class,
				label: _label,
				variant: _variant,
				size: _size,
				closable: _closable,
				disabled: _disabled,
				children: _children,
				...rest
			} = props;
			return rest;
		})()
	);
</script>

<div
	class="c-chip"
	data-variant={state.variant}
	data-size={state.size}
	data-disabled={state.disabled || undefined}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		{state.label}
	{/if}

	{#if state.closable}
		<button
			class="c-chip__close"
			aria-label="Close"
			disabled={state.disabled}
			onclick={state.handleClose}
		>
			<svg
				class="c-chip__close-icon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				aria-hidden="true"
			>
				<path d="M6 6l12 12" />
				<path d="M18 6L6 18" />
			</svg>
		</button>
	{/if}
</div>

<style>
	.c-chip {
		display: inline-flex;
		align-items: center;
		border-radius: 0.375rem;
		font-weight: 500;
		gap: 0.25rem;
		transition:
			background var(--motion-duration-120, 120ms) var(--motion-easing-ease, ease),
			color var(--motion-duration-120, 120ms) var(--motion-easing-ease, ease),
			border-color var(--motion-duration-120, 120ms) var(--motion-easing-ease, ease);
	}

	/* ── Sizes ─────────────────────────────────────────────────── */
	.c-chip[data-size='xs'] {
		padding: 0.125rem 0.25rem;
		font-size: 0.625rem;
	}
	.c-chip[data-size='sm'] {
		padding: 0.125rem 0.375rem;
		font-size: 0.75rem;
	}
	.c-chip[data-size='md'] {
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
	}
	.c-chip[data-size='lg'] {
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
	}
	.c-chip[data-size='xl'] {
		padding: 0.5rem 0.875rem;
		font-size: 1.125rem;
	}
	.c-chip[data-size='2xl'] {
		padding: 0.625rem 1rem;
		font-size: 1.25rem;
	}
	.c-chip[data-size='full'] {
		padding: 0.625rem 1rem;
		font-size: 1.25rem;
		width: 100%;
	}

	/* ── Variants ───────────────────────────────────────────────── */
	.c-chip[data-variant='default'] {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-primary);
	}
	.c-chip[data-variant='default']:hover {
		background: var(--color-background-secondary);
	}
	.c-chip[data-variant='primary'] {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-chip[data-variant='primary']:hover {
		background: var(--color-primary-700);
	}
	.c-chip[data-variant='secondary'] {
		background: var(--color-secondary-600);
		color: var(--color-text-inverse);
		border: 1px solid var(--color-secondary-700);
	}
	.c-chip[data-variant='secondary']:hover {
		background: var(--color-secondary-500);
	}
	.c-chip[data-variant='success'] {
		background: var(--color-success-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-chip[data-variant='success']:hover {
		background: var(--color-success-700);
	}
	.c-chip[data-variant='warning'] {
		background: var(--color-warning-500);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-chip[data-variant='warning']:hover {
		background: var(--color-warning-600);
	}
	.c-chip[data-variant='danger'] {
		background: var(--color-danger-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-chip[data-variant='danger']:hover {
		background: var(--color-danger-700);
	}
	.c-chip[data-variant='error'] {
		background: var(--color-danger-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-chip[data-variant='outline'] {
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid var(--color-neutral-400);
	}
	.c-chip[data-variant='outline']:hover {
		background: var(--color-background-secondary);
		border-color: var(--color-neutral-500);
	}
	.c-chip[data-variant='ghost'] {
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-chip[data-variant='ghost']:hover {
		background: var(--color-background-secondary);
	}
	.c-chip[data-variant='link'] {
		background: transparent;
		color: var(--color-primary-600);
		text-decoration: underline;
		border: 1px solid transparent;
	}
	.c-chip[data-variant='link']:hover {
		color: var(--color-primary-700);
	}
	.c-chip[data-variant='subtle'] {
		background: var(--color-neutral-100);
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-chip[data-variant='subtle']:hover {
		background: var(--color-neutral-200);
	}
	.c-chip[data-variant='neutral'] {
		background: var(--color-neutral-100);
		color: var(--color-text-primary);
		border: 1px solid var(--color-neutral-300);
	}
	.c-chip[data-variant='neutral']:hover {
		background: var(--color-neutral-200);
	}
	.c-chip[data-variant='dark'] {
		background: var(--color-neutral-800);
		color: var(--color-text-inverse);
		border: 1px solid var(--color-neutral-700);
	}
	.c-chip[data-variant='dark']:hover {
		background: var(--color-neutral-700);
	}
	.c-chip[data-variant='solid'] {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-chip[data-variant='elevated'] {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-secondary);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}
	.c-chip[data-variant='elevated']:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
	.c-chip[data-variant='flat'] {
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-chip[data-variant='flat']:hover {
		background: var(--color-background-primary);
	}

	/* ── Disabled ───────────────────────────────────────────────── */
	.c-chip[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	/* ── Close button ───────────────────────────────────────────── */
	.c-chip__close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-left: 0.25rem;
		padding: 0.125rem;
		border-radius: 9999px;
		border: none;
		background: transparent;
		color: currentColor;
		opacity: 0.72;
		cursor: pointer;
		line-height: 1;
		transition:
			background var(--motion-duration-120, 120ms) var(--motion-easing-ease, ease),
			color var(--motion-duration-120, 120ms) var(--motion-easing-ease, ease);
	}
	.c-chip__close:hover {
		background: color-mix(in srgb, currentColor 18%, transparent);
		opacity: 1;
	}
	.c-chip__close:disabled {
		cursor: not-allowed;
	}

	.c-chip__close-icon {
		width: 0.75rem;
		height: 0.75rem;
	}
</style>
