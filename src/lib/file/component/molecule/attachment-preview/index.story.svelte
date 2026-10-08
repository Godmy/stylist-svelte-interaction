<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import AttachmentPreview from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'name', type: 'text', defaultValue: 'project-brief.pdf' },
		{
			name: 'type',
			type: 'select',
			defaultValue: 'file',
			options: ['file', 'image', 'video', 'audio']
		},
		{ name: 'size', type: 'number', defaultValue: 2457600, min: 0, max: 25000000, step: 1024 },
		{ name: 'showActions', type: 'boolean', defaultValue: true }
	];

	const attachments = [
		{ id: '1', name: 'wireframe-overview.png', type: 'image', size: 842000 },
		{ id: '2', name: 'release-notes.pdf', type: 'file', size: 2457600 },
		{ id: '3', name: 'demo-recording.mp4', type: 'video', size: 18432000 }
	];
</script>

<Story
	id="molecules-attachment-preview"
	title="AttachmentPreview"
	component={AttachmentPreview}
	category="Molecules"
	description="Compact file attachment row with file metadata and optional actions."
	tags={['attachment', 'file', 'preview']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<AttachmentPreview
				attachment={{
					id: 'controlled',
					name: String(values.name || 'project-brief.pdf'),
					type: String(values.type || 'file'),
					size: Number(values.size) || 0
				}}
				showActions={Boolean(values.showActions)}
			/>

			<div class="_c2">
				{#each attachments as attachment}
					<AttachmentPreview {attachment} showActions={Boolean(values.showActions)} />
				{/each}
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 1.25rem;
		max-width: 34rem;
	}

	._c2 {
		display: grid;
		gap: 0.75rem;
	}
</style>
