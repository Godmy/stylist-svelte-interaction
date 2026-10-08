<script lang="ts">
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';

	import DataExporter from './index.svelte';

	let lastExport = $state('none');

	const controls: SlotStory[] = [
		{ name: 'format', type: 'select', options: ['csv', 'json', 'excel'], defaultValue: 'csv' },
		{ name: 'fileName', type: 'text', defaultValue: 'customer-report' },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];

	const dataset = [
		{ id: 'C-101', customer: 'Ava Reed', plan: 'Scale', mrr: 6200 },
		{ id: 'C-102', customer: 'Noah Green', plan: 'Pro', mrr: 3200 },
		{ id: 'C-103', customer: 'Mila Park', plan: 'Start', mrr: 900 }
	];
</script>

<Story
	id="molecules-data-exporter"
	title="Molecules / Information / Exporters / DataExporter"
	component={DataExporter}
	category="Molecules/Information/Exporters"
	description="Toolbar for exporting tabular data to common file formats."
	{controls}
>
	{#snippet children(args: any)}
		<div class="_c1">
			<div class="_c2">
				<table class="_c3">
					<thead class="_c4">
						<tr
							><th class="_c5">ID</th><th class="_c5">Customer</th><th class="_c5">Plan</th><th
								class="_c5">MRR</th
							></tr
						>
					</thead>
					<tbody>
						{#each dataset as row}
							<tr class="_c6"
								><td class="_c5">{row.id}</td><td class="_c5">{row.customer}</td><td class="_c5"
									>{row.plan}</td
								><td class="_c5">${row.mrr}</td></tr
							>
						{/each}
					</tbody>
				</table>
			</div>
			<DataExporter
				data={dataset}
				format={args.format}
				fileName={args.fileName}
				disabled={args.disabled}
			/>
			<p class="_c7">Last export: {lastExport}</p>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		border-radius: 0.75rem;
		background-color: var(--color-background-secondary);
		padding: 1.5rem;
	}
	._c1 > * + * {
		margin-top: 1rem;
	}
	._c2 {
		overflow: hidden;
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
	}
	._c3 {
		min-width: 100%;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c4 {
		background-color: var(--color-background-secondary);
		text-align: left;
	}
	._c5 {
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	._c6 {
		border-top-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
	}
	._c7 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
