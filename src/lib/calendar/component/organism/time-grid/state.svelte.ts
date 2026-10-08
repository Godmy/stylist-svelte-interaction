import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeTimeGrid as TimeGridContract } from '$stylist/calendar/interface/recipe/time-grid';
import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';
import { isToday, isWeekend } from '$stylist/calendar/function/script/calendar-utils';

type TimeGridSlot = {
	start: Date;
	end: Date;
	timeLabel?: string;
	available?: boolean;
	selected?: boolean;
	active?: boolean;
	events?: SlotCalendarEvent[];
	hour?: number;
	minute?: number;
	time?: string;
	class?: string;
	onChange?: (slot: TimeGridSlot) => void;
	onClick?: (slot: TimeGridSlot) => void;
	onKeyDown?: (event: KeyboardEvent) => void;
};

type DayColumn = {
	date: Date;
	dayOfWeek: string;
	dateStr: string;
	slots: TimeGridSlot[];
};

export function createTimeGridState(getProps: () => TimeGridContract) {
	const props = $derived(getProps());
	let viewStartDate = $state(new Date(props.startDate ?? new Date()));
	let viewEndDate = $state(
		new Date(
			props.endDate ??
				new Date(new Date(new Date().setHours(0, 0, 0, 0)).setDate(new Date().getDate() + 6))
		)
	);
	let currentViewMode = $state<'day' | 'week' | 'month'>('week');

	const events = $derived(props.events ?? []);
	const startTime = $derived(props.startTime ?? 0);
	const endTime = $derived(props.endTime ?? 24);
	const timeStep = $derived(props.timeStep ?? 60);
	const showHeader = $derived(props.showHeader ?? true);
	const showCurrentTimeIndicator = $derived(props.showCurrentTimeIndicator ?? true);
	const showAllDayEvents = $derived(props.showAllDayEvents ?? true);
	const showTimeGutter = $derived(props.showTimeGutter ?? false);
	const timeSlotHeight = $derived(props.timeSlotHeight ?? 60);
	const variant = $derived(props.variant ?? 'grid');
	const className = $derived(props.class ?? '');
	const slotClass = $derived(props.slotClass ?? '');
	const eventClass = $derived(props.eventClass ?? '');
	const headerClassProp = $derived(props.headerClass ?? '');

	const wrapperClasses = $derived(
		ClassNamesManager.merge(
			'c-time-grid',
			variant === 'schedule' && 'c-time-grid--schedule',
			className
		)
	);
	const headerClasses = $derived(ClassNamesManager.merge('c-time-grid__header', headerClassProp));
	const timeGridClasses = $derived('c-time-grid__grid');

	const timeGrid = $derived.by<DayColumn[]>(() => generateTimeGrid());

	const timeGutterSlots = $derived.by(() => {
		const slots: { time: string; hour: number }[] = [];
		for (let hour = startTime; hour < endTime; hour++) {
			const period = hour >= 12 ? 'PM' : 'AM';
			const displayHour = hour % 12 || 12;
			slots.push({ time: `${displayHour} ${period}`, hour });
		}
		return slots;
	});

	const restProps = $derived.by(() => {
		const {
			events: _events,
			startDate: _startDate,
			endDate: _endDate,
			startTime: _startTime,
			endTime: _endTime,
			timeStep: _timeStep,
			showHeader: _showHeader,
			showCurrentTimeIndicator: _showCurrentTimeIndicator,
			showAllDayEvents: _showAllDayEvents,
			showTimeGutter: _showTimeGutter,
			timeSlotHeight: _timeSlotHeight,
			variant: _variant,
			children: _children,
			class: _class,
			slotClass: _slotClass,
			eventClass: _eventClass,
			headerClass: _headerClass,
			onEventClick: _onEventClick,
			onSlotClick: _onSlotClick,
			...rest
		} = props;
		return rest;
	});

	function generateSlotsForDay(date: Date): TimeGridSlot[] {
		const slots: TimeGridSlot[] = [];
		const st = startTime;
		const et = endTime;
		const step = timeStep;

		const dayStart = new Date(date);
		dayStart.setHours(0, 0, 0, 0);

		const dayEvents = events.filter((event) => {
			const ed = new Date(event.start);
			ed.setHours(0, 0, 0, 0);
			return ed.getTime() === dayStart.getTime();
		});

		for (let hour = st; hour < et; hour++) {
			for (let minute = 0; minute < 60; minute += step) {
				if (minute > 0 && step >= 60) break;

				const period = hour >= 12 ? 'PM' : 'AM';
				const displayHour = hour % 12 || 12;
				const displayMinute = minute.toString().padStart(2, '0');
				const timeDisplay =
					step < 60 ? `${displayHour}:${displayMinute} ${period}` : `${displayHour} ${period}`;

				const slotStart = new Date(date);
				slotStart.setHours(hour, minute, 0, 0);
				const slotEnd = new Date(slotStart);
				slotEnd.setMinutes(slotStart.getMinutes() + step);

				const slotEvents: SlotCalendarEvent[] = dayEvents.filter((event) => {
					const es = new Date(event.start);
					const ee = new Date(event.end);
					return (es < slotEnd && ee > slotStart) || es.getTime() === slotStart.getTime();
				});

				slots.push({
					start: slotStart,
					end: slotEnd,
					timeLabel: timeDisplay,
					available: true,
					events: slotEvents,
					hour,
					minute,
					time: timeDisplay
				});
			}
		}
		return slots;
	}

	function generateTimeGrid(): DayColumn[] {
		const grid: DayColumn[] = [];
		const start = new Date(viewStartDate);
		start.setHours(0, 0, 0, 0);
		const end = new Date(viewEndDate);
		end.setHours(0, 0, 0, 0);
		const daysCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

		for (let i = 0; i <= daysCount; i++) {
			const date = new Date(start);
			date.setDate(start.getDate() + i);
			if (date > viewEndDate) break;

			grid.push({
				date,
				dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
				dateStr: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
				slots: generateSlotsForDay(date)
			});
		}
		return grid;
	}

	function handleEventClick(event: SlotCalendarEvent): void {
		props.onEventClick?.(event);
	}

	function handleSlotClick(date: Date, hour: number, minute: number): void {
		const slotDate = new Date(date);
		slotDate.setHours(hour, minute, 0, 0);
		props.onSlotClick?.(slotDate);
	}

	function navigateWeek(direction: number): void {
		const newStart = new Date(viewStartDate);
		newStart.setDate(viewStartDate.getDate() + direction * 7);
		const newEnd = new Date(viewEndDate);
		newEnd.setDate(viewEndDate.getDate() + direction * 7);
		viewStartDate = newStart;
		viewEndDate = newEnd;
	}

	function navigateToToday(): void {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const start = new Date(today);
		if (currentViewMode === 'week') start.setDate(today.getDate() - today.getDay());
		if (currentViewMode === 'month') start.setDate(1);
		const end = new Date(start);
		if (currentViewMode === 'day') end.setDate(start.getDate());
		if (currentViewMode === 'week') end.setDate(start.getDate() + 6);
		if (currentViewMode === 'month') end.setMonth(start.getMonth() + 1, 0);
		viewStartDate = start;
		viewEndDate = end;
	}

	function changeViewMode(mode: 'day' | 'week' | 'month'): void {
		currentViewMode = mode;
		const start = new Date(viewStartDate);
		start.setHours(0, 0, 0, 0);
		if (mode === 'week') start.setDate(start.getDate() - start.getDay());
		if (mode === 'month') start.setDate(1);
		const end = new Date(start);
		if (mode === 'day') end.setDate(start.getDate());
		if (mode === 'week') end.setDate(start.getDate() + 6);
		if (mode === 'month') end.setMonth(start.getMonth() + 1, 0);
		viewStartDate = start;
		viewEndDate = end;
	}

	function getCurrentTimePosition(): number {
		const now = new Date();
		return ((now.getHours() - startTime) * 60 + now.getMinutes()) * (100 / 60);
	}

	function getDayColumnClasses(date: Date): string {
		return ClassNamesManager.merge(
			'c-time-grid__day-col',
			isWeekend(date) && 'c-time-grid__day-col--weekend'
		);
	}

	function getDayHeaderClasses(date: Date): string {
		return ClassNamesManager.merge(
			'c-time-grid__day-header',
			isToday(date) && 'c-time-grid__day-header--today',
			headerClassProp
		);
	}

	function getTimeIndicatorClasses(): string {
		return 'c-time-grid__now-indicator';
	}

	function getEventClasses(color?: string): string {
		void color;
		return ClassNamesManager.merge('c-time-grid__event', eventClass);
	}

	function getTimeSlotClasses(): string {
		return ClassNamesManager.merge('c-time-grid__slot', slotClass);
	}

	function getPriorityBadgeClasses(priority: string): string {
		return ClassNamesManager.merge('c-time-grid__priority', `c-time-grid__priority--${priority}`);
	}

	function isTodayDate(date: Date): boolean {
		return isToday(date);
	}

	function getColumnHeight(): number {
		return (endTime - startTime) * 60 * (100 / 60);
	}

	function getSlotHeight(): number {
		return timeStep * (100 / 60);
	}

	return {
		get viewStartDate() {
			return viewStartDate;
		},
		get viewEndDate() {
			return viewEndDate;
		},
		get timeGrid() {
			return timeGrid;
		},
		get timeGutterSlots() {
			return timeGutterSlots;
		},
		get showHeader() {
			return showHeader;
		},
		get showCurrentTimeIndicator() {
			return showCurrentTimeIndicator;
		},
		get showAllDayEvents() {
			return showAllDayEvents;
		},
		get showTimeGutter() {
			return showTimeGutter;
		},
		get timeSlotHeight() {
			return timeSlotHeight;
		},
		get variant() {
			return variant;
		},
		get currentViewMode() {
			return currentViewMode;
		},
		get slotClass() {
			return slotClass;
		},
		get eventClass() {
			return eventClass;
		},
		get wrapperClasses() {
			return wrapperClasses;
		},
		get headerClasses() {
			return headerClasses;
		},
		get timeGridClasses() {
			return timeGridClasses;
		},
		get restProps() {
			return restProps;
		},
		handleEventClick,
		handleSlotClick,
		navigateWeek,
		navigateToToday,
		changeViewMode,
		getCurrentTimePosition,
		getDayColumnClasses,
		getDayHeaderClasses,
		getTimeIndicatorClasses,
		getEventClasses,
		getTimeSlotClasses,
		getPriorityBadgeClasses,
		isTodayDate,
		getColumnHeight,
		getSlotHeight
	};
}

export default createTimeGridState;
