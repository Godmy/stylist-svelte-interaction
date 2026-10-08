export interface RecipeCalendar {
	value?: Date | null;
	initialMonth?: Date;
	weekStartsOn?: 0 | 1;
	weekdayLabels?: string[];
	/** Даты раньше minDate/позже maxDate также блокируют переход на месяц целиком вне диапазона. */
	minDate?: Date | null;
	maxDate?: Date | null;
	isDateDisabled?: (date: Date) => boolean;
	/** Акцентный цвет для today/selected (любое CSS-значение). По умолчанию — `--color-primary-500` темы. */
	accentColor?: string;
	onChange?: (date: Date) => void;
	class?: string;
}
