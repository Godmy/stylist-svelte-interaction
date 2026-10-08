<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import TextInputDialog from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'open', type: 'boolean', defaultValue: true },
		{ name: 'loading', type: 'boolean', defaultValue: false },
		{ name: 'saving', type: 'boolean', defaultValue: false },
		{ name: 'rows', type: 'number', defaultValue: 10 }
	];

	let draft = $state(
		'Document the edge cases for this component story.\nAdd concrete examples for keyboard and pointer states.'
	);
	let saveCount = $state(0);
</script>

<Story
	{controls}
	component={TextInputDialog}
	title="TextInputDialog"
	description="Modal text editor used by the domain page for backlog and notes editing."
>
	{#snippet children(values: any)}
		<div class="_c1 bg-slate-900/70">
			<TextInputDialog
				open={Boolean(values.open)}
				title="Story Backlog"
				path="src/lib/layout/component/atom/clickable/README.md"
				bind:value={draft}
				loading={Boolean(values.loading)}
				saving={Boolean(values.saving)}
				rows={Number(values.rows)}
				placeholder="Write component guidance..."
				error={draft.length < 20 ? 'Draft should contain at least 20 characters.' : ''}
				onSave={() => {
					saveCount += 1;
				}}
			/>
			<p class="_c2">Save attempts: {saveCount}</p>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		position: relative;
		min-height: 42rem;
		border-radius: 1.5rem;
		padding: 1rem;
	}
	._c2 {
		position: absolute;
		bottom: 1rem;
		left: 1.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: #e2e8f0;
	}
</style>
