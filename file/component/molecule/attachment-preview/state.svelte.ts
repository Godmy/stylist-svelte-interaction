import { AttachmentPreviewManager } from '$stylist/file/class/manager/attachment-preview';
import type { RecipeAttachmentPreview } from '$stylist/file/interface/recipe/attachment-preview';

export function createAttachmentPreviewState(getProps: () => RecipeAttachmentPreview) {
	const props = $derived(getProps());
	const dispatch = AttachmentPreviewManager.createDispatch();

	function download(): void {
		AttachmentPreviewManager.handleDownload(dispatch, props.attachment);
	}

	function remove(): void {
		AttachmentPreviewManager.handleRemove(dispatch, props.attachment);
	}

	return {
		variant: 'default',
		size: 'md',
		disabled: false,
		get showActions() {
			return props.showActions ?? true;
		},
		get classes() {
			return [props.class || ''].filter(Boolean).join(' ');
		},
		download,
		remove
	};
}
