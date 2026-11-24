import type { RecipeMonthRangePicker } from '$stylist/calendar/interface/recipe/month-range-picker';
/** Reactive behavior of month-range-picker; props are read lazily when needed. */
export function createMonthRangePickerComponentState(
	getProps: () => Pick<RecipeMonthRangePicker, 'from' | 'to' | 'onChange' | 'locale'> & {
		locale: Exclude<RecipeMonthRangePicker['locale'], undefined>;
	}
) {
	const props = $derived(getProps());
	let open = $state(false);
	const utc = (day: string) => new Date(`${day.slice(0, 10)}T00:00:00Z`);
	const iso = (date: Date) => date.toISOString().slice(0, 10);
	const monthEnd = (day: string) => {
		const date = utc(`${day.slice(0, 7)}-01`);
		date.setUTCMonth(date.getUTCMonth() + 1, 0);
		return iso(date);
	};
	const short = (day: string) => utc(day).toLocaleDateString(props['locale'], { timeZone: 'UTC' });
	const wholeMonth = $derived(
		props['from'].slice(8, 10) === '01' && props['to'] === monthEnd(props['from'])
	);
	const summary = $derived(
		wholeMonth
			? new Intl.DateTimeFormat(props['locale'], {
					month: 'long',
					year: 'numeric',
					timeZone: 'UTC'
				}).format(utc(props['from']))
			: `${short(props['from'])} – ${short(props['to'])}`
	);
	function shift(delta: number) {
		const date = utc(`${props['from'].slice(0, 7)}-01`);
		date.setUTCMonth(date.getUTCMonth() + delta);
		const start = iso(date);
		open = false;
		props['onChange']?.({ from: start, to: monthEnd(start) });
	}
	function apply(event: SubmitEvent) {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		const start = String(data.get('from') ?? '');
		const end = String(data.get('to') ?? '');
		if (!start || !end) return;
		open = false;
		props['onChange']?.(end < start ? { from: end, to: start } : { from: start, to: end });
	}
	return {
		get open(): typeof open {
			return open;
		},
		set open(__nextValue: typeof open) {
			open = __nextValue;
		},
		get summary(): typeof summary {
			return summary;
		},
		get shift(): typeof shift {
			return shift;
		},
		get apply(): typeof apply {
			return apply;
		}
	};
}
export default createMonthRangePickerComponentState;
