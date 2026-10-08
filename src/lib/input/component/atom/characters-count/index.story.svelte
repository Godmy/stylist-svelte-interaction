<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import CharacterCount from './index.svelte';

	let draft = $state('The quick brief for a new onboarding screen.');

	const controls: SlotStory[] = [
		{ name: 'max', type: 'number', defaultValue: 120, min: 1, max: 500, step: 1 },
		{ name: 'showPercentage', type: 'boolean', defaultValue: true },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={CharacterCount}
	title="CharactersCount"
	description="Character progress indicator for text fields."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<textarea
				class="_c2"
				bind:value={draft}
				maxlength={values.max}
				disabled={values.disabled}
				rows="4"
			></textarea>
			<CharacterCount
				current={draft.length}
				max={values.max}
				showPercentage={values.showPercentage}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 0.5rem;
		max-width: 32rem;
	}
	._c2 {
		width: 100%;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		padding: 0.75rem;
		font: inherit;
		resize: vertical;
	}
</style>
