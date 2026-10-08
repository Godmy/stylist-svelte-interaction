<script lang="ts">
	import { PresetMegaMenu } from '$stylist/menu/const/preset/mega-menu';
	import type { RecipeMegaMenuTrigger } from '$stylist/menu/interface/recipe/mega-menu-trigger';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeMegaMenuTrigger = $props();

	const restProps = $derived.by(() => {
		const {
			label: _label,
			open: _open,
			active: _active,
			controls: _controls,
			class: _class,
			...rest
		} = props;
		return rest;
	});
</script>

<button
	type="button"
	{...restProps}
	class={['c-mega-trigger', props.class].filter(Boolean).join(' ')}
	data-open={props.open || undefined}
	data-active={props.active || undefined}
	aria-expanded={props.open ?? false}
	aria-controls={props.controls}
>
	<span>{props.label}</span>
	<span class="c-mega-trigger__chevron" aria-hidden="true">
		<BaseIcon name={PresetMegaMenu.ChevronDown} size={16} />
	</span>
</button>

<style>
	.c-mega-trigger {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.625rem 0.875rem;
		border: none;
		border-radius: 0.5rem;
		background: transparent;
		color: var(--color-text-primary, #0f172a);
		font: inherit;
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background-color var(--duration-150, 150ms) ease,
			color var(--duration-150, 150ms) ease;
	}

	.c-mega-trigger:hover,
	.c-mega-trigger[data-open] {
		background: var(--color-background-secondary, #f1f5f9);
	}

	.c-mega-trigger:focus-visible {
		outline: 2px solid var(--color-primary-500, #3b82f6);
		outline-offset: 2px;
	}

	.c-mega-trigger[data-active] {
		color: var(--color-primary-600, #2563eb);
	}

	.c-mega-trigger[data-active]::after {
		content: '';
		position: absolute;
		left: 0.875rem;
		right: 0.875rem;
		bottom: 0.25rem;
		height: 2px;
		border-radius: 1px;
		background: currentColor;
	}

	.c-mega-trigger:disabled {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
	}

	.c-mega-trigger__chevron {
		display: inline-flex;
		transition: transform var(--duration-200, 200ms) ease;
	}

	.c-mega-trigger[data-open] .c-mega-trigger__chevron {
		transform: rotate(180deg);
	}

	@media (prefers-reduced-motion: reduce) {
		.c-mega-trigger,
		.c-mega-trigger__chevron {
			transition: none;
		}
	}
</style>
