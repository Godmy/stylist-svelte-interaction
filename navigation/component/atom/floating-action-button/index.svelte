<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeFloatingActionButton } from '$stylist/navigation/interface/recipe/floating-action-button';

	let {
		element = $bindable(null),
		icon = 'add',
		label,
		size = 'md',
		class: className,
		...rest
	}: RecipeFloatingActionButton = $props();
</script>

<HtmlButton
	bind:element
	type="button"
	{...rest}
	class={['c-floating-action-button', className]}
	data-size={size}
	data-extended={label ? true : undefined}
>
	<Icon name={icon} size={size === 'lg' ? 28 : size === 'sm' ? 20 : 24} aria-hidden="true" />
	{#if label}
		<HtmlSpan class="c-floating-action-button__label">{label}</HtmlSpan>
	{/if}
</HtmlButton>

<style>
	:global {
		.c-floating-action-button {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: calc(var(--layout-spacing-1rem, 1rem) * 0.75);
			min-width: 3.5rem;
			height: 3.5rem;
			padding: 0 var(--layout-spacing-1rem, 1rem);
			border: 0;
			border-radius: var(--layout-border-radius-xxl, 1rem);
			background: var(--color-primary-container, var(--color-primary-600));
			color: var(--color-on-primary-container, var(--color-on-primary));
			box-shadow: var(--elevation-level3);
			font: inherit;
			font-weight: var(--typography-font-weight-medium, 500);
			cursor: pointer;
			transition:
				box-shadow var(--motion-duration-150, 150ms) var(--motion-easing-ease, ease),
				transform var(--motion-duration-150, 150ms) var(--motion-easing-ease, ease);
		}
		.c-floating-action-button:hover {
			box-shadow: var(--elevation-level4);
		}
		.c-floating-action-button:active {
			transform: scale(0.97);
		}
		.c-floating-action-button:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: var(--focus-offset, 2px);
		}
		.c-floating-action-button:disabled {
			opacity: var(--opacity-60, 0.6);
			cursor: not-allowed;
		}
		.c-floating-action-button[data-size='sm'] {
			min-width: 2.5rem;
			height: 2.5rem;
			border-radius: var(--layout-border-radius-xl, 0.75rem);
		}
		.c-floating-action-button[data-size='lg'] {
			min-width: 6rem;
			height: 6rem;
			border-radius: var(--layout-border-radius-xxxl, 1.5rem);
		}
		.c-floating-action-button[data-extended] {
			padding-inline: var(--layout-spacing-1rem, 1rem) calc(var(--layout-spacing-1rem, 1rem) * 1.25);
		}
		@media (prefers-reduced-motion: reduce) {
			.c-floating-action-button {
				transition: none;
			}
		}
	}
</style>
