<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import InputHelper from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'text', type: 'text', defaultValue: 'Use 8 or more characters.' },
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'default',
			options: ['default', 'info', 'success', 'warning', 'danger']
		}
	];
</script>

<Story
	component={InputHelper}
	title="InputHelper"
	description="Supportive helper text for input controls."
	{controls}
>
	{#snippet children(values: any)}
		<InputHelper text={values.text} variant={values.variant} />
	{/snippet}
</Story>
