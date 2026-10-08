import type { AnyProperty } from '$stylist/layout/type/record/any-property';
import type { SlotDataItem } from '$stylist/file/interface/slot/data-item';
import type { DataExporterFormat } from '$stylist/file/type/alias/data-exporter-format';

export class DataExporterManager {
	static exportData(
		data: SlotDataItem[],
		format: DataExporterFormat,
		fileName: string,
		formats: Record<DataExporterFormat, AnyProperty>,
		dispatch: (event: 'export', detail: { format: DataExporterFormat; fileName: string }) => void
	): void {
		const selectedFormat = formats[format as keyof typeof formats];
		const dataStr =
			format === 'json'
				? JSON.stringify(data, null, 2)
				: format === 'csv'
					? DataExporterManager.convertToCSV(data)
					: JSON.stringify(data);
		const dataUri = `data:${selectedFormat.mime};charset=utf-8,${encodeURIComponent(dataStr)}`;
		const link = document.createElement('a');
		link.href = dataUri;
		link.download = `${fileName}.${selectedFormat.ext}`;
		link.click();
		dispatch('export', { format, fileName });
	}

	static convertToCSV(objArray: SlotDataItem[]): string {
		if (objArray.length === 0) return '';
		const headers = Object.keys(objArray[0]);
		const headerRow = headers.map(DataExporterManager.toCsvValue).join(',');
		const dataRows = objArray.map((row) =>
			headers.map((header) => DataExporterManager.toCsvValue(row[header])).join(',')
		);
		return [headerRow, ...dataRows].join('\n');
	}

	static toCsvValue(value: unknown): string {
		if (value === null || value === undefined) return '';
		const stringValue = String(value);
		const escaped = stringValue.replace(/"/g, '""');
		return /[",\n]/.test(stringValue) ? `"${escaped}"` : escaped;
	}
}
