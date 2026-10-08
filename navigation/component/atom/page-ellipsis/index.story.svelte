<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import PageEllipsis from './index.svelte';

	const controls: SlotStory[] = [{ name: 'class', type: 'text', defaultValue: '' }];
</script>

<Story
	component={PageEllipsis}
	title="PageEllipsis"
	description="Pagination overflow marker between distant page buttons."
	{controls}
>
	{#snippet children(values: any)}
		<nav class="_c1">
			<button class="_c2">1</button>
			<PageEllipsis class={values.class} />
			<button class="_c2">8</button>
			<button class="_c3">9</button>
			<button class="_c2">10</button>
			<PageEllipsis class={values.class} />
			<button class="_c2">24</button>
		</nav>
	{/snippet}
</Story>

<style>
	._c1 {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	._c2 {
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c3 {
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		background-color: var(--color-primary-600);
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-inverse);
	}
</style>
