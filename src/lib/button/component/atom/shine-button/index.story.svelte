<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Button from './index.svelte';
	const controls: SlotStory[] = [
		{ name: 'attention', type: 'boolean', defaultValue: true },
		{ name: 'animatedBorder', type: 'boolean', defaultValue: true },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'loading', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={Button}
	title="Shine Button"
	category="Atoms/Interaction/Controls/Buttons"
	description="Continuous border highlights and a light pass every five seconds. Both effects can be disabled independently; respects reduced motion."
>
	{#snippet children(values: any)}
		<Button
			attention={values.attention as boolean}
			animatedBorder={values.animatedBorder as boolean}
			disabled={values.disabled as boolean}
			loading={values.loading as boolean}>Посмотреть программу</Button
		>
	{/snippet}
</Story>
