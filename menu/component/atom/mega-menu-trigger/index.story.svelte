<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import MegaMenuTrigger from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Экскурсии',
			description: 'Trigger text'
		},
		{
			name: 'active',
			type: 'boolean',
			defaultValue: false,
			description: 'Section contains the current page (underline + accent colour)'
		},
		{
			name: 'disabled',
			type: 'boolean',
			defaultValue: false,
			description: 'Disable the trigger'
		}
	];

	let open = $state(false);
	let selected = $state('tours');
</script>

<Story
	id="atoms-mega-menu-trigger"
	title="MegaMenuTrigger"
	category="Atoms/Interaction/Navigation"
	description="Top-level disclosure button of a mega menu with a rotating chevron, aria-expanded and aria-controls."
	tags={['mega-menu', 'trigger', 'button', 'disclosure']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<MegaMenuTrigger
				label={values.label}
				active={values.active}
				disabled={values.disabled}
				{open}
				controls="mega-trigger-demo-panel"
				onclick={() => (open = !open)}
			/>
			<span class="_c2">aria-expanded = {open}</span>
		</div>
	{/snippet}

	{#snippet variants()}
		<div class="_c3">
			{#each [['excursions', 'Экскурсии'], ['tours', 'Туры'], ['destinations', 'Направления'], ['info', 'Туристам']] as [id, label]}
				<MegaMenuTrigger
					{label}
					open={selected === id}
					active={id === 'excursions'}
					onclick={() => (selected = selected === id ? '' : id)}
				/>
			{/each}
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	}

	._c2 {
		font-family: var(--font-mono, monospace);
		font-size: 0.8125rem;
		color: var(--color-text-secondary, #64748b);
	}

	._c3 {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		padding: 0.5rem;
		border-bottom: 1px solid var(--color-border-primary, #e2e8f0);
	}
</style>
