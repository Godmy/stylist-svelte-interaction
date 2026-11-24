import type { RecipeHtmlDiv } from '$stylist/html/interface/recipe/div';
import type { BehaviorTimetable } from '$stylist/calendar/interface/behavior/timetable';
import type { TimetableClass } from '$stylist/calendar/type/struct/timetable-class';
import type { TimetableDay } from '$stylist/calendar/type/struct/timetable-day';
import type { TimetableLesson } from '$stylist/calendar/type/struct/timetable-lesson';
import type { TimetablePeriod } from '$stylist/calendar/type/struct/timetable-period';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Class-by-day lesson grid: rows are day/period pairs, columns are classes. */
export interface RecipeTimetable extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlDiv, 'children'>,
		BehaviorTimetable,
		{
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
	]
> {}
