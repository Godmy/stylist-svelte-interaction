import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BreadcrumbDropdownItem } from '$stylist/dialog/interface/slot/breadcrumb-dropdown-item';

export interface RecipeBreadcrumbDropdown extends ComputeIntersectAll<
	[SlotTheme, HTMLAttributes<HTMLDivElement>, HTMLAttributes<HTMLDivElement>]
> {
	open?: boolean;
	items?: BreadcrumbDropdownItem[];
	onSelect?: (targetId: string) => void;
	class?: string;
}
