<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ToggleGroupItem from './index.svelte';
	import ToggleGroupRoot from '../toggle-group-root/index.svelte';

	let selected = $state<string | null>(null);

	const controls: SlotStory[] = [
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'type', type: 'select', defaultValue: 'single', options: ['single', 'multiple'] }
	];
</script>

<Story
	component={ToggleGroupItem}
	title="ToggleGroupItem"
	description="Selectable item managed by ToggleGroupRoot context."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<ToggleGroupRoot
				type={values.type}
				onValueChange={(e) =>
					(selected = Array.isArray(e.detail.value) ? e.detail.value.join(', ') : e.detail.value)}
			>
				<ToggleGroupItem value="bold" disabled={values.disabled}>Bold</ToggleGroupItem>
				<ToggleGroupItem value="italic" disabled={values.disabled}>Italic</ToggleGroupItem>
				<ToggleGroupItem value="underline" disabled={values.disabled}>Underline</ToggleGroupItem>
			</ToggleGroupRoot>
			<p class="_c2">Selected: {selected || 'none'}</p>
		</div>
	{/snippet}
</Story>

<style>
	._c1 > * + * {
		margin-top: 0.75rem;
	}
	._c2 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
