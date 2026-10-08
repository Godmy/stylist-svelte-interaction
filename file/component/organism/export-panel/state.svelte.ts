import type { ExportFormat } from '$stylist/file/type/alias/export-format';
import type { RecipeExportPanel } from '$stylist/file/interface/recipe/export-panel';

export function createExportPanelState(getProps: () => RecipeExportPanel) {
	const props = $derived(getProps());
	let exportFormat = $state<ExportFormat>('png');
	let includeLegend = $state(true);
	let includeFilters = $state(true);

	function selectFormat(format: ExportFormat) {
		exportFormat = format;
	}

	function handleFormatKeydown(event: KeyboardEvent, format: ExportFormat) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			exportFormat = format;
		}
	}

	function handleExport() {
		const detail = {
			format: exportFormat,
			includeLegend,
			includeFilters
		};

		props.onExport?.(detail);
		props.onexport?.(new CustomEvent('export', { detail }));
	}

	return {
		get exportFormat() {
			return exportFormat;
		},
		get includeLegend() {
			return includeLegend;
		},
		get includeFilters() {
			return includeFilters;
		},
		set includeLegend(value: boolean) {
			includeLegend = value;
		},
		set includeFilters(value: boolean) {
			includeFilters = value;
		},
		selectFormat,
		handleFormatKeydown,
		handleExport
	};
}
