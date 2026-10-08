<script lang="ts">
	import type { SlotComboboxItem } from '$stylist/control/interface/slot/combobox-item';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import Combobox from './index.svelte';

	const items: SlotComboboxItem[] = [
		{ id: 'stripe', label: 'Stripe', description: 'Card payments and billing', meta: 'Finance' },
		{ id: 'linear', label: 'Linear', description: 'Issue tracking for product teams', meta: 'Ops' },
		{ id: 'github', label: 'GitHub', description: 'Code hosting and pull requests', meta: 'Dev' },
		{ id: 'figma', label: 'Figma', description: 'Design files and prototypes', meta: 'Design' },
		{ id: 'notion', label: 'Notion', description: 'Workspace docs and databases', meta: 'Docs' },
		{ id: 'slack', label: 'Slack', description: 'Team communication channels', meta: 'Chat' }
	];

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'Integration' },
		{ name: 'description', type: 'text', defaultValue: 'Search services by name, domain, or use case.' },
		{ name: 'placeholder', type: 'text', defaultValue: 'Search integrations...' },
		{
			name: 'value',
			type: 'select',
			defaultValue: '',
			options: ['', 'stripe', 'linear', 'github', 'figma', 'notion', 'slack']
		},
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'clearable', type: 'boolean', defaultValue: true },
		{ name: 'loading', type: 'boolean', defaultValue: false },
		{ name: 'emptyText', type: 'text', defaultValue: 'No integrations found' }
	];
</script>

<Story
	id="molecules-combobox"
	title="Molecules / Interaction / Controls / Combobox"
	component={Combobox}
	category="Molecules/Interaction/Controls"
	description="Searchable combobox for selecting an integration from a practical list."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<Combobox
				id="demo-combobox"
				label={values.label as string}
				description={values.description as string}
				{items}
				value={(values.value as string) || undefined}
				placeholder={values.placeholder as string}
				disabled={values.disabled as boolean}
				clearable={values.clearable as boolean}
				loading={values.loading as boolean}
				emptyText={values.emptyText as string}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		max-width: 30rem;
		padding: 2rem;
	}
	._c1 > * + * {
		margin-top: 1rem;
	}
</style>
