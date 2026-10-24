<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlInputRadio from '$stylist/html/component/atom/input-radio/index.svelte';
	import HtmlLabel from '$stylist/html/component/atom/label/index.svelte';
	import HtmlLegend from '$stylist/html/component/atom/legend/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlFieldset from '$stylist/html/component/molecule/fieldset/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlForm from '$stylist/html/component/organism/form/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import { PresetRatingFeedbackLabels } from '$stylist/form/const/preset/rating-feedback-labels';
	import type { RecipeRatingFeedback } from '$stylist/form/interface/recipe/rating-feedback';

	let {
		element = $bindable(null),
		title = 'How did it go?',
		tone = 'dark',
		labels,
		onScoreSubmit,
		class: className,
		...rest
	}: RecipeRatingFeedback = $props();

	const text = $derived({ ...PresetRatingFeedbackLabels, ...labels });
	const name = $props.id();

	let score = $state<number>();
	let submitted = $state<number>();

	function send(event: SubmitEvent) {
		event.preventDefault();
		if (score === undefined || !Number.isInteger(score) || score < 1 || score > 5) return;
		submitted = score;
		onScoreSubmit?.(score);
	}
</script>

<HtmlSection
	bind:element
	{...rest}
	class={['c-rating-feedback', `c-rating-feedback--${tone}`, className]}
	aria-label={text.region}
