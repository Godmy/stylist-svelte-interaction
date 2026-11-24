/** Reactive behavior of feedback-scenario; props are read lazily when needed. */
export function createFeedbackScenarioComponentState() {
	let tone = $state<'dark' | 'light'>('dark');
	let question = $state('Как прошла консультация?');
	let latest = $state<number>();
	const labels = {
		region: 'Обратная связь',
		prompt: 'Оцените свой опыт — это поможет улучшить следующую встречу.',
		legend: 'Оценка от 1 до 5',
		score: 'Оценка',
		submit: 'Отправить оценку',
		resultBefore: 'Вы выбрали',
		resultAfter: 'из 5',
		thanks: 'Спасибо за отзыв!',
		saved: 'Ваш ответ сохранён в этой демонстрации.',
		again: 'Оценить заново'
	};
	return {
		get tone(): typeof tone {
			return tone;
		},
		set tone(__nextValue: typeof tone) {
			tone = __nextValue;
		},
		get question(): typeof question {
			return question;
		},
		set question(__nextValue: typeof question) {
			question = __nextValue;
		},
		get latest(): typeof latest {
			return latest;
		},
		set latest(__nextValue: typeof latest) {
			latest = __nextValue;
		},
		get labels(): typeof labels {
			return labels;
		}
	};
}
export default createFeedbackScenarioComponentState;
