<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import FollowButton from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'showText', type: 'boolean', defaultValue: true },
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'primary',
			options: ['primary', 'secondary', 'outline', 'ghost']
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];

	let isFollowing = $state(false);

	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
</script>

<Story
	{controls}
	component={FollowButton}
	title="FollowButton"
	category="Atoms/Interaction/Controls/Buttons"
	description="Toggle follow/unfollow action button. Click it below: it shows a loading spinner while the (simulated) request is in flight, then switches state — hover it while following to preview the 'Unfollow' danger state."
>
	{#snippet children(values: any)}
		<FollowButton
			{isFollowing}
			showText={values.showText as boolean}
			variant={values.variant as 'primary' | 'secondary' | 'outline' | 'ghost'}
			size={values.size as 'sm' | 'md' | 'lg'}
			disabled={values.disabled as boolean}
			onFollow={async () => {
				await delay(500);
				isFollowing = true;
			}}
			onUnfollow={async () => {
				await delay(500);
				isFollowing = false;
			}}
		/>
	{/snippet}
</Story>
