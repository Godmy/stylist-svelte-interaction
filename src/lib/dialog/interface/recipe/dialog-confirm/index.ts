import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeDialogConfirm
	extends ComputeIntersectAll<
		[
			{
				isOpen: boolean;
				onClose: () => void;
				onConfirm: () => void;
				title: string;
				message: string;
				confirmText?: string;
				cancelText?: string;
				variant?: 'danger' | 'warning' | 'info';
				isLoading?: boolean;
			}
		]
	> {}
