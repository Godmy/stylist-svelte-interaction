import type { TimetableLesson } from '$stylist/calendar/type/struct/timetable-lesson';

/** Return every lesson in a cell, preserving concurrent lessons and teacher assignments. */
export function timetableCell(
	lessons: readonly TimetableLesson[],
	dayId: string,
	periodId: string,
	classId: string,
	teacherFilter: readonly string[] = []
): TimetableLesson[] {
	return lessons.filter(
		(lesson) =>
			lesson.dayId === dayId &&
			lesson.periodId === periodId &&
			lesson.classId === classId &&
			(!teacherFilter.length || lesson.teachers.some((teacher) => teacherFilter.includes(teacher)))
	);
}
