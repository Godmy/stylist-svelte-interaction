<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Dialog from './index.svelte';

	type Props = {
		open: boolean;
		title: string;
		description: string;
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
			defaultValue: 'Confirm action'
		},
		{
			name: 'description',
			type: 'text',
			defaultValue: 'Are you sure you want to continue?'
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
	id="organisms-dialog"
	title="Organisms / Interaction / Dialogs / Dialog"
	component={Dialog}
	category="Organisms/Interaction/Dialogs"
	description="A dialog component for user confirmations."
	tags={['dialog', 'confirmation', 'action']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-dialog _c1">
			<button class="_c2" onclick={handleOpen}> Open Dialog </button>
			<Dialog
				open={isOpen}
				title={values.title}
				description={values.description}
				onClose={handleClose}
			/>
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
