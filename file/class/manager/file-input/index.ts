export class FileInputManager {
	static handleFileChange(
		event: Event,
		multiple: boolean,
		onFileChange?: (files: File | File[] | null) => void
	): { internalValue: File | File[] | null; fileName: string } {
		const target = event.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) {
			onFileChange?.(null);
			return { internalValue: null, fileName: '' };
		}
		if (multiple) {
			const files = Array.from(target.files);
			onFileChange?.(files);
			return { internalValue: files, fileName: `${files.length} file(s) selected` };
		}
		const file = target.files[0];
		onFileChange?.(file);
		return { internalValue: file, fileName: file.name };
	}

	static clearFile(
		inputElement: HTMLInputElement | null,
		onFileChange?: (files: File | File[] | null) => void
	): void {
		onFileChange?.(null);
		if (inputElement) inputElement.value = '';
	}

	static resolveFileSelectionLabel(value: File | File[] | null | undefined): string {
		if (!value) return '';
		if (Array.isArray(value)) return value.length > 0 ? `${value.length} file(s) selected` : '';
		return value.name || '';
	}
}
