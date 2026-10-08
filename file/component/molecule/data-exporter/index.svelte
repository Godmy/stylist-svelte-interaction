<script lang="ts">
	import createDataExporterState from './state.svelte';
	import type { RecipeDataExporter } from '$stylist/file/interface/recipe/data-exporter';

	let props: RecipeDataExporter = $props();
	const state = createDataExporterState(() => props);
</script>

<div class="data-exporter">
	<select bind:value={state.selectedFormat} disabled={state.disabled}>
		<option value="csv">CSV</option>
		<option value="json">JSON</option>
		<option value="excel">Excel</option>
	</select>
	<button onclick={state.exportData} disabled={state.disabled}> Export Data </button>
</div>

<style>
	.data-exporter {
		display: flex;
		gap: var(--spacing-2);
		align-items: center;
	}

	select,
	button {
		padding: var(--spacing-2);
		border-radius: var(--border-radius-base);
		border: 1px solid var(--color-border-secondary);
	}

	button:disabled {
		opacity: var(--opacity-50);
		cursor: not-allowed;
	}
</style>
