<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import RecipeShortcutsPanel from './index.svelte';

	const controls: SlotStory[] = [];
</script>

<Story
	component={RecipeShortcutsPanel}
	title="Shortcuts Panel"
	description="Keyboard shortcut reference grouped by navigation, view, action, viewport, tab, and utility commands."
	{controls}
>
	{#snippet children()}
		<RecipeShortcutsPanel />
	{/snippet}
</Story>
