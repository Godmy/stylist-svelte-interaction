<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import BurgerMenu from './index.svelte';

	let open = false;

	const sizeOptions = ['sm', 'md', 'lg'];

	const controls: SlotStory[] = [
		{
			name: 'size',
			type: 'select',
			defaultValue: 'md',
			options: sizeOptions,
			description: 'Size of the burger menu'
		},
		{
			name: 'color',
			type: 'color',
			defaultValue: '#1f2937',
			description: 'Color of the burger menu when closed'
		},
		{
			name: 'activeColor',
			type: 'color',
			defaultValue: '#2563eb',
			description: 'Color of the burger menu when open'
		}
	];

	function toggleMenu() {
		open = !open;
	}
</script>

<Story
	id="atoms-burger-menu"
	title="BurgerMenu"
	component={BurgerMenu}
	category="Atoms/Interaction/Controls/Menus"
	description="BurgerMenu component for toggling navigation menus."
	tags={['menu', 'navigation', 'hamburger', 'toggle']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<BurgerMenu
				size={values.size}
				color={values.color}
				activeColor={values.activeColor}
				{open}
				onValueChange={toggleMenu}
			/>
		</div>
	{/snippet}

	{#snippet variants()}
		<div class="_c2">
			<div class="_c3">
				<span>Closed:</span>
				<BurgerMenu open={false} size="md" />
			</div>
			<div class="_c3">
				<span>Open:</span>
				<BurgerMenu open={true} size="md" />
			</div>
			<div class="_c3">
				<span>Small:</span>
				<BurgerMenu open={false} size="sm" />
			</div>
			<div class="_c3">
				<span>Large:</span>
				<BurgerMenu open={false} size="lg" />
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 1rem;
		padding: 1rem;
	}
	._c3 {
		display: flex;
		align-items: center;
	}
	._c3 > * + * {
		margin-left: 1rem;
	}
</style>
