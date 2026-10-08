import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeEventCalendar } from '$stylist/calendar/interface/recipe/event-calendar';
import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';
import type { SlotCalendarDay } from '$stylist/calendar/interface/slot/calendar-day';
import type { TokenTimeMeasure } from '$stylist/calendar/type/alias/time-measure';
import {
	generateCalendarGrid,
	isToday as isTodayFn,
	isSameDay,
	startOfWeek
} from '$stylist/calendar/function/script/calendar-utils';

export function createEventCalendarState(getProps: () => RecipeEventCalendar) {
	const props = $derived(getProps());
	let currentDate = $state(new Date(props.initialDate ?? new Date()));
	let selectedEvent: SlotCalendarEvent | null = $state(null);
	let showEventActions = $state(false);
	let currentViewMode = $state<TokenTimeMeasure>(props.viewMode ?? 'month');

	const events = $derived(props.events ?? []);
	const className = $derived(props.class ?? '');
	const dayClass = $derived(props.dayClass ?? '');
	const eventClass = $derived(props.eventClass ?? '');
	const headerClassProp = $derived(props.headerClass ?? '');
	const showAllDayEvents = $derived(props.showAllDayEvents ?? true);
	const showEventDuration = $derived(props.showEventDuration ?? true);

	const wrapperClasses = $derived(ClassNamesManager.merge('c-event-calendar', className));
	const headerClasses = $derived('c-event-calendar__header');

	const days = $derived.by<SlotCalendarDay[]>(() => {
		const month = currentDate.getMonth();
		if (currentViewMode === 'month') {
			return generateCalendarGrid(currentDate).map((date) => ({
				date,
				isCurrentMonth: date.getMonth() === month,
				isToday: isTodayFn(date),
				isSelected: false,
				events: events.filter((e) => isSameDay(new Date(e.start), date))
			}));
		}
		if (currentViewMode === 'week') {
			const weekStart = startOfWeek(currentDate);
			return Array.from({ length: 7 }, (_, i) => {
				const date = new Date(weekStart);
				date.setDate(weekStart.getDate() + i);
				return {
					date,
					isCurrentMonth: date.getMonth() === month,
					isToday: isTodayFn(date),
					isSelected: false,
					events: events.filter((e) => isSameDay(new Date(e.start), date))
				};
			});
		}
		return [
			{
				date: currentDate,
				isCurrentMonth: true,
				isToday: isTodayFn(currentDate),
				isSelected: true,
				events: events.filter((e) => isSameDay(new Date(e.start), currentDate))
			}
		];
	});

	const weekdays = $derived(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
	const displayTitle = $derived(getDisplayTitle(currentDate, currentViewMode));

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
				return date.toLocaleDateString('en-US', {
					weekday: 'long',
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				});
			case 'week': {
				const weekStart = startOfWeek(date);
				const weekEnd = new Date(weekStart);
				weekEnd.setDate(weekStart.getDate() + 6);
				return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
			}
			default:
				return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
		}
	}

	function formatTimeRange(start: Date, end: Date): string {
		const fmt = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		return `${fmt(start)} - ${fmt(end)}`;
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
