export interface SlotValidationErrors {
	email?: string;
	password?: string;
	phone?: string;
	[key: string]: string | undefined;
}
