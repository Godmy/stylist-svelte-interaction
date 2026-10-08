export function formatDisplayDate(date: Date, locale = 'en-US'): string {
	return date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatMonthYear(date: Date, locale = 'en-US'): string {
	return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
}

export function formatShortMonthYear(date: Date, locale = 'en-US'): string {
	return date.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
}

export function formatDayLabel(date: Date, locale = 'en-US'): string {
	return date.toLocaleDateString(locale, { weekday: 'short' });
}

export function formatShortDate(date: Date, locale = 'en-US'): string {
	return date.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
}

export function formatTime(date: Date, locale = 'en-US'): string {
	return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}
