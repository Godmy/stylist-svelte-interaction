<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import UploadProgress from './index.svelte';
	import type { SlotUploadFile as IUploadFile } from '$stylist/file/interface/slot/upload-file';
	import type { UploadProgressVariant } from '$stylist/file/type/alias/upload-progress-variant';

	// Моковые данные для файлов
	const mockFiles: IUploadFile[] = [
		{
			id: '1',
			name: 'document.pdf',
			size: 1024000,
			status: 'idle',
			progress: 0
		},
		{
			id: '2',
			name: 'image.jpg',
			size: 512000,
			status: 'uploading',
			progress: 45
		},
		{
			id: '3',
			name: 'presentation.pptx',
			size: 2048000,
			status: 'success',
			progress: 100,
			uploadedAt: new Date()
		},
		{
			id: '4',
			name: 'video.mp4',
			size: 5120000,
			status: 'error',
			progress: 20,
			error: 'File too large'
		}
	];

	// Определение переменных
	let files: IUploadFile[] = mockFiles;
	let variant: UploadProgressVariant = 'default';
	let showFileName: boolean = true;
	let showFileSize: boolean = true;
	let showProgress: boolean = true;
	let showActions: boolean = true;
	let autoHideCompleted: boolean = false;
	let maxVisible: number = 5;

	type Props = {
		variant: UploadProgressVariant;
		showFileName: boolean;
		showFileSize: boolean;
		showProgress: boolean;
		showActions: boolean;
		autoHideCompleted: boolean;
		maxVisible: number;
	};

	const controls: SlotStory[] = [
		{
			name: 'variant',
			type: 'select',
			options: ['default', 'compact', 'detailed'],
			defaultValue: 'default'
		},
		{ name: 'showFileName', type: 'boolean', defaultValue: true },
		{ name: 'showFileSize', type: 'boolean', defaultValue: true },
		{ name: 'showProgress', type: 'boolean', defaultValue: true },
		{ name: 'showActions', type: 'boolean', defaultValue: true },
		{ name: 'autoHideCompleted', type: 'boolean', defaultValue: false },
		{ name: 'maxVisible', type: 'number', defaultValue: 5 }
	];
</script>

<Story
	id="organisms-upload-progress"
	title="Organisms / Interaction / Files / UploadProgress"
	component={UploadProgress}
	category="Organisms/Interaction/Files"
	description="Progress indicator for file uploads with status management."
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-upload-progress">
			<h2>Default</h2>
			<UploadProgress
				{files}
				variant={values.variant}
				showFileName={values.showFileName}
				showFileSize={values.showFileSize}
				showProgress={values.showProgress}
				showActions={values.showActions}
				autoHideCompleted={values.autoHideCompleted}
				maxVisible={values.maxVisible}
			/>

			<h2>Compact</h2>
			<UploadProgress
				{files}
				variant="compact"
				showFileName={values.showFileName}
				showFileSize={values.showFileSize}
				showProgress={values.showProgress}
				showActions={values.showActions}
				autoHideCompleted={values.autoHideCompleted}
				maxVisible={values.maxVisible}
			/>

			<h2>Detailed</h2>
			<UploadProgress
				{files}
				variant="detailed"
				showFileName={values.showFileName}
				showFileSize={values.showFileSize}
				showProgress={values.showProgress}
				showActions={values.showActions}
				autoHideCompleted={values.autoHideCompleted}
				maxVisible={values.maxVisible}
			/>

			<h2>With Hidden Completed</h2>
			<UploadProgress
				{files}
				showFileName={values.showFileName}
				showFileSize={values.showFileSize}
				showProgress={values.showProgress}
				showActions={values.showActions}
				autoHideCompleted={true}
				maxVisible={3}
			/>
		</div>
	{/snippet}
</Story>
