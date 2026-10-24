import Timetable from '$stylist/calendar/component/organism/timetable/index.svelte';
import type { RecipeTimetable } from '$stylist/calendar/interface/recipe/timetable';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Two classes, concurrent lessons, teacher assignments and an empty cell. */
export default {
	component: Timetable,
	title: 'Timetable',
	description: 'Class-by-day lesson grid with class and teacher filters.',
	args: {
		caption: 'Расписание занятий',
		dayHeader: 'День',
		periodHeader: 'Урок',
		emptyLabel: 'Нет данных для расписания',
		emptyCellLabel: 'Пустой урок',
		days: [
			{ id: 'mon', label: 'Понедельник' },
			{ id: 'tue', label: 'Вторник' }
		],
		periods: [
			{ id: '1', label: '1', start: '08:00', end: '08:45' },
			{ id: '2', label: '2', start: '09:00', end: '09:45' }
		],
		classes: [
			{ id: 'a', label: '5А' },
			{ id: 'b', label: '5Б' }
		],
		lessons: [
			{
				id: 'l1',
				dayId: 'mon',
				periodId: '1',
				classId: 'a',
				subject: 'Математика',
				teachers: ['Ирина'],
				color: 'var(--color-primary-600)'
			},
			{
				id: 'l2',
				dayId: 'mon',
				periodId: '1',
				classId: 'b',
				subject: 'История',
				teachers: ['Сергей'],
				marker: 'Замена'
			},
			{
				id: 'l3',
				dayId: 'tue',
				periodId: '2',
				classId: 'a',
				subject: 'Язык',
				teachers: ['Ирина', 'Сергей']
			}
		]
	},
	controls: { caption: { type: 'text' } },
	presets: {
		'Только 5А': { classFilter: ['a'] },
		'Уроки Ирины': { teacherFilter: ['Ирина'] },
		'Пустая сетка': { lessons: [] }
	},
	layout: 'padded'
} satisfies ContractStory<RecipeTimetable>;
