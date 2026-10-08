<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Button from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'Click me' },
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'primary',
			options: ['primary', 'secondary', 'success', 'warning', 'danger', 'outline', 'ghost']
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'loading', type: 'boolean', defaultValue: false },
		{ name: 'block', type: 'boolean', defaultValue: false }
	];

	let clickCount = $state(0);
</script>

<Story
	{controls}
	component={Button}
	title="Button"
	category="Atoms/Interaction/Controls/Buttons"
	description="Base button component. Click it below to see the click count change."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<Button
				variant={values.variant as any}
				size={values.size as 'sm' | 'md' | 'lg'}
				disabled={values.disabled as boolean}
				loading={values.loading as boolean}
				block={values.block as boolean}
				onclick={() => (clickCount += 1)}
			>
				{values.label as string}
			</Button>
			<p class="_c2">Clicked {clickCount} time{clickCount === 1 ? '' : 's'}</p>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
	}
	._c2 {
		margin: 0;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
