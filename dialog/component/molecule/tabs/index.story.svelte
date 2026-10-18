<script lang="ts">
	import Tabs from './index.svelte';
	import TabList from '$stylist/dialog/component/atom/tab-list/index.svelte';
	import Tab from '$stylist/dialog/component/atom/tab/index.svelte';
	import TabPanel from '$stylist/dialog/component/atom/tab-panel/index.svelte';
	import TabPanels from '$stylist/dialog/component/atom/tab-panels/index.svelte';
	import type { RecipeTabs } from '$stylist/dialog/interface/recipe/tabs';

	// Render of index.story.ts: Tabs is a compound component that needs TabList, Tab and TabPanel children.
	let args: RecipeTabs = $props();
</script>

<div class="_showcase">
	<div class="_toolbar">
		<div>
			<p class="_eyebrow">Workspace</p>
			<h3 class="_title">Release Control</h3>
		</div>
		<span class="_status">Live</span>
	</div>

	<Tabs {...args} class="_tabs">
		<TabList>
			<Tab id="overview">Overview</Tab>
			<Tab id="activity">Activity</Tab>
			<Tab id="settings">Settings</Tab>
		</TabList>
		<TabPanels>
			<TabPanel id="overview">
				<div class="_panelGrid">
					<div class="_metric">
						<span>Readiness</span>
						<strong>92%</strong>
					</div>
					<div class="_metric">
						<span>Open Tasks</span>
						<strong>14</strong>
					</div>
					<div class="_metric">
						<span>Owners</span>
						<strong>6</strong>
					</div>
				</div>
			</TabPanel>
			<TabPanel id="activity">
				<ol class="_timeline">
					<li>Design tokens reviewed by platform team</li>
					<li>Playground stories refreshed for tab components</li>
					<li>Accessibility pass scheduled for keyboard navigation</li>
				</ol>
			</TabPanel>
			<TabPanel id="settings">
				<div class="_settings">
					<span>Auto publish</span>
					<strong>Off</strong>
					<span>Review gate</span>
					<strong>Required</strong>
					<span>Preview channel</span>
					<strong>Internal</strong>
				</div>
			</TabPanel>
		</TabPanels>
	</Tabs>
</div>

<style>
	._showcase {
		display: grid;
		gap: 1rem;
		width: 100%;
		max-width: 46rem;
		padding: 1rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
	}

	._toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	._eyebrow,
	._title {
		margin: 0;
	}

	._eyebrow {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--color-text-tertiary);
	}

	._title {
		font-size: 1.2rem;
		line-height: 1.3;
	}

	._status {
		padding: 0.25rem 0.55rem;
		border-radius: 999px;
		background: var(--color-success-100, var(--color-secondary-100));
		color: var(--color-success-700, var(--color-text-primary));
		font-size: 0.8rem;
		font-weight: 700;
	}

	._showcase :global(._tabs) {
		width: 100%;
	}

	._panelGrid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
	}

	._metric,
	._settings {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-secondary);
	}

	._metric {
		display: grid;
		gap: 0.35rem;
		padding: 0.85rem;
	}

	._metric span,
	._settings span,
	._timeline {
		color: var(--color-text-secondary);
	}

	._metric strong {
		font-size: 1.4rem;
	}

	._timeline {
		display: grid;
		gap: 0.65rem;
		margin: 0;
		padding-left: 1.25rem;
	}

	._settings {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.65rem 1rem;
		padding: 1rem;
	}

	@media (max-width: 640px) {
		._panelGrid {
			grid-template-columns: 1fr;
		}
	}
</style>
