import type { LayoutHTMLAttributes } from '$stylist/layout/interface/behavior/layout-html-attributes';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeStepper
	extends ComputeIntersectAll<
		[
			LayoutHTMLAttributes<HTMLDivElement> & {
				steps: {
					id: string;
					title: string;
					description?: string;
					status: 'completed' | 'current' | 'upcoming';
					onClick?: () => void;
				}[];
				orientation?: 'horizontal' | 'vertical';
				class?: string;
				stepClass?: string;
				connectorClass?: string;
				labelClass?: string;
				descriptionClass?: string;
			}
		]
	> {}
