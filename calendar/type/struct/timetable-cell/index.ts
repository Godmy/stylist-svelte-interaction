import type { TimetableLesson } from '$stylist/calendar/type/struct/timetable-lesson';

/** A selected cell, including empty cells where a lesson can be created. */
export type TimetableCell = {
	dayId: string;
	periodId: string;
	classId: string;
	lessons: readonly TimetableLesson[];
};
