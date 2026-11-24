import type { RecipeDatePairPicker } from '$stylist/calendar/interface/recipe/date-pair-picker';
/** Reactive behavior of date-pair-picker; props are read lazily when needed. */
export function createDatePairPickerComponentState(
	getProps: () => Pick<RecipeDatePairPicker, 'value' | 'availableDates'> & {
		value: Exclude<RecipeDatePairPicker['value'], undefined>;
	}
) {
	const props = $derived(getProps());
	let openFor = $state<'start' | 'end' | null>(null);
	const open = $derived(openFor !== null);
	let rootEl = $state<HTMLDivElement>();
	function toIsoDate(date: Date): string {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	}
	// One line in the box: the year only when it isn't the current one.
	function formatDay(iso: string): string {
		const date = new Date(`${iso}T00:00:00`);
		return date.toLocaleDateString('ru-RU', {
			weekday: 'short',
			day: 'numeric',
			month: 'long',
			...(date.getFullYear() !== new Date().getFullYear() ? { year: 'numeric' } : {})
		});
	}
	const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
	const available = $derived(props['availableDates'] ? new Set(props['availableDates']) : null);
	const toDate = (iso: string) => (iso ? new Date(`${iso}T00:00:00`) : null);
	const firstAvailable = $derived(
		props['availableDates']?.[0] ? new Date(`${props['availableDates'][0]}T00:00:00`) : undefined
	);
	function isStartDisabled(date: Date): boolean {
		if (date < today) return true;
		return available ? !available.has(toIsoDate(date)) : false;
	}
	function isEndDisabled(date: Date): boolean {
		const start = toDate(props['value']);
		return date < (start ?? today);
	}
	$effect(() => {
		if (!open) return;
		const onPointer = (event: PointerEvent) => {
			if (rootEl && event.target instanceof Node && !rootEl.contains(event.target)) openFor = null;
		};
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') openFor = null;
		};
		document.addEventListener('pointerdown', onPointer);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('pointerdown', onPointer);
			document.removeEventListener('keydown', onKey);
		};
	});
	return {
		get openFor(): typeof openFor {
			return openFor;
		},
		set openFor(__nextValue: typeof openFor) {
			openFor = __nextValue;
		},
		get open(): typeof open {
			return open;
		},
		get rootEl(): typeof rootEl {
			return rootEl;
		},
		set rootEl(__nextValue: typeof rootEl) {
			rootEl = __nextValue;
		},
		get toIsoDate(): typeof toIsoDate {
			return toIsoDate;
		},
		get formatDay(): typeof formatDay {
			return formatDay;
		},
		get toDate(): typeof toDate {
			return toDate;
		},
		get firstAvailable(): typeof firstAvailable {
			return firstAvailable;
		},
		get isStartDisabled(): typeof isStartDisabled {
			return isStartDisabled;
		},
		get isEndDisabled(): typeof isEndDisabled {
			return isEndDisabled;
		}
	};
}
export default createDatePairPickerComponentState;
