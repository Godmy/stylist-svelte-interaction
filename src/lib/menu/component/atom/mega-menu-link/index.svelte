<script lang="ts">
	import type { RecipeMegaMenuLink } from '$stylist/menu/interface/recipe/mega-menu-link';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import Svg from '$stylist/svg/component/atom/svg/index.svelte';

	let props: RecipeMegaMenuLink = $props();

	const restProps = $derived.by(() => {
		const {
			label: _label,
			href: _href,
			description: _description,
			icon: _icon,
			iconSvg: _iconSvg,
			iconBackground: _iconBackground,
			iconColor: _iconColor,
			iconOnly: _iconOnly,
			badge: _badge,
			active: _active,
			external: _external,
			compact: _compact,
			class: _class,
			onNavigate: _onNavigate,
			...rest
		} = props;
		return rest;
	});

	function handleClick(event: MouseEvent) {
		props.onNavigate?.(event);
	}
</script>

<a
	{...restProps}
	href={props.href}
	class={[
		'c-mega-link',
		props.compact && 'c-mega-link--compact',
		props.iconOnly && 'c-mega-link--icon-only',
		props.class
	]
		.filter(Boolean)
		.join(' ')}
	data-active={props.active || undefined}
	aria-current={props.active ? 'page' : undefined}
	target={props.external ? '_blank' : undefined}
	rel={props.external ? 'noopener noreferrer' : undefined}
	aria-label={props.iconOnly ? props.label : undefined}
	title={props.iconOnly ? props.label : undefined}
	style:--c-mega-link-icon-bg={props.iconBackground}
	style:--c-mega-link-icon-color={props.iconColor}
	onclick={handleClick}
>
	{#if props.iconSvg}
		<span class="c-mega-link__icon" aria-hidden="true">
			<Svg svg={props.iconSvg} size={18} />
		</span>
	{:else if props.icon}
		<span class="c-mega-link__icon" aria-hidden="true">
			<BaseIcon name={props.icon} size={18} />
		</span>
	{/if}
	{#if !props.iconOnly}
		<span class="c-mega-link__body">
			<span class="c-mega-link__label">
				{props.label}
				{#if props.badge}
					<span class="c-mega-link__badge">{props.badge}</span>
				{/if}
			</span>
			{#if props.description && !props.compact}
				<span class="c-mega-link__description">{props.description}</span>
			{/if}
		</span>
	{/if}
</a>

<style>
	.c-mega-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.625rem 0.75rem;
		border-radius: 0.625rem;
		color: var(--color-text-primary, #0f172a);
		text-decoration: none;
		transition: background-color var(--duration-150, 150ms) ease;
	}

	.c-mega-link:hover,
	.c-mega-link:focus-visible {
		background: var(--color-background-secondary, #f1f5f9);
	}

	.c-mega-link:focus-visible {
		outline: 2px solid var(--color-primary-500, #3b82f6);
		outline-offset: 1px;
	}

	.c-mega-link[data-active] .c-mega-link__label {
		color: var(--color-primary-600, #2563eb);
	}

	.c-mega-link--compact {
		align-items: center;
		padding: 0.4rem 0.75rem;
	}

	.c-mega-link__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		background: var(--c-mega-link-icon-bg, var(--color-primary-50, #eff6ff));
		color: var(--c-mega-link-icon-color, var(--color-primary-600, #2563eb));
	}

	.c-mega-link--icon-only {
		padding: 0.25rem;
	}

	.c-mega-link--icon-only .c-mega-link__icon {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		transition: transform var(--duration-150, 150ms) ease;
	}

	.c-mega-link--icon-only:hover .c-mega-link__icon,
	.c-mega-link--icon-only:focus-visible .c-mega-link__icon {
		transform: translateY(-1px);
	}

	.c-mega-link--compact .c-mega-link__icon {
		width: 1.5rem;
		height: 1.5rem;
		background: transparent;
	}

	.c-mega-link__body {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		min-width: 0;
	}

	.c-mega-link__label {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9375rem;
		font-weight: 600;
		line-height: 1.3;
	}

	.c-mega-link__badge {
		padding: 0.0625rem 0.4rem;
		border-radius: 999px;
		background: var(--color-warning-100, #fef3c7);
		color: var(--color-warning-700, #b45309);
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.c-mega-link__description {
		font-size: 0.8125rem;
		line-height: 1.4;
		color: var(--color-text-secondary, #64748b);
	}
</style>
