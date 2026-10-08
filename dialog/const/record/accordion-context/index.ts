export const ACCORDION_CONTEXT_DEFAULT = {
	isPanelOpen: (_value: string) => false,
	handleValueChange: (_value: string) => {}
} satisfies {
	isPanelOpen: (value: string) => boolean;
	handleValueChange: (value: string) => void;
};

export type AccordionContext = typeof ACCORDION_CONTEXT_DEFAULT;
