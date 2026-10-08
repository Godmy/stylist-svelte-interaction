<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import TimeSlot from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'available', type: 'boolean', defaultValue: true },
		{ name: 'selected', type: 'boolean', defaultValue: false },
		{ name: 'active', type: 'boolean', defaultValue: false },
		{ name: 'timeLabel', type: 'text', defaultValue: '9:00 AM - 10:00 AM' },
		{ name: 'eventCount', type: 'number', defaultValue: 0, min: 0, max: 5 }
	];
</script>

<Story
	{controls}
	component={TimeSlot}
	title="TimeSlot"
	category="Atoms/Interaction/Controls/Calendar"
	description="Single time slot for schedule/calendar views"
>
	{#snippet children(values: any)}
		<TimeSlot
			start={new Date(2026, 1, 21, 9, 0)}
			end={new Date(2026, 1, 21, 10, 0)}
			timeLabel={values.timeLabel as string}
			available={values.available as boolean}
			selected={values.selected as boolean}
			active={values.active as boolean}
			events={Array.from({ length: Math.max(0, Number(values.eventCount) || 0) }, (_, i) => ({
				id: i + 1,
				title: `Event ${i + 1}`,
				start: new Date(2026, 1, 21, 9, 0),
				end: new Date(2026, 1, 21, 10, 0)
			})) as any}
		/>
	{/snippet}
</Story>
