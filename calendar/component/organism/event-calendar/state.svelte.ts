import { untrack } from 'svelte';
import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeEventCalendar } from '$stylist/calendar/interface/recipe/event-calendar';
import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';
import type { SlotCalendarDay } from '$stylist/calendar/interface/slot/calendar-day';
import type { TokenTimeMeasure } from '$stylist/calendar/type/alias/time-measure';
import {
	generateCalendarGrid,
	isToday as isTodayFn,
	startOfDay,
	startOfWeek
} from '$stylist/calendar/function/script/calendar-utils';

const DEFAULT_LABELS = {
	today: 'Today',
	day: 'Day',
	week: 'Week',
	month: 'Month',
	allDay: 'all day',
	start: 'Start',
	end: 'End',
	location: 'Location',
	open: 'Open',
	edit: 'Edit',
	delete: 'Delete'
};

const capitalize = (text: string) => text.charAt(0).toLocaleUpperCase() + text.slice(1);

export function createEventCalendarState(getProps: () => RecipeEventCalendar) {
	const props = $derived(getProps());
	let currentDate = $state(untrack(() => new Date(props.initialDate ?? new Date())));
	let selectedEvent: SlotCalendarEvent | null = $state(null);
	let showEventActions = $state(false);
	let currentViewMode = $derived<TokenTimeMeasure>(props.viewMode ?? 'month');

	const events = $derived(props.events ?? []);
	const className = $derived(props.class ?? '');
	const dayClass = $derived(props.dayClass ?? '');
	const eventClass = $derived(props.eventClass ?? '');
	const headerClassProp = $derived(props.headerClass ?? '');
	const showAllDayEvents = $derived(props.showAllDayEvents ?? true);
	const showEventDuration = $derived(props.showEventDuration ?? true);
	const locale = $derived(props.locale ?? 'en-US');
	const weekStartsOn = $derived(props.weekStartsOn ?? 0);
	const labels = $derived({ ...DEFAULT_LABELS, ...props.labels });
	// Modal actions appear only for the handlers the page passes.
	const canEdit = $derived(!!props.onEventEdit);
	const canDelete = $derived(!!props.onEventDelete);

	// An event lies on every day from its start to its end (multi-day tours, trips).
	function eventsOn(date: Date): SlotCalendarEvent[] {
		const day = startOfDay(date).getTime();
		return events.filter((e) => {
			const start = startOfDay(new Date(e.start)).getTime();
			const end = Math.max(start, startOfDay(new Date(e.end ?? e.start)).getTime());
			return start <= day && day <= end;
		});
	}

	const wrapperClasses = $derived(ClassNamesManager.merge('c-event-calendar', className));
	const headerClasses = $derived('c-event-calendar__header');

	const days = $derived.by<SlotCalendarDay[]>(() => {
		const month = currentDate.getMonth();
		if (currentViewMode === 'month') {
			return generateCalendarGrid(currentDate, weekStartsOn).map((date) => ({
				date,
				isCurrentMonth: date.getMonth() === month,
				isToday: isTodayFn(date),
				isSelected: false,
				events: eventsOn(date)
			}));
		}
		if (currentViewMode === 'week') {
			const weekStart = startOfWeek(currentDate, weekStartsOn);
			return Array.from({ length: 7 }, (_, i) => {
				const date = new Date(weekStart);
				date.setDate(weekStart.getDate() + i);
				return {
					date,
					isCurrentMonth: date.getMonth() === month,
					isToday: isTodayFn(date),
					isSelected: false,
					events: eventsOn(date)
				};
			});
		}
		return [
			{
				date: currentDate,
				isCurrentMonth: true,
				isToday: isTodayFn(currentDate),
				isSelected: true,
				events: eventsOn(currentDate)
			}
		];
	});

	// 2023-01-01 is a Sunday: day i of the week in the page locale.
	const weekdays = $derived(
		Array.from({ length: 7 }, (_, i) =>
			capitalize(
				new Date(2023, 0, 1 + ((i + weekStartsOn) % 7)).toLocaleDateString(locale, {
					weekday: 'short'
				})
			)
		)
	);
	const displayTitle = $derived(capitalize(getDisplayTitle(currentDate, currentViewMode)));

	const restProps = $derived.by(() => {
		const {
			events: _events,
			initialDate: _initialDate,
			viewMode: _viewMode,
			class: _class,
			dayClass: _dayClass,
			eventClass: _eventClass,
			headerClass: _headerClass,
			showAllDayEvents: _showAllDayEvents,
			showEventDuration: _showEventDuration,
			locale: _locale,
			weekStartsOn: _weekStartsOn,
			labels: _labels,
			selectedDate: _selectedDate,
			onDayClick: _onDayClick,
			onViewModeChange: _onViewModeChange,
			children: _children,
			onEventClick: _onEventClick,
			onEventCreate: _onEventCreate,
			onEventEdit: _onEventEdit,
			onEventDelete: _onEventDelete,
			...rest
		} = props;
		return rest;
	});

	function navigateMonth(direction: number): void {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
	}

	function navigateWeek(direction: number): void {
		const next = new Date(currentDate);
		next.setDate(currentDate.getDate() + direction * 7);
		currentDate = next;
	}

	function navigateDay(direction: number): void {
		const next = new Date(currentDate);
		next.setDate(currentDate.getDate() + direction);
		currentDate = next;
	}

	function navigateToToday(): void {
		currentDate = new Date();
	}

	function changeViewMode(mode: TokenTimeMeasure): void {
		currentViewMode = mode;
		props.onViewModeChange?.(mode);
	}

	function navigateCurrent(direction: number): void {
		if (currentViewMode === 'month') navigateMonth(direction);
		else if (currentViewMode === 'week') navigateWeek(direction);
		else navigateDay(direction);
	}

	function handleDayClick(date: Date): void {
		props.onEventCreate?.(date);
	}

	function handleEventClick(event: SlotCalendarEvent, e: Event): void {
		e.stopPropagation();
		selectedEvent = event;
		showEventActions = true;
		props.onEventClick?.(event);
	}

	function handleEventEdit(): void {
		if (selectedEvent) {
			props.onEventEdit?.(selectedEvent);
			showEventActions = false;
		}
	}

	function handleEventDelete(): void {
		if (selectedEvent) {
			props.onEventDelete?.(selectedEvent);
			showEventActions = false;
			selectedEvent = null;
		}
	}

	function closeEventActions(): void {
		showEventActions = false;
	}

	function getDisplayTitle(date: Date, mode: TokenTimeMeasure): string {
		switch (mode) {
			case 'day':
				return date.toLocaleDateString(locale, {
					weekday: 'long',
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				});
			case 'week': {
				const weekStart = startOfWeek(date, weekStartsOn);
				const weekEnd = new Date(weekStart);
				weekEnd.setDate(weekStart.getDate() + 6);
				return `${weekStart.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}`;
			}
			default: {
				// Russian 'long' month with a year is genitive («октября 2026 г.»); standalone is wanted.
				const parts = new Intl.DateTimeFormat(locale, {
					month: 'long',
					year: 'numeric'
				}).formatToParts(date);
				const year =
					parts.find((part) => part.type === 'year')?.value ?? String(date.getFullYear());
				return `${new Intl.DateTimeFormat(locale, { month: 'long' }).format(date)} ${year}`;
			}
		}
	}

	function formatTimeRange(start: Date, end: Date): string {
		const fmt = (d: Date) => d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
		return `${fmt(start)} - ${fmt(end)}`;
	}

	/** Start/end line of the event dialog: dates only for all-day events. */
	function formatMoment(date: Date, allDay = false): string {
		return allDay
			? date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
			: date.toLocaleString(locale, { dateStyle: 'medium', timeStyle: 'short' });
	}

	function formatWeekdayDay(date: Date): string {
		return `${capitalize(date.toLocaleDateString(locale, { weekday: 'short' }))}, ${date.getDate()}`;
	}

	function getWeekdayHeaderClasses(): string {
		return 'c-event-calendar__weekday';
	}
	function getGridClasses(): string {
		return ClassNamesManager.merge(
			'c-event-calendar__grid',
			`c-event-calendar__grid--${currentViewMode}`
		);
	}

	function getDateHeaderClasses(isTodayDate: boolean): string {
		return ClassNamesManager.merge(
			'c-event-calendar__date-header',
			isTodayDate && 'c-event-calendar__date-header--today'
		);
	}

	function getDayCellClasses(isTodayDate: boolean, isCurrentMonth: boolean): string {
		return ClassNamesManager.merge(
			'c-event-calendar__day',
			isTodayDate && 'c-event-calendar__day--today',
			!isCurrentMonth && 'c-event-calendar__day--other'
		);
	}

	function getDateNumberClasses(isTodayDate: boolean): string {
		return ClassNamesManager.merge(
			'c-event-calendar__date-num',
			isTodayDate && 'c-event-calendar__date-num--today'
		);
	}

	function getEventClasses(hasColor = false, color?: string): string {
		return ClassNamesManager.merge(
			'c-event-calendar__event',
			hasColor && color && 'c-event-calendar__event--custom'
		);
	}
	function getModalOverlayClasses(): string {
		return 'c-event-calendar__modal-overlay';
	}
	function getModalContentClasses(): string {
		return 'c-event-calendar__modal';
	}
	function getModalHeaderClasses(): string {
		return 'c-event-calendar__modal-header';
	}
	function getModalFooterClasses(): string {
		return 'c-event-calendar__modal-footer';
	}

	return {
		get currentDate() {
			return currentDate;
		},
		get currentViewMode() {
			return currentViewMode;
		},
		get selectedEvent() {
			return selectedEvent;
		},
		get showEventActions() {
			return showEventActions;
		},
		get days() {
			return days;
		},
		get weekdays() {
			return weekdays;
		},
		get displayTitle() {
			return displayTitle;
		},
		get events() {
			return events;
		},
		get className() {
			return className;
		},
		get dayClass() {
			return dayClass;
		},
		get eventClass() {
			return eventClass;
		},
		get headerClassProp() {
			return headerClassProp;
		},
		get showAllDayEvents() {
			return showAllDayEvents;
		},
		get showEventDuration() {
			return showEventDuration;
		},
		get locale() {
			return locale;
		},
		get labels() {
			return labels;
		},
		get canEdit() {
			return canEdit;
		},
		get canDelete() {
			return canDelete;
		},
		get wrapperClasses() {
			return wrapperClasses;
		},
		get headerClasses() {
			return headerClasses;
		},
		get restProps() {
			return restProps;
		},
		navigateCurrent,
		navigateToToday,
		changeViewMode,
		handleDayClick,
		handleEventClick,
		handleEventEdit,
		handleEventDelete,
		closeEventActions,
		formatTimeRange,
		formatMoment,
		formatWeekdayDay,
		getWeekdayHeaderClasses,
		getGridClasses,
		getDateHeaderClasses,
		getDayCellClasses,
		getDateNumberClasses,
		getEventClasses,
		getModalOverlayClasses,
		getModalContentClasses,
		getModalHeaderClasses,
		getModalFooterClasses
	};
}

export default createEventCalendarState;
