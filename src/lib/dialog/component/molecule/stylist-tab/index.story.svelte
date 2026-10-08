<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import StylistTab from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const customItems = [
		{ id: 'dashboard', label: 'Dashboard', icon: 'grid-layout' },
		{ id: 'analytics', label: 'Analytics', icon: 'chart' },
		{ id: 'settings', label: 'Settings', icon: 'settings' },
		{ id: 'profile', label: 'Profile', icon: 'user' }
	];

	const controls = [
		{
			name: 'selectedId',
			type: 'select' as TokenControllerType,
			defaultValue: 'architecture',
			options: ['architecture', 'information', 'interaction'],
			description: 'Selected taxonomy item id.'
		}
	];

	function handleSelect(item: { id: string; label: string; icon: string }) {
		console.log(`Selected tab: ${item.label} (${item.id})`);
	}
</script>

<Story
	{controls}
	title="StylistTab"
	description="Domain-specific taxonomy switcher used by StylistMenu."
>
	{#snippet children(controlValues: any)}
		<div class="_surface">
			<div class="_panel">
				<div class="_copy">
					<span>Default taxonomy</span>
					<h3>Stylist mode</h3>
					<p>
						Compact icon tabs for switching between architecture, information, and interaction
						views.
					</p>
				</div>
				<StylistTab selectedId={controlValues.selectedId} onSelect={handleSelect} />
			</div>

			<div class="_panel _panelSecondary">
				<div class="_copy">
					<span>Custom items</span>
					<h3>Operational views</h3>
				</div>
				<StylistTab items={customItems as any} selectedId="dashboard" onSelect={handleSelect} />
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._surface {
		display: grid;
		gap: 1rem;
		max-width: 44rem;
	}

	._panel {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
	}

	._panelSecondary {
		background: var(--color-background-secondary);
	}

	._copy {
		display: grid;
		gap: 0.25rem;
		min-width: 0;
	}

	._copy span {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--color-text-tertiary);
	}

	._copy h3,
	._copy p {
		margin: 0;
	}

	._copy p {
		max-width: 24rem;
		color: var(--color-text-secondary);
	}

	@media (max-width: 720px) {
		._panel {
			align-items: flex-start;
			flex-direction: column;
		}
	}
</style>
