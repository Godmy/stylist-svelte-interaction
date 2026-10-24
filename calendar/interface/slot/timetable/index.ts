import type { TimetableClass } from '$stylist/calendar/type/struct/timetable-class';
import type { TimetableDay } from '$stylist/calendar/type/struct/timetable-day';
import type { TimetableLesson } from '$stylist/calendar/type/struct/timetable-lesson';
import type { TimetablePeriod } from '$stylist/calendar/type/struct/timetable-period';

/** Explicit axes, lesson content and visible labels; no global school store. */
export interface SlotTimetable {
	days: readonly TimetableDay[];
	periods: readonly TimetablePeriod[];
	classes: readonly TimetableClass[];
	lessons: readonly TimetableLesson[];
	caption?: string;
	dayHeader?: string;
	periodHeader?: string;
	emptyLabel?: string;
	emptyCellLabel?: string;
}
