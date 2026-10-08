export interface SlotToggleGroupContext {
	updateValue: (val: string) => void;
	value: string | string[] | null | undefined;
	disabled: boolean;
}
