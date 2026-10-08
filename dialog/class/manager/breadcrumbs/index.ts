import type { BreadcrumbDropdownItem } from '$stylist/dialog/interface/slot/breadcrumb-dropdown-item';
import type { BreadcrumbItem } from '$stylist/dialog/interface/slot/breadcrumb-item';

export class BreadcrumbsManager {
	static getBreadcrumbDropdownItems(
		items: BreadcrumbItem[],
		breadcrumbId?: string | null
	): BreadcrumbDropdownItem[] {
		if (!breadcrumbId) {
			return [];
		}

		return items.find((item) => item.id === breadcrumbId)?.dropdownItems ?? [];
	}

	static getBreadcrumbItems(items: BreadcrumbItem[], activeId?: string): BreadcrumbItem[] {
		if (!items.length) {
			return [];
		}

		if (!activeId) {
			return items;
		}

		const itemById = new Map(items.map((item) => [item.id, item]));
		const trail: BreadcrumbItem[] = [];
		let current = itemById.get(activeId);

		while (current) {
			trail.unshift(current);
			current = current.parentId ? itemById.get(current.parentId) : undefined;
		}

		return trail.length ? trail : items;
	}
}
