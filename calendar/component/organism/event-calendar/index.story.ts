import EventCalendar from '$stylist/calendar/component/organism/event-calendar/index.svelte';
import type { RecipeEventCalendar } from '$stylist/calendar/interface/recipe/event-calendar';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_CALENDAR } from '$stylist/calendar/const/array/calendar-enum';

/** Calendar with event management; index.story.svelte supplies the Date-based events. */
export default {
	component: EventCalendar,
	title: 'EventCalendar',
	description: 'Interactive calendar with event management features.',
	args: { viewMode: 'month', showAllDayEvents: true },
	controls: {
		viewMode: { type: 'select', options: TOKEN_CALENDAR },
		showAllDayEvents: { type: 'boolean' }
	},
	presets: { Week: { viewMode: 'week' }, Day: { viewMode: 'day' } },
	layout: 'padded'
} satisfies ContractStory<RecipeEventCalendar>;
