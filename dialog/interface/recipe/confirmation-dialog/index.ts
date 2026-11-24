import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { HTMLAttributes } from 'svelte/elements';
import type { TokenSize } from '$stylist/design-token/type/alias/size';
import type { TokenColorTone } from '$stylist/design-token/type/alias/color-tone';

/**
 * RecipeConfirmationDialog — свойства диалога подтверждения.
 *
 * LEGO-состав:
 *   SlotText            (information) — title
 *   SlotText          (information) — message
 *   BehaviorClickable            (interaction) — onConfirm, onCancel, onClose
 *   BehaviorSizable              (architecture) — size
 *   ThemeAttributes       (theme)       — variant (tone)
 */
export interface RecipeConfirmationDialog extends ComputeIntersectAll<
	[
		Omit<HTMLAttributes<HTMLDivElement>, 'class'>,
		{
			open?: boolean;
			title?: string;
			message?: string;
			confirmText?: string;
			cancelText?: string;
			onConfirm?: () => void;
			onCancel?: () => void;
			onClose?: () => void;
			/** Тон диалога (успех, предупреждение, ошибка, информация) */
			variant?: TokenColorTone;
			class?: string;
			contentClass?: string;
			headerClass?: string;
			bodyClass?: string;
			footerClass?: string;
			/** Размер диалога */
			size?: TokenSize;
		},
		SlotText,
		SlotText,
		SlotIcon,
		BehaviorClickable,
		BehaviorFocusable,
		BehaviorSizable
	]
> {}
