<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import TagInput from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'placeholder',
			type: 'text',
			defaultValue: 'Enter tags...'
		},
		{
			name: 'disabled',
			type: 'boolean',
			defaultValue: false
		},
		{
			name: 'maxTags',
			type: 'number',
			defaultValue: 0
		},
		{
			name: 'delimiter',
			type: 'text',
			defaultValue: ','
		}
	];

	let currentTags = $state<string[]>(['svelte', 'design-system']);

	function handleInputChange(tags: string[]) {
		currentTags = tags;
	}
</script>

<Story
	id="organisms-tag-input"
	title="Organisms / Interaction / Input / Tag Input"
	component={TagInput}
	category="Organisms/Interaction/Input"
	description="A tag input component for managing tags."
	tags={['input', 'tags', 'multiselect']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<div class="_c2">
				<span>Tags: {currentTags.length}</span>
				<span>{currentTags.join(', ') || 'none'}</span>
			</div>
			<TagInput
				tags={currentTags}
				placeholder={values.placeholder}
				disabled={values.disabled}
				maxTags={values.maxTags}
				delimiter={values.delimiter}
				onChange={handleInputChange as any}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 0.75rem;
		max-width: 36rem;
		padding: 1rem;
	}
	._c2 {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
