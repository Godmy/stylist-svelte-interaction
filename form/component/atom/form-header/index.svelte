<script lang="ts">
	import type { RecipeFormHeader } from '$stylist/form/interface/recipe/form-header';
	import { createFormHeaderState } from './state.svelte';

	let {
		title,
		subtitle,
		description,
		actions,
		backAction,
		backButtonLabel = 'Back',
		class: className = '',
		titleClass = '',
		subtitleClass = '',
		descriptionClass = '',
		actionsClass = '',
		backButtonClass = '',
		...restProps
	}: RecipeFormHeader = $props();

	const state = createFormHeaderState({
		title,
		subtitle,
		description,
		actions,
		backAction,
		backButtonLabel,
		class: className,
		titleClass,
		subtitleClass,
		descriptionClass,
		actionsClass,
		backButtonClass
	});
</script>

<div class={state.rootClass} {...restProps}>
	<div class="form-header-top">
		<div>
			<div class="form-header-title-row">
				{#if backAction}
					<button
						type="button"
						class={state.backButtonClass}
						onclick={backAction}
						aria-label={backButtonLabel}
					>
						<svg
							class="form-header-back-icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				{/if}
				<h1 class={state.titleClass}>{title}</h1>
			</div>

			{#if subtitle}
				<p class={state.subtitleClass}>{subtitle}</p>
			{/if}
		</div>

		{#if actions}
			<div class={state.actionsClass}>
				{@render actions()}
			</div>
		{/if}
	</div>

	{#if description}
		<p class={state.descriptionClass}>{description}</p>
	{/if}
</div>

<style>
	.form-header-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.form-header-title-row {
		display: flex;
		align-items: center;
	}

	.form-header-back-icon {
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
