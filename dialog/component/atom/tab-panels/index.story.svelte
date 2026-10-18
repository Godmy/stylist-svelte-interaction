<script lang="ts">
	import Tabs from '$stylist/dialog/component/molecule/tabs/index.svelte';
	import TabPanels from './index.svelte';
	import TabList from '../tab-list/index.svelte';
	import Tab from '../tab/index.svelte';
	import TabPanel from '../tab-panel/index.svelte';
	import type { RecipeTabPanels } from '$stylist/dialog/interface/recipe/tab-panels';

	// Render of index.story.ts: TabPanels needs a Tabs context with a tab list and TabPanel children.
	let { selectedId, ...args }: RecipeTabPanels & { selectedId?: string } = $props();
</script>

<div class="_surface">
	<Tabs {selectedId}>
		<TabList>
			<Tab id="summary">Summary</Tab>
			<Tab id="files">Files</Tab>
			<Tab id="logs">Logs</Tab>
		</TabList>
		<TabPanels {...args}>
			<TabPanel id="summary">
				<div class="_summary">
					<div>
						<span>Health</span>
						<strong>Stable</strong>
					</div>
					<div>
						<span>Version</span>
						<strong>2.8.1</strong>
					</div>
				</div>
			</TabPanel>
			<TabPanel id="files">
				<ul class="_files">
					<li>release-notes.md</li>
					<li>component-map.json</li>
					<li>tabs-preview.png</li>
				</ul>
			</TabPanel>
			<TabPanel id="logs">
				<pre class="_logs">00:10 stories updated
00:11 indexes generated
00:15 checks completed</pre>
			</TabPanel>
		</TabPanels>
	</Tabs>
</div>

<style>
	._surface {
		max-width: 38rem;
	}

	._summary {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
	}

	._summary div {
		display: grid;
		gap: 0.35rem;
		padding: 0.85rem;
		border-radius: 0.5rem;
		background: var(--color-background-secondary);
	}

	._summary span {
		color: var(--color-text-secondary);
	}

	._files {
		display: grid;
		gap: 0.45rem;
		margin: 0;
		padding-left: 1.2rem;
		color: var(--color-text-secondary);
	}

	._logs {
		margin: 0;
		white-space: pre-wrap;
		color: var(--color-text-secondary);
		font: inherit;
	}

	@media (max-width: 640px) {
		._summary {
			grid-template-columns: 1fr;
		}
	}
</style>
