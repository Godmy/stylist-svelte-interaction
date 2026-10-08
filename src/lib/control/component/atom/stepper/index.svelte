<script lang="ts">
	type Props = {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		label?: string;
		disabled?: boolean;
		onChange?: (value: number) => void;
	};

	let {
		value = 0,
		min = 0,
		max = 99,
		step = 1,
		label = 'Quantity',
		disabled = false,
		onChange
	}: Props = $props();

	const normalized = $derived(Math.min(max, Math.max(min, value)));
	const canDecrement = $derived(!disabled && normalized > min);
	const canIncrement = $derived(!disabled && normalized < max);

	function commit(next: number) {
		const clamped = Math.min(max, Math.max(min, next));
		value = clamped;
		onChange?.(clamped);
	}
</script>

<div class="c-stepper" aria-label={label}>
	<button
		type="button"
		class="c-stepper__button"
		aria-label={`Decrease ${label}`}
		disabled={!canDecrement}
		onclick={() => commit(normalized - step)}
	>
		-
	</button>
	<input
		class="c-stepper__input"
		type="number"
		aria-label={label}
		{min}
		{max}
		{step}
		{disabled}
		value={normalized}
		oninput={(event) => commit(Number((event.target as HTMLInputElement).value))}
	/>
	<button
		type="button"
		class="c-stepper__button"
		aria-label={`Increase ${label}`}
		disabled={!canIncrement}
		onclick={() => commit(normalized + step)}
	>
		+
	</button>
</div>

<style>
	.c-stepper {
		display: inline-grid;
		grid-template-columns: 2.25rem minmax(3rem, 4rem) 2.25rem;
		align-items: stretch;
		min-height: 2.25rem;
		border: 1px solid var(--color-border-primary, rgba(15, 23, 42, 0.16));
		border-radius: 0.5rem;
		overflow: hidden;
		background: var(--color-background-primary, #fff);
	}
	.c-stepper__button,
	.c-stepper__input {
		border: 0;
		background: transparent;
		color: var(--color-text-primary, #17231f);
		font: inherit;
	}
	.c-stepper__button {
		display: grid;
		place-items: center;
		font-weight: 700;
		cursor: pointer;
		transition: background 140ms ease;
	}
	.c-stepper__button:hover:not(:disabled) {
		background: var(--color-background-secondary, rgba(15, 23, 42, 0.06));
	}
	.c-stepper__button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.c-stepper__input {
		width: 100%;
		text-align: center;
		border-inline: 1px solid var(--color-border-primary, rgba(15, 23, 42, 0.16));
		appearance: textfield;
	}
	.c-stepper__input::-webkit-outer-spin-button,
	.c-stepper__input::-webkit-inner-spin-button {
		margin: 0;
		appearance: none;
	}
</style>
