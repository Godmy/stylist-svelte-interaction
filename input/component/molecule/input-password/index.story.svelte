<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import InputPassword from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'Password' },
		{ name: 'placeholder', type: 'text', defaultValue: '••••••••' },
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
		{ name: 'helperText', type: 'text', defaultValue: 'Use at least 8 characters.' },
		{ name: 'errors', type: 'text', defaultValue: '' },
		{ name: 'allowTogglePassword', type: 'boolean', defaultValue: true },
		{ name: 'showPasswordStrength', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	{controls}
	component={InputPassword}
	title="InputPassword"
	category="Molecules/Interaction/Input/Field"
	description="Password input with visibility controls, validation states, and helper copy."
	tags={['input', 'password', 'field', 'form', 'control', 'security']}
>
	{#snippet children(values: any)}
		<InputPassword
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
			allowTogglePassword={values.allowTogglePassword as boolean}
			showPasswordStrength={values.showPasswordStrength as boolean}
		/>
	{/snippet}
</Story>
