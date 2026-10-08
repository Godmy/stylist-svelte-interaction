import type { SlotThemeBorder } from '$stylist/theme/interface/slot/theme-border';
import type { SlotTypography } from '$stylist/theme/interface/slot/typography';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeComponentInfoCard
	extends ComputeIntersectAll<[SlotThemeBorder, SlotTypography]> {
	subcategory?: string;
	propsCount?: number;
	examples?: string[];
	npmPackage?: string;
	version?: string;
	author?: string;
	lastUpdated?: string;
	isOpen?: boolean;
	onClose?: () => void;

	componentName?: string;
	description?: string;
	category?: string;
	status?: 'stable' | 'beta' | 'alpha' | 'deprecated';
	class?: string;
}
