<script lang="ts">
	import { PresetDropdownMenu } from '$stylist/menu/const/preset/dropdown-menu';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import { createDropdownMenuState } from '$stylist/menu/function/state/dropdown-menu/index.svelte';
	import type { RecipeDropdownMenu } from '$stylist/menu/interface/recipe/dropdown-menu';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeDropdownMenu = $props();
	const state = createDropdownMenuState(() => props);

	let restProps = $derived.by(() => {
		const { label, position, disabled, class: className, children, ...rest } = props;
		return rest;
	});
</script>

<div class={state.classes} id={state.dropdownId} {...restProps}>
	<div>
		<Button
			variant="ghost"
			class="c-dropdown__trigger"
			aria-expanded={state.isOpen}
			aria-haspopup="true"
			aria-controls="dropdown-menu"
			disabled={props.disabled}
			onclick={state.toggleDropdown}
		>
			{props.label}
			<span class={state.chevronClass} aria-hidden="true">
				<BaseIcon name={PresetDropdownMenu.ChevronDown} size={16} aria-hidden="true" />
			</span>
		</Button>
	</div>

	{#if state.isOpen}
		<div
			id="dropdown-menu"
			class={state.menuClasses}
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<div class="c-dropdown__content" role="none">
				{#if props.children}
					{@render props.children({ closeDropdown: state.closeDropdown })}
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.c-dropdown {
		position: relative;
		display: inline-block;
		text-align: left;
	}

	.c-dropdown__menu {
		position: absolute;
		z-index: 10;
		min-width: var(--size-14rem, 14rem);
		margin-top: var(--spacing-2, 0.5rem);
		padding: var(--spacing-1, 0.25rem) 0;
		background: var(--color-background-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -2px rgba(0, 0, 0, 0.1);
	}

	.c-dropdown__menu--left {
		left: 0;
	}

	.c-dropdown__menu--right {
		right: 0;
	}

	.c-dropdown__menu--center {
		left: 50%;
		transform: translateX(-50%);
	}

	.c-dropdown__trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-1, 0.25rem);
	}

	.c-dropdown__content {
		padding: var(--spacing-1, 0.25rem) 0;
	}

	.c-dropdown__chevron {
		margin-left: var(--spacing-1, 0.25rem);
		transition: transform var(--duration-200, 200ms) var(--animation-ease-in-out, ease-in-out);
		display: inline-flex;
		align-items: center;
	}

	.c-dropdown__chevron--open {
		transform: rotate(180deg);
	}
</style>
