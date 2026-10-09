import type { RecipeDownloadCard } from '$stylist/file/interface/recipe/download-card';

export function createDownloadCardState(
	getProps: () => RecipeDownloadCard & Record<string, unknown>
) {
	const props = $derived(getProps());
	const variant = $derived(props.variant ?? 'primary');
	const cls = $derived([props.class || ''].filter(Boolean).join(' '));
	const downloadUrl = $derived(props.downloadUrl);

	return {
		get variant() {
			return variant;
		},
		get class() {
			return cls;
		},
		get downloadUrl() {
			return downloadUrl;
		}
	};
}
