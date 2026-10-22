<script lang="ts">
	import GeneralToolbar from '$stylist/dialog/component/molecule/general-toolbar/index.svelte';
	import type { RecipeGeneralToolbar } from '$stylist/dialog/interface/recipe/general-toolbar';

	// Render of index.story.ts: toolbarItems carry action callbacks, which story args cannot hold.
	let args: RecipeGeneralToolbar = $props();
	const toolbarItems = [
		{ id: 'zoom-in', label: 'Zoom in', icon: '+', action: () => {} },
		{ id: 'zoom-out', label: 'Zoom out', icon: '-', action: () => {} },
		{ id: 'layers', label: 'Layers', icon: '#', action: () => {} }
	];
</script>

<GeneralToolbar {...args} {toolbarItems} />
