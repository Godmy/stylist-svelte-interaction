<script lang="ts">
	import DatePairPicker from '$stylist/calendar/component/organism/date-pair-picker/index.svelte';
	import type { RecipeDatePairPicker } from '$stylist/calendar/interface/recipe/date-pair-picker';

	// Render of index.story.ts: the picker is controlled, so the story keeps the picked dates and computes the end.
	let args: RecipeDatePairPicker = $props();

	let pickedStart = $state<string | null>(null);
	let pickedEnd = $state<string | null>(null);
	const value = $derived(pickedStart ?? args.value ?? '');
	const endValue = $derived(pickedEnd ?? args.endValue ?? '');

	function addDays(iso: string, days: number): string {
		const [year, month, day] = iso.split('-').map(Number);
		const date = new Date(year, month - 1, day + days);
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	}

	function handleStart(next: string) {
		pickedStart = next;
		if (!args.endEditable) pickedEnd = addDays(next, 7);
	}
</script>

<DatePairPicker
	{...args}
	{value}
	{endValue}
	onChange={handleStart}
	onEndChange={(next) => (pickedEnd = next)}
/>
