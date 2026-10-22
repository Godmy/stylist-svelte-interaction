<script lang="ts">
	import TimeSlot from '$stylist/calendar/component/atom/time-slot/index.svelte';
	import type { RecipeTimeSlot } from '$stylist/calendar/interface/recipe/time-slot';

	// Render of index.story.ts: the slot needs Date start/end and Date-based events.
	let { eventCount = 0, ...args }: Partial<RecipeTimeSlot> & { eventCount?: number } = $props();

	const start = new Date(2026, 1, 21, 9, 0);
	const end = new Date(2026, 1, 21, 10, 0);
	const events = $derived(
		Array.from({ length: Math.max(0, eventCount) }, (_, i) => ({
			id: String(i + 1),
			title: `Event ${i + 1}`,
			start,
			end
		}))
	);
</script>

<TimeSlot {...args} {start} {end} {events} />
