import { describe, expect, it } from 'vitest';
import { timetableCell } from '$stylist/calendar/function/resolve/timetable-cell';

describe('timetableCell', () => {
	it('preserves concurrent lessons and matches a co-teacher', () => {
		const lessons = [
			{
				id: 'a',
				classId: '5a',
				dayId: 'mon',
				periodId: '1',
				subject: 'Math',
				teachers: ['A', 'B']
			},
			{ id: 'b', classId: '5a', dayId: 'mon', periodId: '1', subject: 'Language', teachers: ['C'] }
		];
		expect(timetableCell(lessons, 'mon', '1', '5a')).toHaveLength(2);
		expect(timetableCell(lessons, 'mon', '1', '5a', ['B']).map((item) => item.id)).toEqual(['a']);
	});

	it('keeps cells empty when any axis or teacher does not match', () => {
		const lessons = [
			{ id: 'a', classId: '5a', dayId: 'mon', periodId: '1', subject: 'Math', teachers: ['A'] }
		];
		expect(timetableCell(lessons, 'tue', '1', '5a')).toEqual([]);
		expect(timetableCell(lessons, 'mon', '2', '5a')).toEqual([]);
		expect(timetableCell(lessons, 'mon', '1', '5b')).toEqual([]);
		expect(timetableCell(lessons, 'mon', '1', '5a', ['B'])).toEqual([]);
	});
});
