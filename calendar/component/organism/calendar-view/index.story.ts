import CalendarView from '$stylist/calendar/component/organism/calendar-view/index.svelte';
import type { RecipeCalendarView } from '$stylist/calendar/interface/recipe/calendar-view';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_CALENDAR } from '$stylist/calendar/const/array/calendar-enum';

/** Day/week/month calendar; index.story.svelte supplies the Date-based events. */
export default {
	component: CalendarView,
	title: 'CalendarView',
	description: 'Interactive calendar view with customizable options.',
	args: { viewMode: 'month', showWeekNumbers: false },
	controls: {
		viewMode: { type: 'select', options: TOKEN_CALENDAR },
		showWeekNumbers: { type: 'boolean' }
	},
	presets: {
		Week: { viewMode: 'week', showWeekNumbers: true },
		Day: { viewMode: 'day' }
	},
	layout: 'padded'
} satisfies ContractStory<RecipeCalendarView>;
