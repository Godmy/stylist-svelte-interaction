export interface SlotSearchToggle {
	/** Whether the controlled search region is shown (`aria-expanded`). */
	open?: boolean;
	onToggle?: () => void;
	/** @default 'Open search' */
	openLabel?: string;
	/** @default 'Close search' */
	closeLabel?: string;
	class?: string;
}
