import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotAttachment } from '$stylist/file/interface/slot/attachment';
export interface RecipeAttachmentPreview
	extends ComputeIntersectAll<
		[
			{
				attachment: SlotAttachment;
				showActions?: boolean;
				class?: string;
			}
		]
	> {
	onDownload?: (attachment: SlotAttachment) => void;
	onRemove?: (attachment: SlotAttachment) => void;
}
