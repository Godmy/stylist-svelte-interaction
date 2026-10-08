import type { HTMLAttributes } from 'svelte/elements';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
/**
 * SlotConfirmationDialog — свойства диалога подтверждения.
 *
 * LEGO-состав:
 *   SlotText            (information) — title
 *   SlotText          (information) — message
 *   BehaviorClickable            (interaction) — onConfirm, onCancel, onClose
 *   BehaviorSizable              (architecture) — size
 *   ThemeAttributes       (theme)       — variant (tone)
 */
export interface SlotConfirmationDialog extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
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
}
