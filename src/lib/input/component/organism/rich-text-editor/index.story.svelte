<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import RichTextEditor from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'placeholder',
			type: 'text',
			defaultValue: 'Start writing here...'
		},
		{
			name: 'showToolbar',
			type: 'boolean',
			defaultValue: true
		}
	];

	let content = $state('<p>Hello, <strong>world</strong>!</p>');
</script>

<Story
	id="organisms-rich-text-editor"
	title="Organisms / Interaction / Input / Rich Text Editor"
	component={RichTextEditor}
	category="Organisms/Interaction/Input"
	description="Contenteditable rich text editor with a formatting toolbar (bold, italic, headings, lists, links, images)."
	tags={['input', 'editor', 'rich-text']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<RichTextEditor
				value={content}
				placeholder={values.placeholder as string}
				showToolbar={values.showToolbar as boolean}
				onValueInput={(next: string) => (content = next)}
			/>
			<p class="_c2">Current HTML length: {content.length}</p>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 0.75rem;
		max-width: 40rem;
		padding: 1rem;
	}
	._c2 {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
