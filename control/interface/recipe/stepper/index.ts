export interface RecipeStepper {
	/** Current value, clamped to [min, max] */
	value?: number;
	/** Lowest allowed value */
	min?: number;
	/** Highest allowed value */
	max?: number;
	/** Increment applied by the -/+ buttons */
	step?: number;
	/** Accessible label of the stepper */
	label?: string;
	/** Disables both buttons and the input */
	disabled?: boolean;
	/** Fired with the clamped value after every change */
	onChange?: (value: number) => void;
}
