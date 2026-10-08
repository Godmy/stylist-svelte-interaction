<script lang="ts">
	import type { RecipeTag } from '$stylist/control/interface/recipe/tag';
	import createTagState from './state.svelte';

	let props: RecipeTag = $props();
	const restProps = $derived(
		(() => {
			const {
				class: _class,
				text: _text,
				label: _label,
				variant: _variant,
				size: _size,
				closable: _closable,
				disabled: _disabled,
				icon: _icon,
				content: _content,
				...rest
			} = props;
			return rest;
		})()
	);

	const state = createTagState(() => props);
	const icon = $derived(props.icon);
	const content = $derived(props.content);
</script>

<span
	class="c-tag"
	data-variant={state.variant}
	data-size={state.size}
	data-disabled={state.disabled || undefined}
	{...restProps}
>
	{#if icon}
		<span class="c-tag__icon-wrapper" aria-hidden="true">
			{@render icon()}
		</span>
	{/if}

	<span class="c-tag__content">
		{#if content}
			{@render content()}
		{:else if state.text}
			{state.text}
		{/if}
	</span>

	{#if state.closable}
		<button
			type="button"
			class="c-tag__close"
			onclick={state.handleClose}
			disabled={state.disabled}
			aria-label="Remove tag"
		>
			<svg
				class="c-tag__close-icon"
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
</span>

<style>
	.c-tag {
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
	.c-tag[data-size='xs'] {
		padding: 0.125rem 0.25rem;
		font-size: 0.625rem;
	}
	.c-tag[data-size='sm'] {
		padding: 0.125rem 0.375rem;
		font-size: 0.75rem;
	}
	.c-tag[data-size='md'] {
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
	}
	.c-tag[data-size='lg'] {
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
	}
	.c-tag[data-size='xl'] {
		padding: 0.5rem 0.875rem;
		font-size: 1.125rem;
	}
	.c-tag[data-size='2xl'] {
		padding: 0.625rem 1rem;
		font-size: 1.25rem;
	}
	.c-tag[data-size='full'] {
		padding: 0.625rem 1rem;
		font-size: 1.25rem;
		width: 100%;
	}

	/* ── Variants ───────────────────────────────────────────────── */
	.c-tag[data-variant='default'] {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-primary);
	}
	.c-tag[data-variant='default']:hover {
		background: var(--color-background-secondary);
	}
	.c-tag[data-variant='primary'] {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-tag[data-variant='primary']:hover {
		background: var(--color-primary-700);
	}
	.c-tag[data-variant='secondary'] {
		background: var(--color-secondary-600);
		color: var(--color-text-inverse);
		border: 1px solid var(--color-secondary-700);
	}
	.c-tag[data-variant='secondary']:hover {
		background: var(--color-secondary-500);
	}
	.c-tag[data-variant='success'] {
		background: var(--color-success-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-tag[data-variant='success']:hover {
		background: var(--color-success-700);
	}
	.c-tag[data-variant='warning'] {
		background: var(--color-warning-500);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-tag[data-variant='warning']:hover {
		background: var(--color-warning-600);
	}
	.c-tag[data-variant='danger'] {
		background: var(--color-danger-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-tag[data-variant='danger']:hover {
		background: var(--color-danger-700);
	}
	.c-tag[data-variant='error'] {
		background: var(--color-danger-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-tag[data-variant='outline'] {
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid var(--color-neutral-400);
	}
	.c-tag[data-variant='outline']:hover {
		background: var(--color-background-secondary);
		border-color: var(--color-neutral-500);
	}
	.c-tag[data-variant='ghost'] {
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-tag[data-variant='ghost']:hover {
		background: var(--color-background-secondary);
	}
	.c-tag[data-variant='link'] {
		background: transparent;
		color: var(--color-primary-600);
		text-decoration: underline;
		border: 1px solid transparent;
	}
	.c-tag[data-variant='link']:hover {
		color: var(--color-primary-700);
	}
	.c-tag[data-variant='subtle'] {
		background: var(--color-neutral-100);
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-tag[data-variant='subtle']:hover {
		background: var(--color-neutral-200);
	}
	.c-tag[data-variant='neutral'] {
		background: var(--color-neutral-100);
		color: var(--color-text-primary);
		border: 1px solid var(--color-neutral-300);
	}
	.c-tag[data-variant='neutral']:hover {
		background: var(--color-neutral-200);
	}
	.c-tag[data-variant='dark'] {
		background: var(--color-neutral-800);
		color: var(--color-text-inverse);
		border: 1px solid var(--color-neutral-700);
	}
	.c-tag[data-variant='dark']:hover {
		background: var(--color-neutral-700);
	}
	.c-tag[data-variant='solid'] {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-tag[data-variant='elevated'] {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-secondary);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}
	.c-tag[data-variant='elevated']:hover {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
	.c-tag[data-variant='flat'] {
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-tag[data-variant='flat']:hover {
		background: var(--color-background-primary);
	}

	/* ── Disabled ───────────────────────────────────────────────── */
	.c-tag[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	/* ── Sub-elements ───────────────────────────────────────────── */
	.c-tag__icon-wrapper {
		display: inline-flex;
		align-items: center;
	}

	.c-tag__content {
		display: inline;
	}

	.c-tag__close {
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
	.c-tag__close:hover {
		background: color-mix(in srgb, currentColor 18%, transparent);
		opacity: 1;
	}
	.c-tag__close:disabled {
		cursor: not-allowed;
	}

	.c-tag__close-icon {
		width: 0.75rem;
		height: 0.75rem;
	}
</style>
