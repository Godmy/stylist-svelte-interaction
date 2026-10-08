<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Tabs from '$stylist/dialog/component/molecule/tabs/index.svelte';
	import TabPanel from './index.svelte';
	import TabList from '../tab-list/index.svelte';
	import Tab from '../tab/index.svelte';
	import TabPanels from '../tab-panels/index.svelte';

	const controls: SlotStory[] = [
		{ name: 'selectedId', type: 'select', defaultValue: 'docs', options: ['docs', 'api', 'faq'] },
		{ name: 'disabledApi', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={TabPanel}
	title="TabPanel"
	description="Single content panel that becomes visible when its id matches the selected Tab."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_surface">
			<Tabs selectedId={values.selectedId}>
				<TabList class="_list">
					<Tab id="docs">Docs</Tab>
					<Tab id="api" disabled={values.disabledApi}>API</Tab>
					<Tab id="faq">FAQ</Tab>
				</TabList>
				<TabPanels class="_panels">
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
	{/snippet}
</Story>

<style>
	._surface {
		max-width: 36rem;
	}

	._list {
		margin-bottom: 0.75rem;
	}

	._panels {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
		padding: 0;
		overflow: hidden;
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
