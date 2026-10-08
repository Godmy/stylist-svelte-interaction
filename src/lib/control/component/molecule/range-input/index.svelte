<script lang="ts">
	import type { RecipeRangeInput } from '$stylist/control/interface/recipe/range-input';
	import { createRangeInputState } from './state.svelte';

	let props: RecipeRangeInput = $props();
	const state = createRangeInputState(() => props);
</script>

<div class={`c-range-input ${state.className}`.trim()}>
	<div class="c-range-input__track-wrap">
		<div class={`c-range-input__track ${state.rangeClass}`}></div>
		<div class="c-range-input__fill" style={state.fillStyle}></div>
		<input
			type="range"
			class="c-range-input__range"
			min={state.min}
			max={state.max}
			step={state.step}
			bind:value={state.minVal}
			oninput={(e) => state.update('min', Number((e.target as HTMLInputElement).value))}
			onchange={state.commit}
			disabled={state.disabled}
		/>
		<input
			type="range"
			class="c-range-input__range"
			min={state.min}
			max={state.max}
			step={state.step}
			bind:value={state.maxVal}
			oninput={(e) => state.update('max', Number((e.target as HTMLInputElement).value))}
			onchange={state.commit}
			disabled={state.disabled}
		/>
	</div>

	{#if state.showInputFields}
		<div class="c-range-input__fields">
			<input
				type="number"
				class={`c-range-input__number ${state.inputClass}`}
				bind:value={state.minVal}
				oninput={(e) => state.update('min', Number((e.target as HTMLInputElement).value))}
				onchange={state.commit}
			/>
			<input
				type="number"
				class={`c-range-input__number ${state.inputClass}`}
				bind:value={state.maxVal}
				oninput={(e) => state.update('max', Number((e.target as HTMLInputElement).value))}
				onchange={state.commit}
			/>
		</div>
	{/if}
</div>

<style>
	.c-range-input {
		width: 100%;
	}

	.c-range-input__track-wrap {
		position: relative;
		height: 2rem;
	}

	.c-range-input__track {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		height: 0.5rem;
		width: 100%;
		border-radius: 9999px;
		background-color: var(--color-background-tertiary);
	}

	.c-range-input__fill {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		height: 0.5rem;
		border-radius: 9999px;
		background: var(--color-primary-500);
		pointer-events: none;
	}

	.c-range-input__range {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		height: 2rem;
		appearance: none;
		background: transparent;
		pointer-events: none;
	}

	.c-range-input__range::-webkit-slider-thumb {
		pointer-events: all;
		appearance: none;
		width: 1rem;
		height: 1rem;
		border-radius: 9999px;
		background-color: var(--color-primary-500);
		cursor: pointer;
	}

	.c-range-input__fields {
		margin-block-start: 0.75rem;
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.c-range-input__number {
		width: 6rem;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--layout-border-radius-base, 0.25rem);
		background-color: var(--color-background-primary);
		color: var(--color-text-primary);
	}
</style>
