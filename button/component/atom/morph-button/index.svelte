<script lang="ts">
	import AnimatedButton from '$stylist/button/component/atom/animated-button/index.svelte';
	import type { RecipeMorphButton } from '$stylist/button/interface/recipe/morph-button';
	let {
		state = 'idle',
		children,
		loadingLabel = 'Отправляем…',
		successLabel = 'Заявка отправлена',
		errorLabel = 'Повторить отправку',
		...rest
	}: RecipeMorphButton = $props();
</script>

<span class="morph-button" data-state={state} data-block={rest.block || undefined}>
	<AnimatedButton
		{...rest}
		effect="morph"
		loading={state === 'loading'}
		disabled={rest.disabled || state === 'success'}
	>
		{#key state}
			<span class="morph-button__label">
				{#if state === 'loading'}{loadingLabel}
				{:else if state === 'success'}{successLabel} <span aria-hidden="true">✓</span>
				{:else if state === 'error'}{errorLabel}
				{:else}{@render children?.()}{/if}
			</span>
		{/key}
	</AnimatedButton>
	<span class="morph-button__status" role="status" aria-live="polite" aria-atomic="true">
		{state === 'loading'
			? loadingLabel
			: state === 'success'
				? successLabel
				: state === 'error'
					? errorLabel
					: ''}
	</span>
</span>

<style>
	.morph-button {
		display: inline-grid;
		max-width: 100%;
		min-width: min(15rem, 100%);
	}
	.morph-button[data-block] {
		width: 100%;
	}
	.morph-button[data-state='success'] {
		--button-background: #246047;
	}
	.morph-button[data-state='error'] {
		--button-background: #943b32;
	}
	.morph-button__label {
		display: inline-block;
		animation: morph-label 180ms ease-out;
	}
	.morph-button__status {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	@keyframes morph-label {
		from {
			opacity: 0;
			transform: translateY(3px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.morph-button__label {
			animation: none;
		}
	}
</style>
