import RatingFeedback from '$stylist/form/component/organism/rating-feedback/index.svelte';
import type { RecipeRatingFeedback } from '$stylist/form/interface/recipe/rating-feedback';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Dark card by default; the light preset switches the tone. */
export default {
	component: RatingFeedback,
	title: 'RatingFeedback',
	description: 'Five-point rating with submit and confirmation states.',
	args: { title: 'How did the consultation go?', tone: 'dark' },
	controls: { title: { type: 'text' }, tone: { type: 'select', options: ['dark', 'light'] } },
	presets: { Light: { tone: 'light' } },
	layout: 'centered'
} satisfies ContractStory<RecipeRatingFeedback>;
