<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlInputNumber from '$stylist/html/component/atom/input-number/index.svelte';
	import HtmlLabel from '$stylist/html/component/atom/label/index.svelte';
	import HtmlOutput from '$stylist/html/component/atom/output/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSmall from '$stylist/html/component/atom/small/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlForm from '$stylist/html/component/organism/form/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import { cooldownCounter } from '$stylist/form/function/resolve/cooldown-counter';
	import type { RecipeSupportCounter } from '$stylist/form/interface/recipe/support-counter';

	let {
		element = $bindable(null),
		title = 'Счётчик с паузой',
		class: className,
		...rest
	}: RecipeSupportCounter = $props();

	let count = $state(42);
	let amount = $state(1);
	let now = $state(0);
	let availableAt = $state(0);
	let notice = $state('');
	const remaining = $derived(Math.max(0, Math.ceil((availableAt - now) / 1000)));

	$effect(() => {
		now = Date.now();
		const timer = setInterval(() => (now = Date.now()), 200);
		return () => clearInterval(timer);
	});

	function add(event: SubmitEvent) {
		event.preventDefault();
		const result = cooldownCounter(count, amount, Date.now(), availableAt);
		count = result.count;
		availableAt = result.availableAt;
		now = Date.now();
		notice = result.accepted
			? 'Демо-действие учтено.'
			: 'Проверьте количество или дождитесь завершения паузы.';
	}
</script>

<HtmlSection bind:element {...rest} class={['c-support-counter', className]} aria-label={title}>
	<HtmlSpan class="c-support-counter__badge">Демо сообщества</HtmlSpan>
	<HtmlH2 class="c-support-counter__title">Поддержать идею</HtmlH2>
	<HtmlOutput class="c-support-counter__value" aria-label="Значение счётчика">{count}</HtmlOutput>
	<HtmlForm class="c-support-counter__form" onsubmit={add}>
		<HtmlLabel class="c-support-counter__field">
			Количество действий
			<HtmlInputNumber
				class="c-support-counter__input"
				min="1"
				max="99"
				step="1"
				required
				bind:value={amount}
			/>
		</HtmlLabel>
		<HtmlButton type="submit" class="c-support-counter__button" disabled={remaining > 0}>
			{remaining ? `Подождите ${remaining} с` : 'Добавить к счётчику'}
		</HtmlButton>
	</HtmlForm>
	<HtmlP role="status" class="c-support-counter__status">{notice}</HtmlP>
	<HtmlSmall class="c-support-counter__note">
		Пауза — 5 секунд. Счётчик не синхронизируется с сервером.
	</HtmlSmall>
</HtmlSection>

<style>
	:global {
		.c-support-counter {
			display: flex;
			flex-direction: column;
			gap: calc(var(--layout-spacing-1rem, 1rem) * 0.75);
			max-width: 28.75rem;
			margin-inline: auto;
			padding: calc(var(--layout-spacing-1rem, 1rem) * 2);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			border-radius: var(--layout-border-radius-xl, 0.75rem);
			background: var(--color-background-primary);
			color: var(--color-text-primary);
		}
		.c-support-counter__badge {
			align-self: start;
			padding: calc(var(--layout-spacing-1rem, 1rem) / 8) calc(var(--layout-spacing-1rem, 1rem) / 2);
			border-radius: var(--layout-border-radius-full, 9999px);
			background: var(--color-warning-container, var(--color-background-secondary));
			color: var(--color-on-warning-container, var(--color-text-primary));
			font-size: var(--typography-font-size-3, 0.75rem);
		}
		.c-support-counter__title {
			margin: 0;
			font-size: var(--typography-font-size-6, 1.5rem);
		}
		.c-support-counter__value {
			font-size: var(--typography-font-size-16, 4rem);
			font-weight: var(--typography-font-weight-extrabold, 800);
			font-variant-numeric: tabular-nums;
			letter-spacing: -0.06em;
		}
		.c-support-counter__form {
			display: flex;
			flex-direction: column;
			gap: calc(var(--layout-spacing-1rem, 1rem) * 0.75);
		}
		.c-support-counter__field {
			display: flex;
			flex-direction: column;
			gap: calc(var(--layout-spacing-1rem, 1rem) / 4);
			font-weight: var(--typography-font-weight-medium, 500);
		}
		.c-support-counter__input {
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-secondary);
			border-radius: var(--layout-border-radius-md, 0.375rem);
			background: var(--color-background-primary);
			color: var(--color-text-primary);
			font: inherit;
		}
		.c-support-counter__button {
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid var(--color-primary-600);
			border-radius: var(--layout-border-radius-md, 0.375rem);
			background: var(--color-primary-600);
			color: var(--color-on-primary, #fff);
			font: inherit;
			cursor: pointer;
		}
		.c-support-counter__button:disabled {
			opacity: var(--opacity-50, 0.5);
			cursor: default;
		}
		.c-support-counter__input:focus-visible,
		.c-support-counter__button:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: var(--focus-offset, 0.125rem);
		}
		.c-support-counter__status {
			margin: 0;
			min-height: 1.5em;
		}
		.c-support-counter__note {
			color: var(--color-text-secondary);
		}
	}
</style>
