<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import AutoComplete from './index.svelte';
	import type { AutoCompleteOption } from '$stylist/search/type/object/auto-complete-option';

	const controls: SlotStory[] = [
		{
			name: 'placeholder',
			type: 'text',
			defaultValue: 'Type to search...'
		},
		{
			name: 'showAllSuggestions',
			type: 'boolean',
			defaultValue: true
		},
		{
			name: 'debounce',
			type: 'number',
			defaultValue: 300
		}
	];

	const options: AutoCompleteOption[] = [
		{ id: '1', label: 'Apple', value: 'apple', meta: 'Fruit' },
		{ id: '2', label: 'Banana', value: 'banana', meta: 'Tropical Fruit' },
		{ id: '3', label: 'Cherry', value: 'cherry', meta: 'Stone Fruit' },
		{ id: '4', label: 'Date', value: 'date', meta: 'Desert Fruit' },
		{ id: '5', label: 'Elderberry', value: 'elderberry', meta: 'Berry' },
		{ id: '6', label: 'Fig', value: 'fig', meta: 'Common Fig' },
		{ id: '7', label: 'Grape', value: 'grape', meta: 'Small Fruit' },
		{ id: '8', label: 'Honeydew', value: 'honeydew', meta: 'Melon' }
	];

	let currentValue = $state('');
	let selectedLabel = $state('');

	function handleInput(value: string) {
		currentValue = value;
	}

	function handleSelect(option: AutoCompleteOption) {
		selectedLabel = option.label;
	}
</script>

<Story
	id="organisms-auto-complete"
	title="Organisms / Interaction / Input / Auto Complete"
	component={AutoComplete}
	category="Organisms/Interaction/Input"
	description="An auto-complete input component with suggestions."
	tags={['input', 'autocomplete', 'search']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<div class="_c2">
				<span>Current value: {currentValue || 'none'}</span>
				<span>Selected: {selectedLabel || 'none'}</span>
			</div>
			<AutoComplete
				{options}
				placeholder={values.placeholder}
				showAllSuggestions={values.showAllSuggestions}
				debounce={values.debounce}
				onInput={handleInput}
				onSelect={handleSelect}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 0.75rem;
		max-width: 28rem;
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
