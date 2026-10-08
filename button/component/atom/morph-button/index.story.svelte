<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Button from './index.svelte';
	const controls: SlotStory[] = [
		{
			name: 'state',
			type: 'select',
			options: ['idle', 'loading', 'success', 'error'],
			defaultValue: 'idle'
		}
	];
</script>

<Story
	{controls}
	component={Button}
	title="Morph Button"
	category="Atoms/Interaction/Controls/Buttons"
	description="Host-controlled idle, loading, success and retry states; no simulated request."
>
	{#snippet children(values: any)}
		<Button state={values.state as 'idle' | 'loading' | 'success' | 'error'}
			>Отправить заявку</Button
		>
	{/snippet}
</Story>
