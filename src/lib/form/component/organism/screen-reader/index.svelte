<script lang="ts">
	import createScreenReaderState from './state.svelte';

	const props = $props();
	const state = createScreenReaderState(() => props);
</script>

<div class={state.rootClass} {...props}>
	<h3 class={state.titleClass}>{props.title}</h3>
	<p class={state.contentClass}>{props.content}</p>
	<button class={state.actionButtonClass} aria-label="Hidden accessible action">Action</button>
</div>

<style>
	.c-screen-reader {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		padding: 1rem;
	}
	.c-screen-reader__title {
		font-weight: 600;
	}
	.c-screen-reader__content {
		font-size: 0.875rem;
		color: var(--color-text-primary);
	}
	.c-screen-reader__action {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
