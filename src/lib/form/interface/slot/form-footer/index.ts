import type { HTMLAttributes } from 'svelte/elements';
export interface SlotFormFooter extends HTMLAttributes<HTMLDivElement> {
	primaryButtonLabel?: string;
	secondaryButtonLabel?: string;
	primaryButtonDisabled?: boolean;
	secondaryButtonDisabled?: boolean;
	showSecondaryButton?: boolean;
	onPrimaryClick?: () => void;
	onSecondaryClick?: () => void;
	class?: string;
	primaryButtonClass?: string;
	secondaryButtonClass?: string;
	actionsClass?: string;
}
