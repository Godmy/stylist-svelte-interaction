<script lang="ts">
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import { createExportPanelState } from './state.svelte';
	import type { RecipeExportPanel } from '$stylist/file/interface/recipe/export-panel';

	let props: RecipeExportPanel = $props();

	const state = createExportPanelState(() => props);
</script>

<div class={['c-export-panel', props.class].filter(Boolean).join(' ')}>
	<div class="panel-header">Export Visualization</div>

	<div class="panel-section">
		<div class="section-title">Export Format</div>
		<div class="format-options">
			<button
				type="button"
				class={`format-option ${state.exportFormat === 'png' ? 'active' : ''}`}
				onclick={() => state.selectFormat('png')}
				onkeydown={(e) => state.handleFormatKeydown(e, 'png')}
				aria-label="Export as PNG"
			>
				PNG
			</button>
			<button
				type="button"
				class={`format-option ${state.exportFormat === 'jpeg' ? 'active' : ''}`}
				onclick={() => state.selectFormat('jpeg')}
				onkeydown={(e) => state.handleFormatKeydown(e, 'jpeg')}
				aria-label="Export as JPEG"
			>
				JPEG
			</button>
			<button
				type="button"
				class={`format-option ${state.exportFormat === 'svg' ? 'active' : ''}`}
				onclick={() => state.selectFormat('svg')}
				onkeydown={(e) => state.handleFormatKeydown(e, 'svg')}
				aria-label="Export as SVG"
			>
				SVG
			</button>
			<button
				type="button"
				class={`format-option ${state.exportFormat === 'pdf' ? 'active' : ''}`}
				onclick={() => state.selectFormat('pdf')}
				onkeydown={(e) => state.handleFormatKeydown(e, 'pdf')}
				aria-label="Export as PDF"
			>
				PDF
			</button>
		</div>
	</div>

	<div class="panel-section">
		<div class="section-title">Options</div>
		<div class="checkbox-group">
			<input type="checkbox" id="include-legend" bind:checked={state.includeLegend} />
			<label for="include-legend">Include Legend</label>
		</div>
		<div class="checkbox-group">
			<input type="checkbox" id="include-filters" bind:checked={state.includeFilters} />
			<label for="include-filters">Include Filter Information</label>
		</div>
	</div>

	<div class="c-export-panel__footer">
		<Button variant="primary" onclick={state.handleExport}>
			Export {state.exportFormat.toUpperCase()}
		</Button>
	</div>
</div>

<style>
	.c-export-panel__footer {
		margin-top: 0.5rem;
	}

	.c-export-panel {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		padding: var(--spacing-4);
		background-color: var(--color-background-primary);
		border-radius: var(--border-radius-lg);
		border: 1px solid var(--color-border-primary);
		min-width: 300px;
	}

	.panel-header {
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-4);
		color: var(--color-text-primary);
		margin-bottom: var(--spacing-2);
	}

	.panel-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2);
	}

	.section-title {
		font-weight: var(--font-weight-medium);
		font-size: var(--font-size-3);
		color: var(--color-text-secondary);
	}

	.format-options {
		display: flex;
		gap: var(--spacing-2);
		flex-wrap: wrap;
	}

	.format-option {
		flex: 1;
		text-align: center;
		padding: var(--spacing-2);
		border: 1px solid var(--color-border-secondary);
		border-radius: var(--border-radius-base);
		cursor: pointer;
		transition: all var(--duration-200);
	}

	.format-option:hover {
		background-color: var(--color-background-secondary);
	}

	.format-option.active {
		background-color: var(--color-primary-100);
		border-color: var(--color-primary-500);
		color: var(--color-primary-700);
	}

	.checkbox-group {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
	}
</style>
