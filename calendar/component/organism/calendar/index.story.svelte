<script lang="ts">
	import Calendar from '$stylist/calendar/component/organism/calendar/index.svelte';
	import type { RecipeCalendar } from '$stylist/calendar/interface/recipe/calendar';

	// Render of index.story.ts: value and minDate are Dates built from the text/boolean knobs.
	let {
		date = '',
		disablePast = false,
		...args
	}: RecipeCalendar & { date?: string; disablePast?: boolean } = $props();

	const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
	const value = $derived.by(() => {
		const parsed = date ? new Date(`${date}T00:00:00`) : null;
		return parsed && !Number.isNaN(parsed.getTime()) ? parsed : null;
	});
</script>

<div class="_surface">
	<Calendar {...args} {value} minDate={disablePast ? today : undefined} />
</div>

<style>
	._surface {
		display: inline-grid;
		width: 320px;
		padding: 24px;
		background: var(--color-background-secondary, #f7f3ec);
	}
</style>
