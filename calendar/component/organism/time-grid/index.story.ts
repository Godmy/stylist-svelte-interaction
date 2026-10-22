import TimeGrid from '$stylist/calendar/component/organism/time-grid/index.svelte';
import type { RecipeTimeGrid } from '$stylist/calendar/interface/recipe/time-grid';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Week scheduling grid; index.story.svelte supplies the Date range and the events. */
export default {
	component: TimeGrid,
	title: 'TimeGrid',
	description: 'Interactive time grid with detailed scheduling view.',
	args: { showHeader: true, showCurrentTimeIndicator: true, timeStep: 60, variant: 'grid' },
	controls: {
		showHeader: { type: 'boolean' },
		showCurrentTimeIndicator: { type: 'boolean' },
		timeStep: { type: 'select', options: [15, 30, 60, 120] },
		variant: { type: 'select', options: ['grid', 'schedule'] }
	},
	presets: { HalfHour: { timeStep: 30 }, Schedule: { variant: 'schedule' } },
	layout: 'padded'
} satisfies ContractStory<RecipeTimeGrid>;
