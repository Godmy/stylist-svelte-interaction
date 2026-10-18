import ExportPanel from './index.svelte';
import type { RecipeExportPanel } from '$stylist/file/interface/recipe/export-panel';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Export panel component with format selection and options. */
export default {
	component: ExportPanel,
	title: 'ExportPanel',
	description: 'Export panel component with format selection and options.',
	args: {}
} satisfies ContractStory<RecipeExportPanel>;
