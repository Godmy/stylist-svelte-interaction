<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Tabs from '$stylist/dialog/component/molecule/tabs/index.svelte';
	import Tab from './index.svelte';
	import TabList from '../tab-list/index.svelte';
	import TabPanels from '../tab-panels/index.svelte';
	import TabPanel from '../tab-panel/index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'selectedId',
			type: 'select',
			defaultValue: 'overview',
			options: ['overview', 'activity', 'settings']
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'primary',
			options: ['primary', 'secondary', 'ghost', 'outline']
		},
		{ name: 'disableSettings', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={Tab}
	title="Tab"
	description="Button-level states for one item inside a Tabs context."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_surface">
			<div class="_copy">
				<p class="_label">Focus</p>
				<h3>Tab item states</h3>
				<p>Use this story to inspect selected, inactive, and disabled button behavior.</p>
			</div>
			<Tabs selectedId={values.selectedId} size={values.size} variant={values.variant}>
				<TabList class="_list">
					<Tab id="overview">Selected</Tab>
					<Tab id="activity">Inactive</Tab>
					<Tab id="settings" disabled={values.disableSettings}>Disabled</Tab>
				</TabList>
				<TabPanels class="_panel">
					<TabPanel id="overview">The selected tab should be visually dominant.</TabPanel>
					<TabPanel id="activity">Inactive tabs remain available and readable.</TabPanel>
					<TabPanel id="settings">Disabled tabs should not accept selection.</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	{/snippet}
</Story>

<style>
	._surface {
		display: grid;
		gap: 1rem;
		max-width: 34rem;
	}

	._copy {
		display: grid;
		gap: 0.25rem;
	}

	._copy h3,
	._copy p {
		margin: 0;
	}

	._label {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--color-text-tertiary);
	}

	._list {
		width: fit-content;
		padding: 0.35rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-secondary);
	}

	._panel {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
		padding: 0.85rem;
		color: var(--color-text-secondary);
	}
</style>
