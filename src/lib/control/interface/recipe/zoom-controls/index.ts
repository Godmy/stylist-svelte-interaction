import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorShapeable } from '$stylist/layout/interface/behavior/shapeable';
import type { BehaviorSized } from '$stylist/layout/interface/behavior/sized';
import type { BehaviorSpaced } from '$stylist/layout/interface/behavior/spaced';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';

export interface RecipeZoomControls
	extends ComputeIntersectAll<
		[
			HTMLAttributes<HTMLDivElement> & {
				/**
				 * Initial zoom level percentage
				 * @default 100
				 */
				initialValue?: number;

				/**
				 * Minimum zoom level percentage
				 * @default 50
				 */
				minZoom?: number;

				/**
				 * Maximum zoom level percentage
				 * @default 200
				 */
				maxZoom?: number;

				/**
				 * Zoom step increment/decrement
				 * @default 10
				 */
				step?: number;

				/**
				 * Whether to show percentage indicator
				 * @default true
				 */
				showPercentage?: boolean;

				/**
				 * Additional CSS classes for the container
				 */
				class?: string;

				/**
				 * Additional CSS classes for the controls
				 */
				controlsClass?: string;

				/**
				 * Additional CSS classes for the indicator
				 */
				indicatorClass?: string;

				/**
				 * Canonical callback fired when zoom receives value input
				 */
				onValueInput?: (zoomLevel: number) => void;

				/**
				 * Canonical callback fired when zoom value is changed
				 */
				onValueChange?: (zoomLevel: number) => void;

				/**
				 * @deprecated use onValueChange
				 */
				onChange?: (zoomLevel: number) => void;
			},
			SlotText,
			SlotIcon,
			SlotChildren,
			BehaviorClickable,
			BehaviorFocusable,
			BehaviorSized,
			BehaviorShapeable,
			BehaviorSpaced,
			SlotTheme
		]
	> {}
