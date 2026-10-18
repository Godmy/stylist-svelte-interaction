import Timeline from './index.svelte';
import type { RecipeTimeline } from '$stylist/calendar/interface/recipe/timeline';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_ORIENTATION } from '$stylist/layout/const/array/orientation';

/** Chronological list of milestones. */
export default {
	component: Timeline,
	title: 'Timeline',
	description: 'Timeline component to show events chronologically',
	args: {
		orientation: 'vertical',
		items: [
			{ id: '1', date: '2023-01-15', title: 'Project Started', status: 'completed' },
			{ id: '2', date: '2023-02-01', title: 'Design Phase', status: 'completed' },
			{ id: '3', date: '2023-03-10', title: 'Development', status: 'current' },
			{ id: '4', date: '2023-04-20', title: 'Testing', status: 'upcoming' },
			{ id: '5', date: '2023-05-05', title: 'Launch', status: 'upcoming' }
		]
	},
	controls: {
		orientation: {
			type: 'select',
			options: TOKEN_ORIENTATION,
			description: 'Orientation of the timeline'
		}
	},
	presets: { Horizontal: { orientation: 'horizontal' } },
	layout: 'padded'
} satisfies ContractStory<RecipeTimeline>;
