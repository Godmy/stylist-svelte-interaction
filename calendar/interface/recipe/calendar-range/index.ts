export interface RecipeCalendarRange {
	startDate?: Date | null;
	endDate?: Date | null;
	initialMonth?: Date;
	weekStartsOn?: 0 | 1;
	weekdayLabels?: string[];
	minDate?: Date | null;
	maxDate?: Date | null;
	isDateDisabled?: (date: Date) => boolean;
	/** Акцентный цвет для today/выбранного периода (любое CSS-значение). По умолчанию — `--color-primary-500` темы. */
	accentColor?: string;
	onChange?: (range: { start: Date | null; end: Date | null }) => void;
	class?: string;
}
