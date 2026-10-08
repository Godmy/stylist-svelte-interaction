export class DownloadCardManager {
	static formatFileSize(bytes: number | string): string {
		if (typeof bytes === 'string') return bytes;
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	static handleFileDownload(downloadUrl: string): void {
		window.open(downloadUrl, '_blank');
	}

	static handleDownload(downloadUrl: string): void {
		DownloadCardManager.handleFileDownload(downloadUrl);
	}
}
