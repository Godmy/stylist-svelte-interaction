<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import DateTimePicker from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'value',
			type: 'text' as TokenControllerType,
			defaultValue: new Date().toISOString(),
			description: 'Selected date-time as ISO string'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the picker is disabled'
		},
		{
			name: 'placeholder',
			type: 'text' as TokenControllerType,
			defaultValue: 'Select date and time',
			description: 'Placeholder text'
		}
	];

	const toDateOrUndefined = (value?: string) => (value ? new Date(value) : undefined);
	const humanize = (value?: string) => (value ? new Date(value).toLocaleString() : 'Not set');
</script>

<Story
	{controls}
	title="DateTimePicker Component"
	description="Inline date + time picker with dropdown calendar and keyboard-friendly selectors"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<DateTimePicker
				value={toDateOrUndefined(controlValues.value)}
				disabled={controlValues.disabled}
				placeholder={controlValues.placeholder}
			/>
			<div class="_c2">
				Selected timestamp: {humanize(controlValues.value)}
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		margin-top: 1rem;
		border-radius: 1rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
