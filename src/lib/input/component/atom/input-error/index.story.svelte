<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import InputError from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'text', type: 'text', defaultValue: 'Email is required.' },
		{ name: 'visible', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	component={InputError}
	title="InputError"
	description="Validation message shown below invalid input fields."
	{controls}
>
	{#snippet children(values: any)}
		<InputError text={values.text} visible={values.visible} />
	{/snippet}
</Story>
