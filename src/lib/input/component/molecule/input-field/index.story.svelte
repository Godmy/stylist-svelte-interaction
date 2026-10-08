<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import InputField from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'Work email' },
		{ name: 'placeholder', type: 'text', defaultValue: 'designer@company.com' },
		{
			name: 'helperText',
			type: 'text',
			defaultValue: 'You can change this later in profile settings.'
		},
		{
			name: 'type',
			type: 'select',
			defaultValue: 'email',
			options: ['text', 'email', 'password', 'number']
		},
		{
			name: 'errorPreset',
			type: 'select',
			defaultValue: 'none',
			options: ['none', 'required', 'invalid']
		},
		{ name: 'required', type: 'boolean', defaultValue: true },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={InputField}
	title="InputField"
	description="Composed input with helper and error text."
	{controls}
>
	{#snippet children(values: any)}
		{@const errors =
			values.errorPreset === 'required'
				? ['Field is required']
				: values.errorPreset === 'invalid'
					? ['Enter a valid value']
					: []}
		<InputField
			id="story-input-field"
			label={values.label}
			type={values.type}
			placeholder={values.placeholder}
			helperText={values.helperText}
			{errors}
			required={values.required}
			disabled={values.disabled}
		/>
	{/snippet}
</Story>
