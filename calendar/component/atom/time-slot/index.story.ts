import TimeSlot from './index.svelte';
import type { RecipeTimeSlot } from '$stylist/calendar/interface/recipe/time-slot';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Single time slot; index.story.svelte supplies the Date range and the events. */
export default {
	component: TimeSlot,
	title: 'TimeSlot',
	description: 'Single time slot for schedule/calendar views',
	args: {
		available: true,
		selected: false,
		active: false,
		timeLabel: '9:00 AM - 10:00 AM',
		eventCount: 0
	},
	controls: {
		available: { type: 'boolean' },
		selected: { type: 'boolean' },
		active: { type: 'boolean' },
		timeLabel: { type: 'text' },
		// eventCount is a story knob: the render builds that many events for the slot.
		eventCount: { type: 'number', min: 0, max: 5 }
	},
	presets: {
		Selected: { selected: true },
		Busy: { eventCount: 2 },
		Unavailable: { available: false }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeTimeSlot & { eventCount?: number }>;
