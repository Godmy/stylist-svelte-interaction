<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Tick from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'value', type: 'number', defaultValue: 50, min: 0, max: 100, step: 1 },
		{ name: 'position', type: 'range', defaultValue: 50, min: 0, max: 100, step: 1 },
		{ name: 'label', type: 'text', defaultValue: '50%' },
		{ name: 'active', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	component={Tick}
	title="Tick"
	category="Atoms/Control/Sliders/Tick"
	description="Slider tick mark component"
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<Tick
				value={values.value ?? 50}
				position={values.position ?? 50}
				active={values.active ?? true}
				label={values.label ?? '50%'}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		position: relative;
		height: 2.5rem;
		width: 100%;
		border-width: 1px;
		border-style: dashed;
		border-color: var(--color-border-secondary);
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
</style>
