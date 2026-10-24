<script lang="ts">
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlInputText from '$stylist/html/component/atom/input-text/index.svelte';
	import HtmlLabel from '$stylist/html/component/atom/label/index.svelte';
	import HtmlOption from '$stylist/html/component/atom/option/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSelect from '$stylist/html/component/molecule/select/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import RatingFeedback from '$stylist/form/component/organism/rating-feedback/index.svelte';
	import type { RecipeFeedbackScenario } from '$stylist/form/interface/recipe/feedback-scenario';

	let {
		element = $bindable(null),
		title = 'Оценка и обратная связь',
		class: className,
		...rest
	}: RecipeFeedbackScenario = $props();

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
</script>

<HtmlSection bind:element {...rest} class={['c-feedback-scenario', className]} aria-label={title}>
	<HtmlDiv class="c-feedback-scenario__sample">
		<RatingFeedback title={question} {tone} {labels} onScoreSubmit={(score) => (latest = score)} />
	</HtmlDiv>
	<HtmlSection class="c-feedback-scenario__panel">
		<HtmlH2 class="c-feedback-scenario__title">Сценарий обратной связи</HtmlH2>
		<HtmlLabel class="c-feedback-scenario__field">
			Вопрос
			<HtmlInputText class="c-feedback-scenario__input" bind:value={question} />
		</HtmlLabel>
		<HtmlLabel class="c-feedback-scenario__field">
			Оформление
			<HtmlSelect class="c-feedback-scenario__input" bind:value={tone}>
				<HtmlOption value="dark">Тёмное</HtmlOption>
				<HtmlOption value="light">Светлое</HtmlOption>
			</HtmlSelect>
		</HtmlLabel>
		<HtmlP>
			Выберите одну из пяти оценок. После отправки появится подтверждение с выбранным значением.
		</HtmlP>
		<HtmlP role="status">
			{latest === undefined ? 'Ответ ещё не отправлен' : `Последняя демо-оценка: ${latest}`}
		</HtmlP>
		<HtmlP class="c-feedback-scenario__note">
			Отправка передаёт значение странице. Сервис сбора отзывов здесь не подключён.
		</HtmlP>
	</HtmlSection>
</HtmlSection>

<style>
	:global {
		.c-feedback-scenario {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(16.25rem, 0.8fr);
			align-items: center;
			gap: calc(var(--layout-spacing-1rem, 1rem) * 2);
			color: var(--color-text-primary);
		}
		.c-feedback-scenario__sample {
			display: grid;
			place-items: center;
			min-width: 0;
			padding: calc(var(--layout-spacing-1rem, 1rem) * 2);
			border-radius: var(--layout-border-radius-xxl, 1rem);
			background: var(--color-background-tertiary, var(--color-background-secondary));
		}
		.c-feedback-scenario__panel {
			display: flex;
			flex-direction: column;
			gap: calc(var(--layout-spacing-1rem, 1rem) * 0.75);
			padding: calc(var(--layout-spacing-1rem, 1rem) * 1.5);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			border-radius: var(--layout-border-radius-xl, 0.75rem);
			background: var(--color-background-primary);
		}
		.c-feedback-scenario__title {
			margin: 0;
			font-size: var(--typography-font-size-5, 1.25rem);
		}
		.c-feedback-scenario__field {
			display: flex;
			flex-direction: column;
			gap: calc(var(--layout-spacing-1rem, 1rem) / 4);
			font-weight: var(--typography-font-weight-medium, 500);
		}
		.c-feedback-scenario__input {
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-secondary);
			border-radius: var(--layout-border-radius-md, 0.375rem);
			background: var(--color-background-primary);
			color: var(--color-text-primary);
			font: inherit;
		}
		.c-feedback-scenario__input:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: var(--focus-offset, 0.125rem);
		}
		.c-feedback-scenario__note {
			color: var(--color-text-secondary);
		}
		@media (max-width: 760px) {
			.c-feedback-scenario {
				grid-template-columns: 1fr;
			}
			.c-feedback-scenario__sample {
				padding: var(--layout-spacing-1rem, 1rem);
			}
		}
	}
</style>
