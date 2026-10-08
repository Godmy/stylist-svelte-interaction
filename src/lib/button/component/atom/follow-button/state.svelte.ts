import type { RecipeFollowButton } from '$stylist/button/interface/recipe/follow-button';

export function createFollowButtonState(getProps: () => RecipeFollowButton) {
	const props = $derived(getProps());
	const isFollowing = $derived(props.isFollowing ?? false);
	const showText = $derived(props.showText ?? true);
	const variant = $derived(props.variant ?? 'primary');
	const size = $derived(props.size ?? 'md');
	const disabled = $derived(props.disabled ?? false);
	const followingText = $derived(props.followingText ?? 'Following');
	const unfollowText = $derived(props.unfollowText ?? 'Follow');

	const buttonText = $derived(isFollowing ? followingText : unfollowText);
	const ariaLabel = $derived(isFollowing ? 'Unfollow user' : 'Follow user');
	let isPending = $state(false);

	return {
		get isFollowing() {
			return isFollowing;
		},
		get showText() {
			return showText;
		},
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get disabled() {
			return disabled;
		},
		get text() {
			return buttonText;
		},
		get classes() {
			return 'c-follow-button';
		},
		get ariaLabel() {
			return ariaLabel;
		},
		get isPending() {
			return isPending;
		},
		async handleToggle() {
			if (disabled || isPending) return;

			isPending = true;

			if (isFollowing) {
				await props.onUnfollow?.();
			} else {
				await props.onFollow?.();
			}

			isPending = false;
		}
	};
}
