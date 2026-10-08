<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import FileInput from './index.svelte';

	let selectedLabel = $state('No file selected');

	const controls: SlotStory[] = [
		{ name: 'placeholder', type: 'text', defaultValue: 'Attach files' },
		{ name: 'accept', type: 'text', defaultValue: '.png,.jpg,.pdf' },
		{ name: 'multiple', type: 'boolean', defaultValue: false },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={FileInput}
	title="FileInput"
	description="File picker with single or multiple upload mode."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<FileInput
				placeholder={values.placeholder}
				accept={values.accept}
				multiple={values.multiple}
				disabled={values.disabled}
				onFileChange={(file) => {
					if (!file) selectedLabel = 'No file selected';
					else if (Array.isArray(file)) selectedLabel = `${file.length} files selected`;
					else selectedLabel = file.name;
				}}
			/>
			<p class="_c2">{selectedLabel}</p>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		max-width: 28rem;
	}
	._c1 > * + * {
		margin-top: 0.75rem;
	}
	._c2 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
