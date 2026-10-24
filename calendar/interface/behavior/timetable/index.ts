import type { TimetableCell } from '$stylist/calendar/type/struct/timetable-cell';

/** Filtering and host-owned editing of timetable cells. */
export interface BehaviorTimetable {
	classFilter?: readonly string[];
	teacherFilter?: readonly string[];
	/** Without a callback the table is read-only; with it every cell is a button. */
	onCellSelect?: (cell: TimetableCell) => void;
}
