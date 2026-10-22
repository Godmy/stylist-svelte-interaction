import FollowButton from '$stylist/button/component/atom/follow-button/index.svelte';
import type { RecipeFollowButton } from '$stylist/button/interface/recipe/follow-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Toggle follow/unfollow action button. */
export default {
	component: FollowButton,
	title: 'FollowButton',
	description:
		"Toggle follow/unfollow action button. Click it below: it shows a loading spinner while the (simulated) request is in flight, then switches state — hover it while following to preview the 'Unfollow' danger state.",
	args: { showText: true, variant: 'primary', size: 'md', disabled: false },
	controls: {
		showText: { type: 'boolean' },
		variant: { type: 'select', options: ['primary', 'secondary', 'outline', 'ghost'] },
		// sm … lg: the size tokens the follow button styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 4) },
		disabled: { type: 'boolean' }
	},
	presets: { Following: { isFollowing: true } },
	layout: 'centered'
} satisfies ContractStory<RecipeFollowButton>;
