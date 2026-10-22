<script lang="ts">
	import DateTimePicker from '$stylist/calendar/component/molecule/date-time-picker/index.svelte';
	import type { RecipeDateTimePicker } from '$stylist/calendar/interface/recipe/date-time-picker';

	// Render of index.story.ts: the picker only shows a Date value; the ISO text arg is converted.
	let { value, ...args }: RecipeDateTimePicker = $props();

	const toDateOrUndefined = (input: RecipeDateTimePicker['value']) =>
		input instanceof Date
			? input
			: typeof input === 'string' && input
				? new Date(input)
				: undefined;
	const date = $derived(toDateOrUndefined(value));
</script>

<DateTimePicker {...args} value={date} />
<div class="_c2">
	Selected timestamp: {date ? date.toLocaleString() : 'Not set'}
</div>

<style>
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
