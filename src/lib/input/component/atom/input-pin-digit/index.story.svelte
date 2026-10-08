<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import PinInputDigit from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'value', type: 'text', defaultValue: '4' },
		{ name: 'focused', type: 'boolean', defaultValue: false },
		{ name: 'invalid', type: 'boolean', defaultValue: false },
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'default',
			options: ['default', 'outline', 'ghost']
		}
	];
</script>

<Story
	component={PinInputDigit}
	title="InputPinDigit"
	description="Single digit input used in OTP/PIN flows."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<PinInputDigit
				value={values.value}
				focused={values.focused}
				invalid={values.invalid}
				size={values.size}
				variant={values.variant}
			/>
			<PinInputDigit value="" size={values.size} variant={values.variant} />
			<PinInputDigit value="" size={values.size} variant={values.variant} />
			<PinInputDigit value="" size={values.size} variant={values.variant} />
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: flex;
		gap: 0.5rem;
	}
</style>
