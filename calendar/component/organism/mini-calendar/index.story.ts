import MiniCalendar from './index.svelte';
import type { RecipeMiniCalendar } from '$stylist/calendar/interface/recipe/mini-calendar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Compact month calendar; index.story.svelte supplies the Date-based events. */
export default {
	component: MiniCalendar,
	title: 'MiniCalendar',
	description: 'Compact calendar with event indicators and date selection.',
	args: { compact: false, showToday: true, withEvents: true },
	controls: {
		compact: { type: 'boolean' },
		showToday: { type: 'boolean' },
		// withEvents is a story knob: the render passes the sample events or none.
		withEvents: { type: 'boolean' }
	},
	presets: {
		Compact: { compact: true },
		WithoutTodayButton: { showToday: false },
		WithoutEvents: { withEvents: false }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeMiniCalendar & { withEvents?: boolean }>;
