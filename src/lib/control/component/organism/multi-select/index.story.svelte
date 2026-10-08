<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import MultiSelect from './index.svelte';

	const options = [
		{ value: 'react', label: 'React' },
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'angular', label: 'Angular' },
		{ value: 'solid', label: 'Solid' }
	];

	type Props = {
		disabled: boolean;
		searchable: boolean;
		maxSelections: number;
		placeholder: string;
	};

	const controls: SlotStory[] = [
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'searchable', type: 'boolean', defaultValue: true },
		{ name: 'maxSelections', type: 'number', defaultValue: 0, min: 0, max: 5, step: 1 },
		{ name: 'placeholder', type: 'text', defaultValue: 'Select options...' }
	];
</script>

<Story
	id="organisms-multi-select"
	title="Organisms / Interaction / Controls / Multi Select"
	component={MultiSelect}
	category="Organisms/Interaction/Controls"
	description="Multi-selection control with searchable dropdown."
	{controls}
>
	{#snippet children(values: any)}
		{@const typedProps = values as Props}
		<div class="sb-organisms-multi-select _c1">
			<div class="_c2">
				<MultiSelect
					{options}
					disabled={typedProps.disabled}
					searchable={typedProps.searchable}
					maxSelections={typedProps.maxSelections}
					placeholder={typedProps.placeholder}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		max-width: 28rem;
	}
</style>
