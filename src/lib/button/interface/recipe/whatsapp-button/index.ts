export interface RecipeWhatsappButton {
	class?: string;
	/** Any format — non-digit characters are stripped when building the `wa.me` link. */
	phone: string;
	/** Pre-filled message text. */
	text?: string;
	variant?: 'primary' | 'secondary' | 'plain';
	size?: 'sm' | 'md' | 'lg';
	label?: string;
}
