<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Switch from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'Enable notifications' },
		{
			name: 'description',
			type: 'text',
			defaultValue: 'Receive email notifications for new events'
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'checked', type: 'boolean', defaultValue: true },
		{ name: 'required', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={Switch}
	title="Switch"
	category="Atoms/Interaction/Controls/Toggles"
	description="Switch with label, description, required, checked, and disabled states."
	tags={['switch', 'toggle', 'checkbox', 'form', 'control']}
>
	{#snippet children(values: any)}
		<Switch
			label={values.label as string}
			description={values.description as string}
			size={values.size as 'sm' | 'md' | 'lg'}
			disabled={values.disabled as boolean}
			checked={values.checked as boolean}
			required={values.required as boolean}
		/>
	{/snippet}
</Story>
