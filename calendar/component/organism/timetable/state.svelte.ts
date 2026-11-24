import type { RecipeTimetable } from '$stylist/calendar/interface/recipe/timetable';
/** Reactive behavior of timetable; props are read lazily when needed. */
export function createTimetableComponentState(
	getProps: () => Pick<RecipeTimetable, 'classes' | 'classFilter'> & {
		classFilter: Exclude<RecipeTimetable['classFilter'], undefined>;
	}
) {
	const props = $derived(getProps());
	const visibleClasses = $derived(
		props['classes'].filter(
			(item) => !props['classFilter'].length || props['classFilter'].includes(item.id)
		)
	);
	return {
		get visibleClasses(): typeof visibleClasses {
			return visibleClasses;
		}
	};
}
export default createTimetableComponentState;
