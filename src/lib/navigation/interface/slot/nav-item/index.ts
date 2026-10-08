import type { ComponentType } from 'svelte';

export interface NavItem {
	id: string;
	label: string;
	href?: string;
	icon?: ComponentType;
	onClick?: () => void;
	disabled?: boolean;
	active?: boolean;
	badge?: string | number;
}
