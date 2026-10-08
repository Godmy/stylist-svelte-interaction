<script lang="ts">
	import MegaMenuLink from '$stylist/menu/component/atom/mega-menu-link/index.svelte';
	import { PresetMegaMenu } from '$stylist/menu/const/preset/mega-menu';
	import type { RecipeMegaMenuColumn } from '$stylist/menu/interface/recipe/mega-menu-column';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeMegaMenuColumn = $props();

	const restProps = $derived.by(() => {
		const {
			title: _title,
			links: _links,
			iconLinks: _iconLinks,
			moreLink: _moreLink,
			compact: _compact,
			class: _class,
			onNavigate: _onNavigate,
			...rest
		} = props;
		return rest;
	});
</script>

<div {...restProps} class={['c-mega-column', props.class].filter(Boolean).join(' ')}>
	<p class="c-mega-column__title">{props.title}</p>
	<ul class="c-mega-column__list">
		{#each props.links as link (link.id)}
			<li>
				<MegaMenuLink
					label={link.label}
					href={link.href}
					description={link.description}
					icon={link.icon}
					iconSvg={link.iconSvg}
					iconBackground={link.iconBackground}
					iconColor={link.iconColor}
					badge={link.badge}
					active={link.active}
					external={link.external}
					compact={props.compact}
					onNavigate={props.onNavigate}
				/>
			</li>
		{/each}
	</ul>
	{#if props.iconLinks?.length}
		<ul class="c-mega-column__icons">
			{#each props.iconLinks as link (link.id)}
				<li>
					<MegaMenuLink
						label={link.label}
						href={link.href}
						icon={link.icon}
						iconSvg={link.iconSvg}
						iconBackground={link.iconBackground}
						iconColor={link.iconColor}
						active={link.active}
						external={link.external}
						iconOnly
						onNavigate={props.onNavigate}
					/>
				</li>
			{/each}
		</ul>
	{/if}
	{#if props.moreLink}
		<a
			class="c-mega-column__more"
			href={props.moreLink.href}
			onclick={(event) => props.onNavigate?.(event)}
		>
			{props.moreLink.label}
			<BaseIcon name={PresetMegaMenu.ArrowRight} size={14} aria-hidden="true" />
		</a>
	{/if}
</div>

<style>
	.c-mega-column {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		min-width: 0;
	}

	.c-mega-column__title {
		margin: 0 0 0.25rem;
		padding: 0 0.75rem;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-text-tertiary, #94a3b8);
	}

	.c-mega-column__list {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.c-mega-column__icons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		margin: 0;
		padding: 0 0.5rem;
		list-style: none;
	}

	.c-mega-column__more {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		margin-top: 0.25rem;
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-primary-600, #2563eb);
		text-decoration: none;
	}

	.c-mega-column__more:hover {
		text-decoration: underline;
	}

	.c-mega-column__more:focus-visible {
		outline: 2px solid var(--color-primary-500, #3b82f6);
		outline-offset: 1px;
		border-radius: 0.375rem;
	}
</style>
