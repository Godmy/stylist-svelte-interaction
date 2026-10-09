<script lang="ts">
	import { PresetMegaMenu } from '$stylist/menu/const/preset/mega-menu';
	import type { RecipeMegaMenuFeature } from '$stylist/menu/interface/recipe/mega-menu-feature';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeMegaMenuFeature = $props();

	const restProps = $derived.by(() => {
		const {
			eyebrow: _eyebrow,
			title: _title,
			text: _text,
			href: _href,
			ctaLabel: _ctaLabel,
			image: _image,
			imageAlt: _imageAlt,
			icon: _icon,
			content: _content,
			class: _class,
			onNavigate: _onNavigate,
			...rest
		} = props;
		return rest;
	});
</script>

<a
	{...restProps}
	href={props.href}
	class={['c-mega-feature', props.image && 'c-mega-feature--image', props.class]
		.filter(Boolean)
		.join(' ')}
	aria-label={props.content ? props.title : undefined}
	onclick={(event) => props.onNavigate?.(event)}
>
	{#if props.image}
		<img
			class="c-mega-feature__image"
			src={props.image}
			alt={props.imageAlt ?? ''}
			loading="lazy"
		/>
	{:else if props.icon}
		<span class="c-mega-feature__icon" aria-hidden="true">
			<BaseIcon name={props.icon} size={28} />
		</span>
	{/if}
	<span class="c-mega-feature__body">
		{#if props.content}
			{@render props.content()}
		{:else}
			{#if props.eyebrow}
				<span class="c-mega-feature__eyebrow">{props.eyebrow}</span>
			{/if}
			<span class="c-mega-feature__title">{props.title}</span>
			{#if props.text}
				<span class="c-mega-feature__text">{props.text}</span>
			{/if}
			{#if props.ctaLabel}
				<span class="c-mega-feature__cta">
					{props.ctaLabel}
					<BaseIcon name={PresetMegaMenu.ArrowRight} size={14} aria-hidden="true" />
				</span>
			{/if}
		{/if}
	</span>
</a>

<style>
	.c-mega-feature {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 0.75rem;
		min-height: 13rem;
		padding: 1.25rem;
		overflow: hidden;
		border-radius: 1rem;
		background: linear-gradient(
			150deg,
			var(--color-primary-500, #0ea5e9) 0%,
			var(--color-primary-700, #0f766e) 100%
		);
		color: #fff;
		text-decoration: none;
		isolation: isolate;
	}

	.c-mega-feature:focus-visible {
		outline: 2px solid var(--color-primary-500, #3b82f6);
		outline-offset: 2px;
	}

	.c-mega-feature__image {
		position: absolute;
		inset: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform var(--duration-300, 300ms) ease;
	}

	.c-mega-feature--image::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.72) 100%);
	}

	.c-mega-feature:hover .c-mega-feature__image {
		transform: scale(1.04);
	}

	.c-mega-feature__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		margin-bottom: auto;
		border-radius: 0.75rem;
		background: rgba(255, 255, 255, 0.18);
	}

	.c-mega-feature__body {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.c-mega-feature__eyebrow {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.85;
	}

	.c-mega-feature__title {
		font-size: 1.125rem;
		font-weight: 700;
		line-height: 1.25;
	}

	.c-mega-feature__text {
		font-size: 0.875rem;
		line-height: 1.45;
		opacity: 0.9;
	}

	.c-mega-feature__cta {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		margin-top: 0.25rem;
		font-size: 0.875rem;
		font-weight: 700;
	}

	@media (prefers-reduced-motion: reduce) {
		.c-mega-feature__image {
			transition: none;
		}
	}
</style>
