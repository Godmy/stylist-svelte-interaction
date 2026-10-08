<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		children,
		class: className,
		...restProps
	}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLElement> = $props();
</script>

<nav aria-label="Breadcrumb" class={className ?? ''} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</nav>
