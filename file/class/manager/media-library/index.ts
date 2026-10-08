export class MediaLibraryManager {
	static formatDate(date: Date): string {
		return date.toLocaleDateString([], {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	static formatFileSize(bytes: number): string {
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
		return (bytes / 1048576).toFixed(1) + ' MB';
	}
}
