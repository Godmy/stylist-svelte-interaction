<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import BreadcrumbDropdown from './index.svelte';

	const controls: SlotStory[] = [{ name: 'open', type: 'boolean', defaultValue: true }];

	const items = [
		{
			id: 'controls',
			targetId: 'controls',
			label: 'controls',
			description: 'Interaction controls and wrappers'
		},
		{ id: 'state', targetId: 'state', label: 'state', description: 'State machines and stores' },
		{
			id: 'stories',
			targetId: 'stories',
			label: 'stories',
			description: 'Story coverage and examples'
		}
	];

	let selected = $state('controls');
</script>

<Story
	{controls}
	component={BreadcrumbDropdown}
	title="BreadcrumbDropdown"
	description="Dropdown flyout used by breadcrumb items with hidden siblings."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<div class="_c2">
				Active branch: {selected}
			</div>
			<div class="_c3">
				<BreadcrumbDropdown
					open={Boolean(values.open)}
					{items}
					onSelect={(targetId) => {
						selected = targetId;
					}}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		position: relative;
		min-height: 16rem;
		border-radius: 1.5rem;
		background-color: #f8fafc;
		padding: 1.5rem;
	}
	._c2 {
		display: inline-flex;
		border-radius: 9999px;
		border-width: 1px;
		border-style: solid;
		border-color: #e2e8f0;
		background-color: #ffffff;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: #64748b;
	}
	._c3 {
		position: absolute;
		top: 5rem;
		left: 1.5rem;
	}
</style>
