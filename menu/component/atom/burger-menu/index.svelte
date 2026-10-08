<script lang="ts">
	import type { RecipeBurgerMenu } from '$stylist/menu/interface/recipe/burger-menu';
	import { createBurgerMenuState } from '$stylist/menu/function/state/burger-menu/index.svelte';

	let props: RecipeBurgerMenu = $props();
	const state = createBurgerMenuState(() => props);
</script>

<button
	class={['c-burger-menu', props.class].filter(Boolean).join(' ')}
	data-open={state.open || undefined}
	type="button"
	aria-label={state.ariaLabel}
	aria-expanded={state.open}
	onclick={state.toggle}
	{...state.restProps}
>
	<span class="c-burger-menu__bar"></span>
	<span class="c-burger-menu__bar"></span>
	<span class="c-burger-menu__bar"></span>
</button>

<style>
	.c-burger-menu {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 1.5rem;
		height: 1.125rem;
		cursor: pointer;
		background: none;
		border: none;
		padding: 0;
	}

	.c-burger-menu__bar {
		display: block;
		height: 2px;
		width: 100%;
		background: var(--color-text-primary);
		border-radius: 1px;
		transition:
			transform var(--duration-200, 200ms),
			opacity var(--duration-200, 200ms);
	}

	.c-burger-menu[data-open] .c-burger-menu__bar:nth-child(1) {
		transform: translateY(0.5625rem) rotate(45deg);
	}

	.c-burger-menu[data-open] .c-burger-menu__bar:nth-child(2) {
		opacity: 0;
	}

	.c-burger-menu[data-open] .c-burger-menu__bar:nth-child(3) {
		transform: translateY(-0.5625rem) rotate(-45deg);
	}
</style>
