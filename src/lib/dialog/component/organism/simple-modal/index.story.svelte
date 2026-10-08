<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import SimpleModal from './index.svelte';

	type Props = {
		open: boolean;
		title: string;
	};

	const controls: SlotStory[] = [
		{
			name: 'open',
			type: 'boolean',
			defaultValue: false
		},
		{
			name: 'title',
			type: 'text',
			defaultValue: 'Notice'
		}
	];

	let isOpen = $state(false);

	function handleClose() {
		isOpen = false;
	}

	function handleOpen() {
		isOpen = true;
	}
</script>

<Story
	id="organisms-simple-modal"
	title="Organisms / Interaction / Dialogs / Simple Modal"
	component={SimpleModal}
	category="Organisms/Interaction/Dialogs"
	description="A simple modal dialog component."
	tags={['dialog', 'modal', 'simple']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-simple-modal _c1">
			<button class="_c2" onclick={handleOpen}> Open Simple Modal </button>
			<SimpleModal open={isOpen} title={values.title} onClose={handleClose} />
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		margin-bottom: 1rem;
		border-radius: 0.25rem;
		background-color: var(--color-primary-600);
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		color: var(--color-text-inverse);
	}
</style>
