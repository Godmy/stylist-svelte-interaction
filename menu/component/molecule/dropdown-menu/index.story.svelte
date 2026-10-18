<script lang="ts">
	// Render of index.story.ts: the menu items close the dropdown through the closeDropdown argument of the children snippet.
	import DropdownMenu from './index.svelte';
	import type { RecipeDropdownMenu } from '$stylist/menu/interface/recipe/dropdown-menu';

	let args: RecipeDropdownMenu = $props();

	function handleMenuItemClick(action: string, closeDropdown: () => void) {
		console.log(`${action} clicked`);
		closeDropdown();
	}
</script>

<div class="_c1">
	<DropdownMenu {...args}>
		{#snippet children({ closeDropdown }: { closeDropdown: () => void })}
			<button class="_c2" onclick={() => handleMenuItemClick('New', closeDropdown)}>New</button>
			<button class="_c2" onclick={() => handleMenuItemClick('Open', closeDropdown)}>Open</button>
			<button class="_c2" onclick={() => handleMenuItemClick('Save', closeDropdown)}>Save</button>
			<hr class="_c3" />
			<button class="_c2" onclick={() => handleMenuItemClick('Settings', closeDropdown)}>
				Settings
			</button>
			<button class="_c2" onclick={() => handleMenuItemClick('Help', closeDropdown)}>Help</button>
		{/snippet}
	</DropdownMenu>
</div>

<style>
	._c1 {
		display: flex;
		height: 10rem;
		align-items: center;
		justify-content: center;
	}

	._c2 {
		display: block;
		width: 100%;
		padding: 0.5rem 1rem;
		text-align: left;
		font-size: 0.875rem;
		line-height: 1.25rem;
		transition-property: color, background-color, border-color;
		transition-duration: 150ms;
	}

	._c2:hover {
		background-color: var(--color-background-secondary);
	}

	._c3 {
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
		border-color: var(--color-border-primary);
	}
</style>
