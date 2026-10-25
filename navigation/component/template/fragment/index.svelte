<script lang="ts">
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlHeader from '$stylist/html/component/organism/header/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import type { RecipeFragment } from '$stylist/navigation/interface/recipe/fragment';

	let {
		element = $bindable(null),
		heading,
		description,
		layout = 'content',
		header,
		children,
		class: className,
		...rest
	}: RecipeFragment = $props();

	const headingId = $props.id();
</script>

<HtmlSection
	bind:element
	aria-labelledby={heading && !header ? headingId : undefined}
	{...rest}
	class={['c-fragment', className]}
	data-layout={layout}
>
	{#if header}
		{@render header()}
	{:else if heading || description}
		<HtmlHeader class="c-fragment__header">
			{#if heading}
				<HtmlH2 id={headingId} class="c-fragment__heading">{heading}</HtmlH2>
			{/if}
			{#if description}
				<HtmlP class="c-fragment__description">{description}</HtmlP>
			{/if}
		</HtmlHeader>
	{/if}
	{@render children?.()}
</HtmlSection>

<style>
	:global {
		.c-fragment {
			--c-fragment-gutter: var(--space-4, 1rem);
			box-sizing: border-box;
			width: 100%;
			margin-inline: auto;
			padding: var(--c-fragment-gutter);
		}
		@media (min-width: 600px) {
			.c-fragment {
				--c-fragment-gutter: var(--content-gutter, 2rem);
			}
		}
		.c-fragment[data-layout='content'] {
			max-width: calc(48rem + 2 * var(--c-fragment-gutter));
		}
		.c-fragment[data-layout='wide'] {
			max-width: calc(80rem + 2 * var(--c-fragment-gutter));
		}
		.c-fragment[data-layout='full'] {
			padding: 0;
		}
		.c-fragment[data-layout='fill'] {
			display: flex;
			flex-direction: column;
			height: 100%;
			min-height: 0;
			padding: 0;
		}
		.c-fragment[data-layout='full'] > .c-fragment__header,
		.c-fragment[data-layout='fill'] > .c-fragment__header {
			padding: var(--c-fragment-gutter) var(--c-fragment-gutter) 0;
		}
		.c-fragment__header {
			margin-bottom: var(--space-4, 1rem);
		}
		.c-fragment__heading {
			margin: 0;
			font-size: var(--font-size-6, 1.5rem);
			font-weight: var(--font-weight-semibold, 600);
			line-height: var(--line-height-tight, 1.25);
		}
		.c-fragment__description {
			margin: calc(var(--space-4, 1rem) / 4) 0 0;
			color: var(--color-text-secondary);
		}
	}
</style>