>
	{#if submitted !== undefined}
		<HtmlDiv class="c-rating-feedback__mark" aria-hidden="true">✓</HtmlDiv>
		<HtmlP class="c-rating-feedback__result" role="status">
			{text.resultBefore}
			{submitted}
			{text.resultAfter}
		</HtmlP>
		<HtmlH2 class="c-rating-feedback__title">{text.thanks}</HtmlH2>
		<HtmlP class="c-rating-feedback__text">{text.saved}</HtmlP>
		<HtmlButton
			type="button"
			class="c-rating-feedback__button"
			onclick={() => {
				submitted = undefined;
				score = undefined;
			}}
		>
			{text.again}
		</HtmlButton>
	{:else}
		<HtmlDiv class="c-rating-feedback__mark" aria-hidden="true">✦</HtmlDiv>
		<HtmlH2 class="c-rating-feedback__title">{title}</HtmlH2>
		<HtmlP class="c-rating-feedback__text">{text.prompt}</HtmlP>
		<HtmlForm onsubmit={send}>
			<HtmlFieldset class="c-rating-feedback__fieldset">
				<HtmlLegend class="c-rating-feedback__legend">{text.legend}</HtmlLegend>
				<HtmlDiv class="c-rating-feedback__ratings">
					{#each [1, 2, 3, 4, 5] as value (value)}
						<HtmlLabel
							class="c-rating-feedback__rating"
							data-selected={score === value || undefined}
						>
							<HtmlInputRadio
								class="c-rating-feedback__radio"
								{name}
								{value}
								required
								aria-label={`${text.score} ${value}`}
								bind:group={score}
							/>
							<HtmlSpan>{value}</HtmlSpan>
						</HtmlLabel>
					{/each}
				</HtmlDiv>
			</HtmlFieldset>
			<HtmlButton type="submit" class="c-rating-feedback__button" disabled={score === undefined}>
				{text.submit}
			</HtmlButton>
		</HtmlForm>
	{/if}
</HtmlSection>

<style>
	:global {
		.c-rating-feedback {
			--c-rating-feedback-accent: var(--color-warning-400, #fbbf24);
			max-width: 25.625rem;
			padding: calc(var(--layout-spacing-1rem, 1rem) * 2);
			border-radius: var(--layout-border-radius-xxxl, 1.5rem);
			box-shadow: var(--elevation-level3, 0 18px 45px rgba(0, 0, 0, 0.15));
		}
		.c-rating-feedback--dark {
			background: var(--color-background-inverse, #0f172a);
			color: var(--color-text-inverse, #fff);
		}
		.c-rating-feedback--light {
			border: var(--border-width-thin, 1px) solid var(--color-warning-200, #fde68a);
			background: var(--color-warning-50, #fffbeb);
			color: var(--color-text-primary);
		}
		.c-rating-feedback__mark {
			display: grid;
			place-items: center;
			width: 3rem;
			height: 3rem;
			border-radius: var(--layout-border-radius-full, 9999px);
			background: color-mix(in srgb, currentColor 12%, transparent);
			color: var(--c-rating-feedback-accent);
			font-size: var(--typography-font-size-6, 1.5rem);
		}
		.c-rating-feedback__title {
			margin: calc(var(--layout-spacing-1rem, 1rem) * 1.3) 0
				calc(var(--layout-spacing-1rem, 1rem) * 0.7);
			font-size: var(--typography-font-size-6, 1.5rem);
			color: inherit;
		}
		.c-rating-feedback__text {
			line-height: 1.65;
			opacity: var(--opacity-80, 0.8);
		}
		.c-rating-feedback__result {
			color: var(--c-rating-feedback-accent);
		}
		.c-rating-feedback--light .c-rating-feedback__result,
		.c-rating-feedback--light .c-rating-feedback__mark {
			color: var(--color-warning-800, #92400e);
		}
		.c-rating-feedback__fieldset {
			min-width: 0;
			margin: calc(var(--layout-spacing-1rem, 1rem) * 1.2) 0;
			padding: 0;
			border: 0;
		}
		.c-rating-feedback__legend {
			margin-block-end: calc(var(--layout-spacing-1rem, 1rem) * 0.8);
			font-size: var(--typography-font-size-3, 0.75rem);
		}
		.c-rating-feedback__ratings {
			display: flex;
			justify-content: space-between;
			gap: calc(var(--layout-spacing-1rem, 1rem) * 0.6);
		}
		.c-rating-feedback__rating {
			position: relative;
			display: grid;
			place-items: center;
			width: 2.8rem;
			height: 2.8rem;
			border-radius: var(--layout-border-radius-full, 9999px);
			background: color-mix(in srgb, currentColor 10%, transparent);
			font-weight: var(--typography-font-weight-bold, 700);
			cursor: pointer;
		}
		.c-rating-feedback__rating[data-selected] {
			background: var(--c-rating-feedback-accent);
			color: var(--color-on-warning, #0f172a);
		}
		.c-rating-feedback__rating:focus-within {
			outline: var(--focus-width, 2px) solid var(--c-rating-feedback-accent);
			outline-offset: calc(var(--focus-offset, 0.125rem) + 1px);
		}
		.c-rating-feedback__radio {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			margin: 0;
			opacity: 0;
			cursor: pointer;
		}
		.c-rating-feedback__button {
			width: 100%;
			padding: calc(var(--layout-spacing-1rem, 1rem) * 0.75);
			border: 0;
			border-radius: var(--layout-border-radius-full, 9999px);
			background: var(--c-rating-feedback-accent);
			color: var(--color-on-warning, #0f172a);
			font: inherit;
			font-weight: var(--typography-font-weight-bold, 700);
			letter-spacing: 0.07em;
			text-transform: uppercase;
			cursor: pointer;
		}
		.c-rating-feedback__button:disabled {
			opacity: var(--opacity-40, 0.4);
			cursor: default;
		}
		.c-rating-feedback__button:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: var(--focus-offset, 0.125rem);
		}
		@media (max-width: 440px) {
			.c-rating-feedback {
				padding: calc(var(--layout-spacing-1rem, 1rem) * 1.2);
			}
			.c-rating-feedback__ratings {
				gap: calc(var(--layout-spacing-1rem, 1rem) * 0.35);
			}
			.c-rating-feedback__rating {
				width: 2.5rem;
				height: 2.5rem;
			}
		}
	}
</style>
