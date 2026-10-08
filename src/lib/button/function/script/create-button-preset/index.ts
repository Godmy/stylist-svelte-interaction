export interface ButtonPreset<V extends string, S extends string> {
	defaults: {
		variant: V;
		size: S;
		disabled: boolean;
		block: boolean;
	};
}

export function createButtonPreset<V extends string, S extends string>(defaults: {
	variant: V;
	size: S;
}): ButtonPreset<V, S> {
	return {
		defaults: { ...defaults, disabled: false, block: false }
	};
}

export default createButtonPreset;
