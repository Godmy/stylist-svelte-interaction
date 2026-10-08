import type { BreadcrumbDropdownItem } from '$stylist/dialog/interface/slot/breadcrumb-dropdown-item';

export interface BreadcrumbItem {
	id: string;
	label: string;
	href?: string;
	parentId?: string;
	dropdownItems?: BreadcrumbDropdownItem[];
}
