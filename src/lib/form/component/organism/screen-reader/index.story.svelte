<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';

	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import ScreenReader from './index.svelte';

	type Props = {
		showSkipLink: boolean;

		showAriaLive: boolean;

		showAnnouncements: boolean;

		announcePageChanges: boolean;
	};

	const controls: SlotStory[] = [
		{ name: 'showSkipLink', type: 'boolean', defaultValue: true },

		{ name: 'showAriaLive', type: 'boolean', defaultValue: true },

		{ name: 'showAnnouncements', type: 'boolean', defaultValue: true },

		{ name: 'announcePageChanges', type: 'boolean', defaultValue: true }
	];

	function handleAnnounce(message: string) {
		console.log('Announced:', message);
	}
</script>

<Story
	id="organisms-screen-reader"
	title="Organisms / Interaction / Forms / Screen Reader"
	component={ScreenReader}
	category="Organisms/Interaction/Forms"
	description="A screen reader support component providing accessibility features and ARIA announcements."
	tags={['accessibility', 'screen-reader', 'aria', 'a11y']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-screen-reader _c1 _c1">
			<h1 class="_c2">ScreenReader Component</h1>

			<div class="_c3">
				<h2 class="_c4">Interactive ScreenReader</h2>

				<div class="_c5">
					<ScreenReader />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 0;

		position: absolute;

		width: 1px;

		height: 1px;

		margin: -1px;

		overflow: hidden;

		clip: rect(0, 0, 0, 0);

		white-space: nowrap;

		border-width: 0;

		background-color: var(--color-primary-600);

		color: var(--color-text-inverse);

		padding-left: 1rem;

		padding-right: 1rem;

		padding-top: 0.5rem;

		padding-bottom: 0.5rem;

		border-radius: 0.375rem;
	}

	._c2 {
		margin-bottom: 1rem;

		font-size: 1.125rem;

		line-height: 1.75rem;

		font-weight: 600;
	}

	._c3 {
		margin-bottom: 1.5rem;

		border-radius: 0.25rem;

		border-width: 1px;

		border-style: solid;

		padding: 1rem;
	}

	._c4 {
		font-size: 1rem;

		line-height: 1.5rem;

		margin-bottom: 0.5rem;

		font-weight: 600;
	}

	._c5 {
		max-width: 32rem;
	}

	._c1:focus {
		position: absolute;

		top: 1rem;

		left: 1rem;
	}

	._c1 {
		z-index: var(--z-index-modal);
	}
</style>
