/** A lesson placed at day/period/class coordinates; several may share one cell. */
export type TimetableLesson = {
	id: string;
	dayId: string;
	periodId: string;
	classId: string;
	subject: string;
	teachers: readonly string[];
	marker?: string;
	color?: string;
};
