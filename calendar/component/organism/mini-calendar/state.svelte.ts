import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeMiniCalendar as MiniCalendarContract } from '$stylist/calendar/interface/recipe/mini-calendar';
import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';
import type { SlotCalendarDay } from '$stylist/calendar/interface/slot/calendar-day';
import {
	generateCalendarGrid,
	isToday as isTodayFn,
	isSameDay
} from '$stylist/calendar/function/script/calendar-utils';
import { formatShortMonthYear } from '$stylist/calendar/function/script/date-format';

export function createMiniCalendarState(getProps: () => MiniCalendarContract) {
	const props = $derived(getProps());
	let currentDate = $state(new Date(props.initialDate ?? new Date()));
	let selectedDate = $state<Date | null>(null);

	const events = $derived(props.events ?? []);
	const compact = $derived(props.compact ?? false);
	const showToday = $derived(props.showToday ?? true);
	const showWeekNumbers = $derived(props.showWeekNumbers ?? false);
	const className = $derived(props.class ?? '');
	const dayClass = $derived(props.dayClass ?? '');
	const eventClass = $derived(props.eventClass ?? '');
	const headerClassProp = $derived(props.headerClass ?? '');

	const wrapperClasses = $derived(
		ClassNamesManager.merge('c-mini-calendar', compact && 'c-mini-calendar--compact', className)
	);
	const headerClasses = $derived(
		ClassNamesManager.merge('c-mini-calendar__header', headerClassProp)
	);
	const weekdayHeaderClasses = $derived(
		ClassNamesManager.merge('c-mini-calendar__weekday', headerClassProp)
	);
	const gridClasses = $derived('c-mini-calendar__grid');

	const days = $derived.by<SlotCalendarDay[]>(() => {
		const month = currentDate.getMonth();
		return generateCalendarGrid(currentDate).map((date) => {
			const dayEvents = events.filter((e) => isSameDay(new Date(e.start), date));
			return {
				date,
				isCurrentMonth: date.getMonth() === month,
				isToday: isTodayFn(date),
				isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
				hasEvent: dayEvents.length > 0,
				events: dayEvents
			};
		});
	});

	const weekdays = $derived(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
	const monthYear = $derived(formatShortMonthYear(currentDate));

	const restProps = $derived.by(() => {
		const {
			events: _events,
			initialDate: _initialDate,
			compact: _compact,
			showToday: _showToday,
			showWeekNumbers: _showWeekNumbers,
			class: _class,
			dayClass: _dayClass,
			eventClass: _eventClass,
			headerClass: _headerClass,
			onDateSelect: _onDateSelect,
			onEventClick: _onEventClick,
			...rest
		} = props;
		return rest;
	});

	function navigateMonth(direction: number): void {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
	}

	function navigateToToday(): void {
		currentDate = new Date();
	}

	function handleDateSelect(date: Date): void {
		selectedDate = new Date(date);
		props.onDateSelect?.(date);
	}

	function handleEventClick(event: SlotCalendarEvent, e: Event): void {
		e.stopPropagation();
		props.onEventClick?.(event);
	}

	function getDayCellClasses(
		isTodayDate: boolean,
		isCurrentMonth: boolean,
		hasEvent: boolean
	): string {
		return ClassNamesManager.merge(
			'c-mini-calendar__day',
			isTodayDate && 'c-mini-calendar__day--today',
			!isCurrentMonth && 'c-mini-calendar__day--other',
			hasEvent && 'c-mini-calendar__day--has-event',
			dayClass
		);
	}

	function getDateNumberClasses(): string {
		return 'c-mini-calendar__date-num';
	}

	function getEventIndicatorClasses(color?: string): string {
		void color;
		return ClassNamesManager.merge('c-mini-calendar__event-dot', eventClass);
	}

	return {
		get currentDate() {
			return currentDate;
		},
		get days() {
			return days;
		},
		get weekdays() {
			return weekdays;
		},
		get monthYear() {
			return monthYear;
		},
		get compact() {
			return compact;
		},
		get showToday() {
			return showToday;
		},
		get showWeekNumbers() {
			return showWeekNumbers;
		},
		get wrapperClasses() {
			return wrapperClasses;
		},
		get headerClasses() {
			return headerClasses;
		},
		get weekdayHeaderClasses() {
			return weekdayHeaderClasses;
		},
		get gridClasses() {
			return gridClasses;
		},
		get restProps() {
			return restProps;
		},
		navigateMonth,
		navigateToToday,
		handleDateSelect,
		handleEventClick,
		getDayCellClasses,
		getDateNumberClasses,
		getEventIndicatorClasses
	};
}

export default createMiniCalendarState;
