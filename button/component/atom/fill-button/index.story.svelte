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
	title="Fill Button"
	category="Atoms/Interaction/Controls/Buttons"
	description="Animated CTA with keyboard focus, loading, disabled and reduced-motion support."
>
	{#snippet children(values: any)}
		<Button disabled={values.disabled as boolean} loading={values.loading as boolean}
			>Посмотреть программу</Button
		>
	{/snippet}
</Story>
