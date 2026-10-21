export interface RecipeTextInputDialog {
	open?: boolean;
	title?: string;
	path?: string;
	value?: string;
	loading?: boolean;
	saving?: boolean;
	error?: string;
	placeholder?: string;
	rows?: number;
	onClose?: () => void;
	onSave?: () => void;
	class?: string;
}
