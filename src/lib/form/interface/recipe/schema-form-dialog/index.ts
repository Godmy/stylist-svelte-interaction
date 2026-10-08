export interface RecipeSchemaFormDialog {
	isOpen: boolean;
	mode: 'create' | 'edit';
	title: string;
	subtitle?: string;
	fields: {
		name: string;
		type: string;
		nullable: boolean;
		primaryKey: boolean;
		default: string | null;
	}[];
	initialData?: Record<string, unknown>;
	onClose: () => void;
	onSave: (data: Record<string, unknown>) => Promise<void>;
}
