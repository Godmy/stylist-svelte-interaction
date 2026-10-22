import DataExporter from '$stylist/file/component/molecule/data-exporter/index.svelte';
import type { RecipeDataExporter } from '$stylist/file/interface/recipe/data-exporter';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { DATA_EXPORTER_FORMAT } from '$stylist/file/const/array/data-exporter-format';

/** Toolbar for exporting tabular data to common file formats. */
export default {
	component: DataExporter,
	title: 'DataExporter',
	description: 'Toolbar for exporting tabular data to common file formats.',
	args: {
		data: [
			{ id: 'C-101', customer: 'Ava Reed', plan: 'Scale', mrr: 6200 },
			{ id: 'C-102', customer: 'Noah Green', plan: 'Pro', mrr: 3200 },
			{ id: 'C-103', customer: 'Mila Park', plan: 'Start', mrr: 900 }
		],
		format: 'csv',
		fileName: 'customer-report',
		disabled: false
	},
	controls: {
		format: { type: 'select', options: DATA_EXPORTER_FORMAT },
		fileName: { type: 'text' },
		disabled: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeDataExporter>;
