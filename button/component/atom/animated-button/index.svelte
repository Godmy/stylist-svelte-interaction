<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'children' | 'onclick'> &
		Pick<
			HTMLButtonAttributes,
			| 'type'
			| 'disabled'
			| 'name'
			| 'value'
			| 'form'
			| 'formaction'
			| 'formenctype'
			| 'formmethod'
			| 'formnovalidate'
			| 'formtarget'
		> & {
			onclick?: (
				event: MouseEvent & { currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement) }
			) => void;
			children?: Snippet;
			href?: string;
			target?: '_blank' | '_self' | '_parent' | '_top';
			rel?: string;
			effect?: 'shine' | 'glow' | 'fill' | 'arrow' | 'selection' | 'morph';
			loading?: boolean;
			/** Run the shine effect automatically, with a pause between passes. */
			attention?: boolean;
			/** Continuously move two highlights around the rounded border. */
			animatedBorder?: boolean;
			selected?: boolean;
			block?: boolean;
		};
	let {
		children,
		href,
		target,
		rel,
		effect = 'shine',
		loading = false,
		attention = false,
		animatedBorder = false,
		selected = false,
		block = false,
		disabled = false,
		type = 'button',
		class: className = '',
		onclick,
		...rest
	}: Props = $props();
	let blocked = $derived(disabled || loading);
</script>

