<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Button from './index.svelte';
	const controls: SlotStory[] = [
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'loading', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={Button}
	title="Selection Button"
	category="Atoms/Interaction/Controls/Buttons"
	description="Toggle selection with mouse, touch, Space or Enter; selected is bindable."
>
	{#snippet children(values: any)}
		<Button disabled={values.disabled as boolean} loading={values.loading as boolean}
			>Выбрать экскурсию</Button
		>
	{/snippet}
</Story>
