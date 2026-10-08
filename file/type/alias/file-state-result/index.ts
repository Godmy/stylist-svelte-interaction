export type FileStateResult<V extends string, S extends string> = {
	variant: V;
	size: S;
	disabled: boolean;
	classes: string;
};
