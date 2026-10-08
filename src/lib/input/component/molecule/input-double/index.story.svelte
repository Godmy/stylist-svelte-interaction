<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import InputDouble from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label1', type: 'text', defaultValue: 'First name' },
		{ name: 'label2', type: 'text', defaultValue: 'Last name' },
		{ name: 'placeholder1', type: 'text', defaultValue: 'Jane' },
		{ name: 'placeholder2', type: 'text', defaultValue: 'Cooper' },
		{ name: 'value1', type: 'text', defaultValue: '' },
		{ name: 'value2', type: 'text', defaultValue: '' },
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
		{ name: 'disabled1', type: 'boolean', defaultValue: false },
		{ name: 'disabled2', type: 'boolean', defaultValue: false },
		{ name: 'required1', type: 'boolean', defaultValue: false },
		{ name: 'required2', type: 'boolean', defaultValue: false },
		{ name: 'errors1', type: 'text', defaultValue: '' },
		{ name: 'errors2', type: 'text', defaultValue: '' }
	];
</script>

<Story
	{controls}
	component={InputDouble}
	title="InputDouble"
	category="Molecules/Interaction/Input/Field"
	description="Two related input fields in one row for paired data such as first and last name or city and street."
	tags={['input', 'double', 'field', 'form', 'control', 'pair']}
>
	{#snippet children(values: any)}
		<InputDouble
			label1={values.label1 as string}
			label2={values.label2 as string}
			placeholder1={values.placeholder1 as string}
			placeholder2={values.placeholder2 as string}
			value1={values.value1 as string}
			value2={values.value2 as string}
			variant={values.variant as any}
			size={values.size as 'sm' | 'md' | 'lg'}
			disabled1={values.disabled1 as boolean}
			disabled2={values.disabled2 as boolean}
			required1={values.required1 as boolean}
			required2={values.required2 as boolean}
			errors1={(values.errors1 as string)?.split(',').filter(Boolean) || []}
			errors2={(values.errors2 as string)?.split(',').filter(Boolean) || []}
		/>
	{/snippet}
</Story>
