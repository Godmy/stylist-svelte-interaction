<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import CloseButton from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'ghost',
			options: ['default', 'ghost']
		},
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'loading', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={CloseButton}
	title="CloseButton"
	category="Atoms/Interaction/Controls/Buttons"
	description="Small icon-only button for dismiss actions, e.g. closing a modal, dialog, or toast."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<span class="_c2">Notification title</span>
			<CloseButton
				size={values.size as 'sm' | 'md' | 'lg'}
				variant={values.variant as 'default' | 'ghost'}
				disabled={values.disabled as boolean}
				loading={values.loading as boolean}
				aria-label="Close"
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		width: 100%;
		max-width: 22rem;
		border-radius: 0.5rem;
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 0.75rem 0.75rem 0.75rem 1rem;
	}
	._c2 {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
</style>
