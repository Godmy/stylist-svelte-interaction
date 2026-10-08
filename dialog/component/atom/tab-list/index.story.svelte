<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Tabs from '$stylist/dialog/component/molecule/tabs/index.svelte';
	import TabList from './index.svelte';
	import Tab from '../tab/index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'selectedId',
			type: 'select',
			defaultValue: 'profile',
			options: ['profile', 'billing', 'security']
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={TabList}
	title="TabList"
	description="Horizontal navigation container for related Tab items."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_surface">
			<div class="_header">
				<span>Account sections</span>
				<strong>{values.selectedId}</strong>
			</div>
			<Tabs selectedId={values.selectedId} size={values.size}>
				<TabList class="_list" disabled={values.disabled}>
					<Tab id="profile">Profile</Tab>
					<Tab id="billing">Billing</Tab>
					<Tab id="security">Security</Tab>
					<Tab id="sessions">Sessions</Tab>
				</TabList>
			</Tabs>
		</div>
	{/snippet}
</Story>

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

	._list {
		flex-wrap: wrap;
		width: 100%;
		padding: 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-secondary);
	}
</style>
