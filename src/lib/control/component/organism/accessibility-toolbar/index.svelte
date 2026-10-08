<script lang="ts">
	import { PresetAccessibilityToolbar } from '$stylist/control/const/preset/accessibility-toolbar';
	import { createAccessibilityToolbarState } from './state.svelte';
	import type { RecipeAccessibilityToolbar } from '$stylist/control/interface/recipe/accessibility-toolbar';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeAccessibilityToolbar = $props();
	const state = createAccessibilityToolbarState(() => props);
</script>

<div class={state.containerClass} {...state.restProps}>
	<div class={state.toolbarClass}>
		{#if state.showFontSizeControls}
			<button
				type="button"
				class={state.buttonClass}
				aria-label="Decrease font size"
				onclick={state.decreaseFontSize}
			>
				<BaseIcon name={PresetAccessibilityToolbar.Minus} size={20} />
			</button>

			<span class={state.fontSizeDisplayClass}>{Math.round(state.fontSizeScale * 100)}%</span>

			<button
				type="button"
				class={state.buttonClass}
				aria-label="Increase font size"
				onclick={state.increaseFontSize}
			>
				<BaseIcon name={PresetAccessibilityToolbar.Plus} size={20} />
			</button>
		{/if}

		{#if state.showScreenReaderTester}
			<button
				type="button"
				class={[state.buttonClass, state.screenReaderMode ? state.activeButtonClass : '']
					.filter(Boolean)
					.join(' ')}
				aria-label={state.screenReaderMode
					? 'Disable screen reader tester'
					: 'Enable screen reader tester'}
				aria-pressed={state.screenReaderMode}
				onclick={state.toggleScreenReaderMode}
			>
				<BaseIcon name={PresetAccessibilityToolbar.Volume2} size={20} />
			</button>
		{/if}

		{#if state.showFocusIndicatorToggle}
			<button
				type="button"
				class={[state.buttonClass, state.focusIndicator ? state.activeButtonClass : '']
					.filter(Boolean)
					.join(' ')}
				aria-label={state.focusIndicator ? 'Hide focus indicators' : 'Show focus indicators'}
				aria-pressed={state.focusIndicator}
				onclick={state.toggleFocusIndicator}
			>
				<BaseIcon name={PresetAccessibilityToolbar.Eye} size={20} />
			</button>
		{/if}

		{#if state.showAnimationToggle}
			<button
				type="button"
				class={[state.buttonClass, state.disableTokenAnimation ? state.activeButtonClass : '']
					.filter(Boolean)
					.join(' ')}
				aria-label={state.disableTokenAnimation ? 'Enable animations' : 'Reduce animations'}
				aria-pressed={state.disableTokenAnimation}
				onclick={state.toggleTokenAnimation}
			>
				<BaseIcon name={PresetAccessibilityToolbar.Grid} size={20} />
			</button>
		{/if}

		<button type="button" class={state.buttonClass} aria-label="Accessibility settings">
			<BaseIcon
				name={PresetAccessibilityToolbar.Accessibility}
				size={20}
			/>
		</button>
	</div>
</div>

<style>
	.c-a11y-toolbar {
		display: flex;
		align-items: center;
	}

	.c-a11y-toolbar__bar {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
	}

	.c-a11y-toolbar__btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.375rem;
		background: transparent;
		border: none;
		cursor: pointer;
		color: var(--color-text-primary);
		transition:
			background-color var(--motion-duration-120, 120ms),
			color var(--motion-duration-120, 120ms);
	}

	.c-a11y-toolbar__btn:hover {
		background: var(--color-background-secondary);
	}

	.c-a11y-toolbar__btn:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: -1px;
	}

	.c-a11y-toolbar__btn--active {
		background: var(--color-primary-100);
		color: var(--color-primary-700);
	}

	.c-a11y-toolbar__btn--active:hover {
		background: var(--color-primary-200);
	}

	.c-a11y-toolbar__font-size {
		padding: 0 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		min-width: 3rem;
		text-align: center;
		color: var(--color-text-primary);
	}
</style>
