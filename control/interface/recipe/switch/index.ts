import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeSwitch
	extends ComputeIntersectAll<
		[
			Omit<HTMLAttributes<HTMLInputElement>, 'size'> & {
				/** Whether the switch is checked */
				checked?: boolean;
				/** Whether the switch is disabled */
				disabled?: boolean;
				/** Label for the switch */
				label?: string;
				/** Description for the switch */
				description?: string;
				/** Whether the switch is required */
				required?: boolean;
				name?: string;
				ariaLabel?: string;
				/** Custom class name */
				class?: string;
				/** Callback when switch changes */
				onChange?: (checked: boolean) => void;
				/** Size of the switch */
				switchSize?: TokenSize;
				/** Size variant */
				size?: TokenSize;
				/** Position of the label relative to the track */
				labelPosition?: 'left' | 'right';
			},
			HTMLAttributes<HTMLInputElement>
		]
	> {}
