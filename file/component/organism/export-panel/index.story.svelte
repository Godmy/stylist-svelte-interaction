<script lang="ts">
	import type { ExportFormat } from '$stylist/file/type/alias/export-format';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import ExportPanel from './index.svelte';

	function handleExport(detail: {
		format: ExportFormat;
		includeLegend: boolean;
		includeFilters: boolean;
	}) {
		console.log('Export event:', detail);
	}

	const controls: SlotStory[] = [];
</script>

<Story
	id="organisms-export-panel"
	title="Organisms / Interaction / Controls / ExportPanel"
	component={ExportPanel}
	category="Organisms/Interaction/Controls"
	description="Export panel component with format selection and options."
	{controls}
>
	{#snippet children()}
		<div class="_c1">
			<ExportPanel onExport={handleExport} />
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
</style>
