<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ToolButton from './index.svelte';

	const controls: SlotStory[] = [{ name: 'label', type: 'text', defaultValue: 'Tool' }];

	const tools = ['select', 'pan', 'frame', 'connect', 'text'];
	let activeTool = $state('select');
</script>

<Story
	{controls}
	component={ToolButton}
	title="ToolButton"
	category="Atoms/Control/ToolButton"
	description="Toolbar button for a design-canvas-style toolbar. Click a tool below to make it active — only one tool is active at a time, like a real toolbar."
>
	{#snippet children(values: any)}
		<div
			style="display: flex; gap: 8px; padding: 20px; background: var(--color-background-primary);"
		>
			{#each tools as tool}
				<ToolButton
					{tool}
					label={values.label as string}
					active={activeTool === tool}
					onClick={(clicked) => (activeTool = clicked)}
				/>
			{/each}
		</div>
	{/snippet}
</Story>
