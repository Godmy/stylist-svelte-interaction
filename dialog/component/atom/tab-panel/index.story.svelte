<script lang="ts">
	import Tabs from '$stylist/dialog/component/molecule/tabs/index.svelte';
	import TabPanel from '$stylist/dialog/component/atom/tab-panel/index.svelte';
	import TabList from '$stylist/dialog/component/atom/tab-list/index.svelte';
	import Tab from '$stylist/dialog/component/atom/tab/index.svelte';
	import TabPanels from '$stylist/dialog/component/atom/tab-panels/index.svelte';
	import type { RecipeTabPanel } from '$stylist/dialog/interface/recipe/tab-panel';

	// Render of index.story.ts: a TabPanel is shown only when the Tabs context selects its id.
	let {
		selectedId,
		disabledApi
	}: Partial<RecipeTabPanel> & { selectedId?: string; disabledApi?: boolean } = $props();
</script>

<div class="_surface">
	<Tabs {selectedId}>
		<TabList>
			<Tab id="docs">Docs</Tab>
			<Tab id="api" disabled={disabledApi}>API</Tab>
			<Tab id="faq">FAQ</Tab>
		</TabList>
		<TabPanels>
			<TabPanel id="docs">
				<article class="_article">
					<span>Guide</span>
					<h3>Documentation</h3>
					<p>Installation notes, usage rules, and examples for the current package.</p>
				</article>
			</TabPanel>
			<TabPanel id="api">
				<article class="_article">
					<span>Reference</span>
					<h3>API Surface</h3>
					<p>Props, events, snippets, and integration details for implementation work.</p>
				</article>
			</TabPanel>
			<TabPanel id="faq">
				<article class="_article">
					<span>Support</span>
					<h3>Questions</h3>
					<p>Common behavior notes and edge cases discovered during component review.</p>
				</article>
			</TabPanel>
		</TabPanels>
	</Tabs>
</div>

<style>
	._surface {
		max-width: 36rem;
	}

	._article {
		display: grid;
		gap: 0.4rem;
		padding: 1rem;
	}

	._article span {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--color-text-tertiary);
	}

	._article h3,
	._article p {
		margin: 0;
	}

	._article p {
		color: var(--color-text-secondary);
	}
</style>
