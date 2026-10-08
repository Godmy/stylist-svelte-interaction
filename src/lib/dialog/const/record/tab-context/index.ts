import type { SlotTab as TabProps } from '$stylist/dialog/interface/slot/tab-tabs';

export const TAB_CONTEXT = {
	tabsId: '',
	selectedTabId: '',
	registerTab: (_id: string) => {},
	unregisterTab: (_id: string) => {},
	handleTabChange: (_id: string) => {},
	variant: undefined,
	size: undefined,
	disabled: undefined
} satisfies {
	tabsId: string;
	selectedTabId: string;
	registerTab: (id: string) => void;
	unregisterTab: (id: string) => void;
	handleTabChange: (id: string) => void;
	variant?: TabProps['variant'];
	size?: TabProps['size'];
	disabled?: boolean;
};
