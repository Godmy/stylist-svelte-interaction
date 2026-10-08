<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import SplitButton from './index.svelte';

	let lastAction = $state('none yet');

	const items = [
		{ label: 'Duplicate', onClick: () => (lastAction = 'Duplicate') },
		{ label: 'Archive', onClick: () => (lastAction = 'Archive') },
		{ label: 'Delete', onClick: () => (lastAction = 'Delete'), disabled: true }
	];

	const controls: SlotStory[] = [
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'primary',
			options: ['primary', 'secondary', 'success', 'warning', 'danger', 'outline', 'ghost']
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'primaryLabel', type: 'text', defaultValue: 'Action' }
	];
</script>

<Story
	{controls}
	component={SplitButton}
	title="SplitButton"
	category="Atoms/Interaction/Controls/Buttons"
	description="Primary action button with a chevron toggle that opens a dropdown menu of secondary actions. Click the chevron to open the menu, or the main button to trigger the primary action."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<SplitButton
				variant={values.variant as any}
				size={values.size as 'sm' | 'md' | 'lg'}
				disabled={values.disabled as boolean}
				{items}
				primaryAction={() => (lastAction = 'Action')}
				primaryLabel={values.primaryLabel as string}
			/>
			<p class="_c2">Last action: {lastAction}</p>
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
