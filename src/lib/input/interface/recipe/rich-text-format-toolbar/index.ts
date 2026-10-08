import type { HTMLAttributes } from 'svelte/elements';
export interface RecipeRichTextFormatToolbar extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
	class?: string;
	buttonClass?: string;
	dividerClass?: string;
	iconClass?: string;
	showLinkInput?: boolean;
	linkUrl?: string;
	linkInputClass?: string;
	linkInputFieldClass?: string;
	linkInputButtonClass?: string;
	onFormatText?: (command: string, value?: string) => void;
	onToggleHeading?: (level: number) => void;
	onToggleBlockquote?: () => void;
	onToggleHorizontalRule?: () => void;
	onToggleLinkInput?: () => void;
	onSetShowLinkInput?: (value: boolean) => void;
	onSetLinkUrl?: (url: string) => void;
	onInsertLink?: () => void;
	onInsertImage?: () => void;
}
