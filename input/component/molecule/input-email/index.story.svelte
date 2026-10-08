<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import InputEmail from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'Email' },
		{ name: 'placeholder', type: 'text', defaultValue: 'example@email.com' },
		{ name: 'value', type: 'text', defaultValue: '' },
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'default',
			options: [
				'default',
				'filled',
				'outline',
				'ghost',
				'info',
				'success',
				'warning',
				'danger',
				'solid'
			]
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'error', type: 'boolean', defaultValue: false },
		{ name: 'required', type: 'boolean', defaultValue: false },
		{ name: 'helperText', type: 'text', defaultValue: 'Use the address where we can reach you.' },
		{ name: 'errors', type: 'text', defaultValue: '' }
	];
</script>

<Story
	{controls}
	component={InputEmail}
	title="InputEmail"
	category="Molecules/Interaction/Input/Field"
	description="Email input with format validation, helper copy, and disabled/error states."
	tags={['input', 'email', 'field', 'form', 'control']}
>
	{#snippet children(values: any)}
		<InputEmail
			label={values.label as string}
			placeholder={values.placeholder as string}
			value={values.value as string}
			variant={values.variant as any}
			size={values.size as 'sm' | 'md' | 'lg'}
			disabled={values.disabled as boolean}
			error={values.error as boolean}
			required={values.required as boolean}
			helperText={values.helperText as string}
			errors={(values.errors as string)?.split(',').filter(Boolean) || []}
		/>
	{/snippet}
</Story>
