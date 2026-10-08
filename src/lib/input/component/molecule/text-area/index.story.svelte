<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Textarea from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'Message' },
		{ name: 'placeholder', type: 'text', defaultValue: 'Write a message...' },
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
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg', 'xl'] },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'error', type: 'boolean', defaultValue: false },
		{ name: 'required', type: 'boolean', defaultValue: false },
		{ name: 'rows', type: 'number', defaultValue: 4, min: 2, max: 20 },
		{ name: 'autoResize', type: 'boolean', defaultValue: false },
		{ name: 'maxlength', type: 'number', defaultValue: 1000, min: 0, max: 10000 },
		{ name: 'helperText', type: 'text', defaultValue: 'Maximum 1000 characters.' }
	];
</script>

<Story
	{controls}
	component={Textarea}
	title="Textarea"
	category="Molecules/Interaction/Input/Field"
	description="Multiline text area with maxlength, helper text, and auto-resize behavior."
	tags={['textarea', 'input', 'field', 'form', 'control', 'text']}
>
	{#snippet children(values: any)}
		<Textarea
			label={values.label as string}
			placeholder={values.placeholder as string}
			value={values.value as string}
			variant={values.variant as any}
			size={values.size as 'sm' | 'md' | 'lg' | 'xl'}
			disabled={values.disabled as boolean}
			error={values.error as boolean}
			required={values.required as boolean}
			rows={Number(values.rows) as number}
			autoResize={values.autoResize as boolean}
			maxlength={Number(values.maxlength) as number}
			helperText={values.helperText as string}
		/>
	{/snippet}
</Story>
