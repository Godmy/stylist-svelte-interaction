<script lang="ts">
	import type { RecipeRangeSlider } from '$stylist/control/interface/recipe/range-slider';
	import createRangeSliderState from './state.svelte';

	let props: RecipeRangeSlider = $props();
	const state = createRangeSliderState(() => props);

	const restProps = $derived.by(() => {
		const {
			class: _class,
			id: _id,
			label: _label,
			value: _value,
			min: _min,
			max: _max,
			step: _step,
			showValue: _showValue,
			disabled: _disabled,
			description: _description,
			range: _range,
			...rest
		} = props;
		return rest;
	});
</script>

<div class={state.containerClass} data-disabled={state.disabled || undefined}>
	{#if state.label || state.showValue}
		<div class={state.labelContainerClass}>
			{#if state.label}
				<label for={state.id} class={state.labelClass}>
					{state.label}
				</label>
			{/if}
			{#if state.showValue}
				<span class={state.valueDisplayClass}>
					{#if state.isRange && Array.isArray(state.value)}
						{state.value[0]} - {state.value[1]}
					{:else}
						{state.value}
					{/if}
				</span>
			{/if}
		</div>
	{/if}

	<div class={state.trackContainerClass}>
		<div class={state.trackClass}></div>
		<div class={state.fillClass} style={state.fillStyle}></div>

		{#if state.isRange && Array.isArray(state.value)}
			<!-- Range slider with two thumbs -->
			<input
				id={`${state.id}-min`}
				type="range"
				class={state.thumbClass}
				style={`left: ${state.minPercentage}%`}
				value={state.value[0]}
				oninput={(event) => state.updateRange(0, Number((event.target as HTMLInputElement).value))}
				min={state.min}
				max={state.max}
				step={state.step}
				disabled={state.disabled}
				aria-describedby={state.description ? `${state.id}-description` : undefined}
				{...restProps}
			/>
			<input
				id={`${state.id}-max`}
				type="range"
				class={state.thumbClass}
				style={`left: ${state.maxPercentage}%`}
				value={state.value[1]}
				oninput={(event) => state.updateRange(1, Number((event.target as HTMLInputElement).value))}
				min={state.min}
				max={state.max}
				step={state.step}
				disabled={state.disabled}
				aria-describedby={state.description ? `${state.id}-description` : undefined}
				{...restProps}
			/>
		{:else}
			<!-- Single slider -->
			<input
				id={state.id}
				type="range"
				class={state.thumbClass}
				style={`left: ${state.maxPercentage}%`}
				value={state.value}
				oninput={(event) => state.updateSingle(Number((event.target as HTMLInputElement).value))}
				min={state.min}
				max={state.max}
				step={state.step}
				disabled={state.disabled}
				aria-describedby={state.description ? `${state.id}-description` : undefined}
				{...restProps}
			/>
		{/if}
	</div>

	<div class={state.minMaxLabelClass}>
		<span>{state.min}</span>
		<span>{state.max}</span>
	</div>

	{#if state.description}
		<p id={`${state.id}-description`} class={state.descriptionClass}>
			{state.description}
		</p>
	{/if}
</div>

<style>
	:root {
		--range-slider-thumb-size: 1rem;
		--range-slider-thumb-background: var(--color-background-primary);
		--range-slider-thumb-border-color: var(--color-primary-500);
		--range-slider-thumb-shadow: var(--layout-box-shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
	}

	.c-range-slider {
		margin-bottom: 1rem;
	}

	.c-range-slider[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		pointer-events: none;
	}

	.c-range-slider__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.c-range-slider__label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.c-range-slider__value {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.c-range-slider__track-wrap {
		position: relative;
		height: 0.5rem;
	}

	.c-range-slider__track {
		width: 100%;
		height: 0.5rem;
		background: var(--color-border-secondary);
		border-radius: 9999px;
	}

	.c-range-slider__fill {
		position: absolute;
		height: 0.5rem;
		background: var(--color-primary-500);
		border-radius: 9999px;
	}

	.c-range-slider__fill--disabled {
		background: var(--color-border-secondary);
	}

	.c-range-slider__thumb {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		appearance: none;
		width: 100%;
		height: 1.5rem;
		left: 0 !important;
		background: transparent;
		cursor: pointer;
		pointer-events: none;
	}

	.c-range-slider__minmax {
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		margin-top: 0.25rem;
	}

	.c-range-slider__description {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		margin-top: 0.25rem;
	}

	.c-range-slider__thumb::-webkit-slider-thumb {
		appearance: none;
		height: var(--range-slider-thumb-size);
		width: var(--range-slider-thumb-size);
		border-radius: var(--layout-border-radius-full, 9999px);
		background-color: var(--range-slider-thumb-background);
		border: 2px solid var(--range-slider-thumb-border-color);
		box-shadow: var(--layout-box-shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
		cursor: pointer;
		pointer-events: all;
	}

	.c-range-slider__thumb:disabled::-webkit-slider-thumb {
		cursor: not-allowed;
		opacity: var(--opacity-60);
	}

	.c-range-slider__thumb::-moz-range-thumb {
		height: var(--range-slider-thumb-size);
		width: var(--range-slider-thumb-size);
		border-radius: var(--layout-border-radius-full, 9999px);
		background-color: var(--range-slider-thumb-background);
		border: 2px solid var(--range-slider-thumb-border-color);
		box-shadow: var(--layout-box-shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
		cursor: pointer;
		pointer-events: all;
	}

	.c-range-slider__thumb:disabled::-moz-range-thumb {
		cursor: not-allowed;
		opacity: var(--opacity-60);
	}

	.c-range-slider__thumb::-moz-range-track,
	.c-range-slider__thumb::-webkit-slider-runnable-track {
		background-color: transparent;
	}
</style>
