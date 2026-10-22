<script lang="ts">
	import FollowButton from '$stylist/button/component/atom/follow-button/index.svelte';
	import type { RecipeFollowButton } from '$stylist/button/interface/recipe/follow-button';

	// Render of index.story.ts: isFollowing is host-controlled, so the story keeps it in local state and simulates the request in async callbacks.
	let args: RecipeFollowButton = $props();
	// Starts from the arg (the Following preset) and then follows the simulated requests.
	let isFollowing = $derived(args.isFollowing ?? false);

	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
</script>

<FollowButton
	{...args}
	{isFollowing}
	onFollow={async () => {
		await delay(500);
		isFollowing = true;
	}}
	onUnfollow={async () => {
		await delay(500);
		isFollowing = false;
	}}
/>
