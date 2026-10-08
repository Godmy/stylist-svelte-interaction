<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import DropdownMenu from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'position',
			type: 'select' as TokenControllerType,
			defaultValue: 'left',
			options: ['left', 'right', 'center'],
			description: 'Position of the dropdown menu'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the dropdown is disabled'
		}
	];

	function handleMenuItemClick(action: string, closeDropdown: () => void) {
		console.log(`${action} clicked`);
		closeDropdown();
	}
</script>

<Story
	{controls}
	title="DropdownMenu Component"
	description="A dropdown menu component for displaying action lists"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<DropdownMenu
				label="Options"
				position={controlValues.position}
				disabled={controlValues.disabled}
			>
				{#snippet children({ closeDropdown }: { closeDropdown: () => void })}
					<button class="_c2 _c1" onclick={() => handleMenuItemClick('New', closeDropdown)}>
						New
					</button>
					<button class="_c2 _c1" onclick={() => handleMenuItemClick('Open', closeDropdown)}>
						Open
					</button>
					<button class="_c2 _c1" onclick={() => handleMenuItemClick('Save', closeDropdown)}>
						Save
					</button>
					<hr class="_c3" />
					<button class="_c2 _c1" onclick={() => handleMenuItemClick('Settings', closeDropdown)}>
						Settings
					</button>
					<button class="_c2 _c1" onclick={() => handleMenuItemClick('Help', closeDropdown)}>
						Help
					</button>
				{/snippet}
			</DropdownMenu>
		</div>
	{/snippet}
</Story>

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
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		text-align: left;
		font-size: 0.875rem;
		line-height: 1.25rem;
		transition-property: color, background-color, border-color;
		transition-duration: 150ms;
	}
	._c3 {
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
		border-color: var(--color-border-primary);
	}

	._c1:hover {
		background-color: var(--color-background-secondary);
	}
</style>
