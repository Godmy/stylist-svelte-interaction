<script lang="ts">
	import type { RecipeStepper } from '$stylist/dialog/interface/recipe/stepper';
	import createStepperState from './state.svelte';

	let props: RecipeStepper = $props();
	const state = createStepperState(() => props);
</script>

<div class={`${props.class ?? ''} ${state.orientationClass} _c1`} {...props}>
	{#each props.steps as step, index}
		<div
			class={`${props.orientation === 'vertical' ? 'stepper--vertical' : 'stepper--horizontal'} _c2`}
		>
			<!-- Step item -->
			<div
				class={`${props.orientation === 'vertical' ? 'stepper__item--row' : 'stepper__item--col'} _c3`}
			>
				<button
					type="button"
					class={`${state.getStepCircleClass(step.status)} ${props.stepClass ?? ''} ${step.onClick ? 'stepper__step--clickable' : 'stepper__step--static'} _c4`}
					onclick={() => step.onClick?.()}
					aria-current={step.status === 'current' ? 'step' : undefined}
				>
					{#if step.status === 'completed'}
						<svg
							style="width:1.25rem;height:1.25rem"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							></path>
						</svg>
					{:else}
						{index + 1}
					{/if}
				</button>

				<div
					class={`${props.orientation === 'vertical' ? 'stepper__label--no-top' : 'stepper__label--top'} ${props.labelClass ?? ''} _c5`}
				>
					<span class={`${state.getStepLabelClass(step.status)} _c6`}>
						{step.title}
					</span>
					{#if step.description}
						<p
							class={`${props.descriptionClass ?? ''} ${state.getStepDescriptionClass(step.status)} _c7`}
						>
							{step.description}
						</p>
					{/if}
				</div>
			</div>

			<!-- Connector -->
			{#if index < props.steps.length - 1}
				<div
					class={`${props.orientation === 'horizontal' ? 'stepper__connector--h' : 'stepper__connector--v'} ${state.getConnectorClass(props.steps, index)} ${props.connectorClass ?? ''}`}
				></div>
			{/if}
		</div>
	{/each}
</div>

<style>
	._c1 {
		width: 100%;
	}

	._c2 {
		display: flex;
	}

	._c3 {
		display: flex;
		align-items: center;
	}

	._c4 {
		display: flex;
		height: 2.5rem;
		width: 2.5rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border-width: 2px;
		border-style: solid;
	}

	._c5 {
		margin-left: 0.75rem;
		text-align: left;
	}

	._c6 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
	}

	._c7 {
		font-size: 0.75rem;
		line-height: 1rem;
	}

	.stepper--vertical {
		flex-direction: column;
	}
	.stepper--horizontal {
		align-items: center;
	}
	.stepper--row {
		display: flex;
	}
	.stepper--col {
		display: flex;
		flex-direction: column;
	}
	.stepper__circle {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		border-width: 2px;
		border-style: solid;
		background-color: var(--color-background-primary);
		border-color: var(--color-border-primary);
		color: var(--color-text-secondary);
	}
	.stepper__circle--completed {
		background-color: var(--color-primary-500);
		border-color: var(--color-primary-500);
		color: var(--color-text-inverse);
	}
	.stepper__circle--current {
		background-color: var(--color-background-primary);
		border-color: var(--color-primary-500);
		color: var(--color-primary-500);
	}
	.stepper__label-text {
		color: var(--color-text-secondary);
	}
	.stepper__label-text--current {
		color: var(--color-primary-600);
	}
	.stepper__label-text--completed {
		color: var(--color-text-primary);
	}
	.stepper__description {
		color: var(--color-text-tertiary);
	}
	.stepper__description--current {
		color: var(--color-primary-600);
	}
	.stepper__description--completed {
		color: var(--color-text-secondary);
	}
	.stepper__connector--completed {
		background-color: var(--color-primary-500);
	}
	.stepper__item--row {
		flex-direction: row;
	}
	.stepper__item--col {
		flex-direction: column;
	}
	.stepper__step--clickable {
		cursor: pointer;
		flex-shrink: 0;
	}
	.stepper__step--static {
		cursor: default;
		flex-shrink: 0;
	}
	.stepper__label--no-top {
		margin-top: 0;
	}
	.stepper__label--top {
		margin-top: 0.5rem;
	}
	.stepper__connector--h {
		margin-left: 1rem;
		margin-right: 1rem;
		height: 0.125rem;
		width: 100%;
		flex-grow: 1;
		background-color: var(--color-background-tertiary);
	}
	.stepper__connector--v {
		margin-top: 1rem;
		margin-left: 1rem;
		height: 100%;
		width: 0.125rem;
		background-color: var(--color-background-tertiary);
	}
</style>
