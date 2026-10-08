<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import FileUpload from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'accept',
			type: 'text' as TokenControllerType,
			defaultValue: '.pdf,.doc,.docx,.xls,.xlsx,.txt',
			description: 'Accepted file types'
		},
		{
			name: 'maxSize',
			type: 'number' as TokenControllerType,
			defaultValue: 10485760,
			description: 'Maximum file size in bytes (10MB)'
		},
		{
			name: 'multiple',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether to allow multiple files'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the upload is disabled'
		}
	];

	let uploadText = 'РёР»Рё РїРµСЂРµС‚Р°С‰РёС‚СЊ СЃСЋРґР°';
</script>

<Story
	{controls}
	title="FileUpload Component"
	description="File upload component with drag and drop support"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<FileUpload
				accept={controlValues.accept}
				maxSize={controlValues.maxSize}
				multiple={controlValues.multiple}
				disabled={controlValues.disabled}
				{uploadText}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 2rem;
	}
</style>
