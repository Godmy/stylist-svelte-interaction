<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import SlotRadio from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'label', type: 'text', defaultValue: 'Email notifications' },
		{ name: 'checked', type: 'boolean', defaultValue: true },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'required', type: 'boolean', defaultValue: false },
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] }
	];
</script>

<Story
	component={SlotRadio}
	title="SlotRadio"
	description="Single radio option with checked, required, size, and disabled states."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<SlotRadio
				id="radio-main"
				name="story-radio"
				value="primary"
				label={values.label}
				checked={values.checked}
				disabled={values.disabled}
				required={values.required}
				size={values.size}
			/>
			<div class="_c2">Selected value: {values.checked ? 'primary' : 'none'}</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 > * + * {
		margin-top: 1rem;
	}
	._c2 {
		border-radius: 0.75rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 0.75rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
