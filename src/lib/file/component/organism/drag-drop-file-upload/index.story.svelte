<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import DragDropFileUpload from './index.svelte';

	type Props = {
		accept: string;
		multiple: boolean;
		disabled: boolean;
		maxSize: number;
		preview: boolean;
	};

	const controls: SlotStory[] = [
		{
			name: 'accept',
			type: 'text',
			defaultValue: '*'
		},
		{
			name: 'multiple',
			type: 'boolean',
			defaultValue: false
		},
		{
			name: 'disabled',
			type: 'boolean',
			defaultValue: false
		},
		{
			name: 'maxSize',
			type: 'number',
			defaultValue: 10485760 // 10MB in bytes
		},
		{
			name: 'preview',
			type: 'boolean',
			defaultValue: false
		}
	];

	function handleFileSelect(files: FileList) {
		console.log(
			'Files selected:',
			Array.from(files).map((f) => f.name)
		);
	}

	function handleFileUpload(file: File) {
		console.log('File uploaded:', file.name);
	}
</script>

<Story
	id="organisms-drag-drop-file-upload"
	title="Organisms / Interaction / Files / DragDropFileUpload"
	component={DragDropFileUpload}
	category="Organisms/Interaction/Files"
	description="A component for drag and drop file uploads."
	tags={['forms', 'upload', 'file']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-drag-drop-file-upload _c1">
			<h2 class="_c2">DragDropFileUpload Story</h2>
			<DragDropFileUpload
				accept={values.accept}
				multiple={values.multiple}
				disabled={values.disabled}
				maxSize={values.maxSize}
				preview={values.preview}
				onFileSelect={handleFileSelect}
				onFileUpload={handleFileUpload}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		border-radius: 0.5rem;
		background-color: var(--color-background-secondary);
		padding: 2rem;
	}
	._c2 {
		margin-bottom: 1rem;
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
	}
</style>
