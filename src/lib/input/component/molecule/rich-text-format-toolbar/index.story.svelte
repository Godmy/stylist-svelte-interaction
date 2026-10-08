<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import RichTextFormatToolbar from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'showLinkInput', type: 'boolean', defaultValue: false },
		{ name: 'linkUrl', type: 'text', defaultValue: 'https://example.com' }
	];
</script>

<Story
	{controls}
	component={RichTextFormatToolbar}
	title="Rich Text Format Toolbar"
	category="Molecules/Interaction/Input/Editor"
	description="Word-like rich text formatting toolbar with style, font, size, color, alignment, list, link, and image controls."
	tags={['rich-text', 'toolbar', 'formatting', 'editor', 'word']}
>
	{#snippet children(values: any)}
		<RichTextFormatToolbar
			showLinkInput={values.showLinkInput as boolean}
			linkUrl={values.linkUrl as string}
			onFormatText={() => undefined}
			onToggleHorizontalRule={() => undefined}
			onToggleLinkInput={() => undefined}
			onSetShowLinkInput={() => undefined}
			onSetLinkUrl={() => undefined}
			onInsertLink={() => undefined}
			onInsertImage={() => undefined}
		/>
	{/snippet}
</Story>
