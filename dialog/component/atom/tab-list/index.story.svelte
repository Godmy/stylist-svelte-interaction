<script lang="ts">
	import Tabs from '$stylist/dialog/component/molecule/tabs/index.svelte';
	import TabList from './index.svelte';
	import Tab from '../tab/index.svelte';
	import type { RecipeTabList } from '$stylist/dialog/interface/recipe/tab-list';
	import type { TokenSize } from '$stylist/design-token/type/alias/size';

	// Render of index.story.ts: TabList needs a Tabs context and Tab children.
	let { selectedId, size, ...args }: RecipeTabList & { selectedId?: string; size?: TokenSize } =
		$props();
</script>

<div class="_surface">
	<div class="_header">
		<span>Account sections</span>
		<strong>{selectedId}</strong>
	</div>
	<Tabs {selectedId} {size}>
		<TabList {...args}>
			<Tab id="profile">Profile</Tab>
			<Tab id="billing">Billing</Tab>
			<Tab id="security">Security</Tab>
			<Tab id="sessions">Sessions</Tab>
		</TabList>
	</Tabs>
</div>

<style>
	._surface {
		display: grid;
		gap: 0.75rem;
		max-width: 38rem;
	}

	._header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		color: var(--color-text-secondary);
	}

	._header strong {
		padding: 0.25rem 0.55rem;
		border-radius: 999px;
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
		font-size: 0.8rem;
	}
</style>