{#snippet content()}
	{#if animatedBorder}
		<svg class="animated-button__edge" aria-hidden="true" focusable="false">
			<rect class="animated-button__edge-track" x="1" y="1" pathLength="100" />
		</svg>
	{/if}
	<span class="animated-button__label">{@render children?.()}</span>
	{#if loading}
		<span class="animated-button__spinner" aria-hidden="true"></span>
	{:else if effect === 'arrow'}
		<span class="animated-button__arrow" aria-hidden="true">→</span>
	{:else if effect === 'selection' && selected}
		<span aria-hidden="true">✓</span>
	{/if}
{/snippet}

{#if href !== undefined}
	<a
		{...rest}
		href={blocked ? undefined : href}
		{target}
		rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
		class={['animated-button', className]}
		data-effect={effect}
		data-attention={attention || undefined}
		data-block={block || undefined}
		data-disabled={blocked || undefined}
		data-selected={selected || undefined}
		aria-disabled={blocked || undefined}
		aria-busy={loading || undefined}
		tabindex={blocked ? -1 : (rest.tabindex ?? undefined)}
		onclick={(event) => {
			if (blocked) event.preventDefault();
			else onclick?.(event);
		}}>{@render content()}</a
	>
{:else}
	<button
		{...rest}
		{type}
		disabled={blocked}
		class={['animated-button', className]}
		data-effect={effect}
		data-attention={attention || undefined}
		data-block={block || undefined}
		data-disabled={blocked || undefined}
		data-selected={selected || undefined}
		aria-busy={loading || undefined}
		{onclick}>{@render content()}</button
	>
{/if}

<style>
	.animated-button {
		position: relative;
		isolation: isolate;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		min-height: 48px;
		max-width: 100%;
		padding: 0.9rem 1.4rem;
		overflow: hidden;
		border: 1px solid var(--button-border, transparent);
		border-radius: var(--button-radius, 16px);
		background: var(--button-background, var(--color-primary-600, #173f35));
		color: var(--button-color, #fff);
		font: inherit;
		font-weight: 650;
		line-height: 1.4;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		transition:
			background-color 180ms ease,
			box-shadow 180ms ease,
			transform 120ms ease;
	}
	.animated-button[data-block] {
		width: 100%;
	}
	.animated-button__label {
		min-width: 0;
		overflow-wrap: anywhere;
	}
	.animated-button__edge {
		position: absolute;
		inset: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	.animated-button__edge-track {
		width: calc(100% - 2px);
		height: calc(100% - 2px);
		rx: calc(var(--button-radius, 16px) - 1px);
		fill: none;
		stroke: var(--button-edge-color, #f4c47e);
		stroke-width: var(--button-edge-width, 2px);
		stroke-linecap: round;
		stroke-dasharray: 14 36 14 36;
		animation: button-edge-orbit var(--button-edge-duration, 6s) linear infinite;
	}
	.animated-button[data-disabled] .animated-button__edge-track {
		animation: none;
	}
	.animated-button:focus-visible {
		outline: 3px solid var(--button-focus, #f28a00);
		outline-offset: 4px;
	}
	.animated-button:active:not([data-disabled]) {
		transform: var(--button-pressed-transform, scale(0.98));
	}
	.animated-button[data-disabled] {
		opacity: 0.65;
		cursor: default;
	}
	.animated-button::before {
		pointer-events: none;
	}
	.animated-button[data-effect='shine']::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(
			110deg,
			transparent 25%,
			var(--button-shine-color, rgb(255 255 255 / 0.28)) 50%,
			transparent 75%
		);
		transform: translateX(-120%);
	}
	.animated-button[data-effect='shine'][data-attention]:not([data-disabled])::before {
		animation: button-attention 5s ease-in-out infinite;
	}
	.animated-button[data-effect='shine']:focus-visible:not([data-disabled])::before {
		animation: button-shine 700ms ease-out;
	}
	/* Attention buttons keep shining while hovered/focused (2026-10-06,
	   заказчик): an immediate pass, then the loop resumes, faster. */
	.animated-button[data-effect='shine'][data-attention]:focus-visible:not([data-disabled])::before {
		animation:
			button-shine 700ms ease-out,
			button-shine-loop var(--button-attention-active-duration, 2.5s) ease-in-out 700ms infinite;
	}
	.animated-button[data-effect='glow']:focus-visible:not([data-disabled]) {
		box-shadow:
			0 0 0 4px var(--button-glow, rgb(54 167 130 / 0.25)),
			0 8px 28px var(--button-glow, rgb(54 167 130 / 0.35));
	}
	.animated-button[data-effect='fill']::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: var(--button-fill, rgb(255 255 255 / 0.18));
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 250ms ease;
	}
	.animated-button[data-effect='fill']:focus-visible:not([data-disabled])::before {
		transform: scaleX(1);
	}
	.animated-button__arrow {
		flex: none;
		transition: transform 180ms ease;
	}
	.animated-button:focus-visible:not([data-disabled]) .animated-button__arrow {
		transform: translateX(4px);
	}
	.animated-button[data-effect='selection'] {
		background: var(--button-selection-background, #fff);
		color: var(--button-selection-color, #173f35);
		border-color: var(--button-selection-color, #173f35);
	}
	.animated-button[data-effect='selection'][data-selected] {
		background: var(--button-background, #173f35);
		color: var(--button-color, #fff);
		box-shadow: inset 0 0 0 1px currentColor;
	}
	.animated-button__spinner {
		flex: none;
		width: 1em;
		height: 1em;
		border: 2px solid currentColor;
		border-right-color: transparent;
		border-radius: 50%;
		animation: button-spin 800ms linear infinite;
	}
	@media (hover: hover) {
		.animated-button[data-effect='shine']:hover:not([data-disabled])::before {
			animation: button-shine 700ms ease-out;
		}
		.animated-button[data-effect='shine'][data-attention]:hover:not([data-disabled])::before {
			animation:
				button-shine 700ms ease-out,
				button-shine-loop var(--button-attention-active-duration, 2.5s) ease-in-out 700ms infinite;
		}
		.animated-button[data-effect='glow']:hover:not([data-disabled]) {
			box-shadow:
				0 0 0 4px var(--button-glow, rgb(54 167 130 / 0.25)),
				0 8px 28px var(--button-glow, rgb(54 167 130 / 0.35));
		}
		.animated-button[data-effect='fill']:hover:not([data-disabled])::before {
			transform: scaleX(1);
		}
		.animated-button:hover:not([data-disabled]) .animated-button__arrow {
			transform: translateX(4px);
		}
	}
	@keyframes button-shine {
		to {
			transform: translateX(120%);
		}
	}
	@keyframes button-attention {
		0% {
			transform: translateX(-120%);
		}
		18%,
		100% {
			transform: translateX(120%);
		}
	}
	/* Hover/focus loop: the pass takes ~half the period, so it reads as a
	   sweep rather than a flicker even with a short period. */
	@keyframes button-shine-loop {
		0% {
			transform: translateX(-120%);
		}
		55%,
		100% {
			transform: translateX(120%);
		}
	}
	@keyframes button-spin {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes button-edge-orbit {
		to {
			stroke-dashoffset: -100;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.animated-button,
		.animated-button::before,
		.animated-button__edge-track,
		.animated-button__arrow {
			transition: none;
			animation: none !important;
		}
		.animated-button:active:not([data-disabled]),
		.animated-button__arrow {
			transform: none !important;
		}
		.animated-button__spinner {
			animation: none;
		}
	}
</style>
