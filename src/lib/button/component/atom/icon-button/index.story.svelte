<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import IconButton from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'ghost',
			options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost']
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'loading', type: 'boolean', defaultValue: false },
		{ name: 'label', type: 'text', defaultValue: 'Open settings' },
		{
			name: 'icon',
			type: 'select',
			defaultValue: 'settings',
			options: ['settings', 'search', 'trash', 'x', 'check', 'plus']
		}
	];

	let clickCount = $state(0);
</script>

<Story
	{controls}
	component={IconButton}
	title="IconButton"
	category="Atoms/Interaction/Controls/Buttons"
	description="Compact icon-only action button. Requires an `icon` (string name or Snippet); without one it renders as an empty box, so always pass one."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<IconButton
				variant={values.variant as any}
				size={values.size as 'sm' | 'md' | 'lg'}
				disabled={values.disabled as boolean}
				loading={values.loading as boolean}
				ariaLabel={values.label as string}
				icon={values.icon as string}
				onclick={() => (clickCount += 1)}
			/>
			<span class="_c2">{values.label as string}</span>
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
