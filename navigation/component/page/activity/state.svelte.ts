import { createActivityState } from '$stylist/navigation/function/state/activity/state.svelte';
import type { RecipeActivity } from '$stylist/navigation/interface/recipe/activity';
/** Reactive behavior of activity; props are read lazily when needed. */
export function createActivityComponentState(getProps: () => RecipeActivity) {
	const props = $derived(getProps());
	const activity = createActivityState(() => props);
	const navigator = $derived(activity.navigator);
	let scrolled = $state(false);
	let content = $state<HTMLElement | null>(null);
	$effect(() => {
		void navigator.entry.key;
		if (content && navigator.direction !== 'back') content.scrollTop = 0;
		// External fragment changes (for example a footer Settings action) also
		// dismiss the modal drawer so it cannot cover the newly opened screen.
		activity.closeDrawer();
	});
	return {
		get activity(): typeof activity {
			return activity;
		},
		get navigator(): typeof navigator {
			return navigator;
		},
		get scrolled(): typeof scrolled {
			return scrolled;
		},
		set scrolled(__nextValue: typeof scrolled) {
			scrolled = __nextValue;
		},
		get content(): typeof content {
			return content;
		},
		set content(__nextValue: typeof content) {
			content = __nextValue;
		}
	};
}
export default createActivityComponentState;
