<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import InputLabel from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'Work email' },
		{ name: 'required', type: 'boolean', defaultValue: true },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{
			name: 'size',
			type: 'select',
			defaultValue: 'md',
			options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
		}
	];
</script>

<Story
	component={InputLabel}
	title="InputLabel"
	description="Label with an optional required-indicator, shared across the input field family."
	{controls}
>
	{#snippet children(values: any)}
		<InputLabel
			id="story-input-label"
			label={values.label}
			required={values.required}
			disabled={values.disabled}
			size={values.size}
		/>
	{/snippet}
</Story>
