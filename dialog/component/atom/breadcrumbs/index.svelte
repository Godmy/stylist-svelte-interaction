<script lang="ts">
	import type { RecipeBreadcrumbsContainer } from '$stylist/dialog/interface/recipe/breadcrumbs-container';

	let { children, class: className, ...restProps }: RecipeBreadcrumbsContainer = $props();
</script>

<nav aria-label="Breadcrumb" class={className ?? ''} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</nav>
