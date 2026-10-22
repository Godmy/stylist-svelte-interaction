<script lang="ts">
	import Tabs from '$stylist/dialog/component/molecule/tabs/index.svelte';
	import Tab from '$stylist/dialog/component/atom/tab/index.svelte';
	import TabList from '$stylist/dialog/component/atom/tab-list/index.svelte';
	import TabPanels from '$stylist/dialog/component/atom/tab-panels/index.svelte';
	import TabPanel from '$stylist/dialog/component/atom/tab-panel/index.svelte';
	import type { RecipeTab } from '$stylist/dialog/interface/recipe/tab';

	// Render of index.story.ts: a Tab only works inside a Tabs context next to sibling tabs and panels.
	let { selectedId, size, variant, disabled }: Partial<RecipeTab> & { selectedId?: string } =
		$props();
</script>

<div class="_surface">
	<div class="_copy">
		<p class="_label">Focus</p>
		<h3>Tab item states</h3>
		<p>Use this story to inspect selected, inactive, and disabled button behavior.</p>
	</div>
	<Tabs {selectedId} {size} {variant}>
		<TabList>
			<Tab id="overview">Selected</Tab>
			<Tab id="activity">Inactive</Tab>
			<Tab id="settings" {disabled}>Disabled</Tab>
		</TabList>
		<TabPanels>
			<TabPanel id="overview">The selected tab should be visually dominant.</TabPanel>
			<TabPanel id="activity">Inactive tabs remain available and readable.</TabPanel>
			<TabPanel id="settings">Disabled tabs should not accept selection.</TabPanel>
		</TabPanels>
	</Tabs>
</div>

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
</style>
