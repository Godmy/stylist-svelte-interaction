import type { RecipeHtmlDiv } from '$stylist/html/interface/recipe/div';
import type { BehaviorTimetable } from '$stylist/calendar/interface/behavior/timetable';
import type { SlotTimetable } from '$stylist/calendar/interface/slot/timetable';

/** Class-by-day lesson grid: rows are day/period pairs, columns are classes. */
export interface RecipeTimetable
	extends Omit<RecipeHtmlDiv, 'children'>, BehaviorTimetable, SlotTimetable {}
