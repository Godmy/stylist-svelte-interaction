import type { RecipeTimeSlot } from '$stylist/calendar/interface/recipe/time-slot';

export function createTimeSlotState(getProps: () => RecipeTimeSlot) {
	const props = $derived(getProps());
	const safeStart = $derived(
		props.start instanceof Date
			? props.start
			: props.start
				? new Date(props.start as unknown as string | number | Date)
				: new Date(0)
	);
	const safeEnd = $derived(
		props.end instanceof Date
			? props.end
			: props.end
				? new Date(props.end as unknown as string | number | Date)
				: new Date(0)
	);
	const startTimeText = $derived(
		Number.isNaN(safeStart.getTime()) ? 'unknown start time' : safeStart.toLocaleTimeString()
	);
	const endTimeText = $derived(
		Number.isNaN(safeEnd.getTime()) ? 'unknown end time' : safeEnd.toLocaleTimeString()
	);
	const displayTimeLabel = $derived(props.timeLabel ?? `${startTimeText} - ${endTimeText}`);
	const available = $derived(props.available ?? true);
	const selected = $derived(props.selected ?? false);
	const active = $derived(props.active ?? false);
	const wrapperClasses = $derived(
		[
			'c-time-slot',
			available ? 'c-time-slot--available' : 'c-time-slot--unavailable',
			selected ? 'c-time-slot--selected' : '',
			active ? 'c-time-slot--active' : '',
			props.class ?? ''
		]
			.filter(Boolean)
			.join(' ')
	);
	const ariaLabel = $derived(
		`Time slot from ${startTimeText} to ${endTimeText}, ${(props.available ?? true) ? 'available' : 'not available'}`
	);
	const events = $derived(props.events ?? []);

	const restProps = $derived.by(() => {
		const {
			start: _start,
			end: _end,
			timeLabel: _timeLabel,
			available: _available,
			selected: _selected,
			active: _active,
			events: _events,
			class: _class,
			onChange: _onChange,
			onClick: _onClick,
			onKeyDown: _onKeyDown,
			...rest
		} = props;

		return rest;
	});

	function handleClick() {
		const slot = {
			start: safeStart,
			end: safeEnd,
			timeLabel: displayTimeLabel,
			available: props.available ?? true,
			selected: props.selected ?? false,
			active: props.active ?? false,
			events: props.events ?? []
		};
		props.onChange?.(slot);
		props.onClick?.(slot);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick();
		}
		props.onKeyDown?.(e);
	}

	return {
		get wrapperClasses() {
			return wrapperClasses;
		},
		get displayTimeLabel() {
			return displayTimeLabel;
		},
		get startTimeText() {
			return startTimeText;
		},
		get endTimeText() {
			return endTimeText;
		},
		get ariaLabel() {
			return ariaLabel;
		},
		get events() {
			return events;
		},
		get restProps() {
			return restProps;
		},
		handleClick,
		handleKeyDown
	};
}

export default createTimeSlotState;
