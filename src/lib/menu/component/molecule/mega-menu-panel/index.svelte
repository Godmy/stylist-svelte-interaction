<script lang="ts">
	import MegaMenuLink from '$stylist/menu/component/atom/mega-menu-link/index.svelte';
	import MegaMenuColumn from '$stylist/menu/component/molecule/mega-menu-column/index.svelte';
	import MegaMenuFeature from '$stylist/menu/component/molecule/mega-menu-feature/index.svelte';
	import type { RecipeMegaMenuPanel } from '$stylist/menu/interface/recipe/mega-menu-panel';

	let props: RecipeMegaMenuPanel = $props();

	const columns = $derived(props.section.columns ?? []);
	const footerLinks = $derived(props.section.footerLinks ?? []);

	const restProps = $derived.by(() => {
		const {
			section: _section,
			compact: _compact,
			class: _class,
			onNavigate: _onNavigate,
			...rest
		} = props;
		return rest;
	});
</script>

<div
	{...restProps}
	class={['c-mega-panel', props.class].filter(Boolean).join(' ')}
	style:--c-mega-panel-columns={Math.max(columns.length, 1)}
	data-has-feature={props.section.feature ? '' : undefined}
>
	{#if props.section.intro}
		<p class="c-mega-panel__intro">{props.section.intro}</p>
	{/if}

	<div class="c-mega-panel__grid">
		{#if columns.length > 0}
			<div class="c-mega-panel__columns">
				{#each columns as column (column.id)}
					<MegaMenuColumn
						title={column.title}
						links={column.links}
						iconLinks={column.iconLinks}
						moreLink={column.moreLink}
						compact={props.compact}
						onNavigate={props.onNavigate}
					/>
				{/each}
			</div>
		{/if}

		{#if props.section.feature}
			<MegaMenuFeature {...props.section.feature} onNavigate={props.onNavigate} />
		{/if}
	</div>

	{#if footerLinks.length > 0}
		<div class="c-mega-panel__footer">
			{#each footerLinks as link (link.id)}
				<MegaMenuLink
					label={link.label}
					href={link.href}
					icon={link.icon}
					iconSvg={link.iconSvg}
					iconBackground={link.iconBackground}
					iconColor={link.iconColor}
					badge={link.badge}
					active={link.active}
					external={link.external}
					compact
					onNavigate={props.onNavigate}
				/>
			{/each}
		</div>
	{/if}
</div>

<style>
	.c-mega-panel {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		border: 1px solid var(--color-border-primary, #e2e8f0);
		border-radius: 1rem;
		background: var(--color-background-primary, #fff);
		box-shadow:
			0 20px 40px -12px rgba(15, 23, 42, 0.18),
			0 4px 10px -4px rgba(15, 23, 42, 0.08);
	}

	.c-mega-panel__intro {
		margin: 0;
		padding: 0 0.75rem;
		max-width: 48rem;
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--color-text-secondary, #64748b);
	}

	.c-mega-panel__grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1.5rem;
	}

	.c-mega-panel[data-has-feature] .c-mega-panel__grid {
		grid-template-columns: minmax(0, 1fr) minmax(14rem, 18rem);
	}

	.c-mega-panel__columns {
		display: grid;
		grid-template-columns: repeat(var(--c-mega-panel-columns), minmax(0, 1fr));
		gap: 1rem;
	}

	.c-mega-panel__footer {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 0.5rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--color-border-primary, #e2e8f0);
	}

	@media (max-width: 960px) {
		.c-mega-panel__columns {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.c-mega-panel[data-has-feature] .c-mega-panel__grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 640px) {
		.c-mega-panel {
			padding: 1rem 0.5rem;
		}

		.c-mega-panel__columns {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
