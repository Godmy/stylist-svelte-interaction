<script lang="ts">
	import type { RecipeInputStepper } from '$stylist/input/interface/recipe/input-stepper';

	let {
		value = 0,
		min = 0,
		max = 99,
		step = 1,
		label = 'Количество',
		disabled = false,
		size = 'md',
		background,
		class: className = '',
		onChange
	}: RecipeInputStepper = $props();

	const normalized = $derived(Math.min(max, Math.max(min, value)));
	const canDecrement = $derived(!disabled && normalized > min);
	const canIncrement = $derived(!disabled && normalized < max);

	function commit(next: number) {
		const clamped = Math.min(max, Math.max(min, next));
		value = clamped;
		onChange?.(clamped);
	}
</script>

<div
	class={`input-stepper ${className}`.trim()}
	data-size={size}
	aria-label={label}
	style:background
>
	<button
		type="button"
		class="input-stepper__button"
		aria-label={`Уменьшить: ${label}`}
		disabled={!canDecrement}
		onclick={() => commit(normalized - step)}
	>
		−
	</button>
	<strong class="input-stepper__value">{normalized}</strong>
	<button
		type="button"
		class="input-stepper__button"
		aria-label={`Увеличить: ${label}`}
		disabled={!canIncrement}
		onclick={() => commit(normalized + step)}
	>
		+
	</button>
</div>

<style>
	.input-stepper {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		font-size: 0.95rem;
	}

	.input-stepper[data-size='sm'] {
		font-size: 0.8rem;
	}

	.input-stepper[data-size='lg'] {
		font-size: 1.15rem;
	}

	.input-stepper__value {
		min-width: 1.2em;
		text-align: center;
		font: inherit;
		font-weight: 700;
	}

	.input-stepper__button {
		display: grid;
		place-items: center;
		width: 1.7em;
		height: 1.7em;
		flex: none;
		border: 1px solid rgba(23, 35, 31, 0.18);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.42);
		color: inherit;
		font: inherit;
		line-height: 1;
		cursor: pointer;
		transition:
			background 140ms ease,
			opacity 140ms ease;
	}

	.input-stepper__button:hover:not(:disabled) {
		background: rgba(23, 35, 31, 0.08);
	}

	.input-stepper__button:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}
</style>
