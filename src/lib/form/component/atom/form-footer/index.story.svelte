<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import FormFooter from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'primaryButtonLabel', type: 'text', defaultValue: 'Continue' },
		{ name: 'secondaryButtonLabel', type: 'text', defaultValue: 'Cancel' },
		{ name: 'showSecondaryButton', type: 'boolean', defaultValue: true },
		{ name: 'primaryButtonDisabled', type: 'boolean', defaultValue: false },
		{ name: 'secondaryButtonDisabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={FormFooter}
	title="FormFooter"
	description="Action row with primary and optional secondary button."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<FormFooter
				primaryButtonLabel={values.primaryButtonLabel}
				secondaryButtonLabel={values.secondaryButtonLabel}
				showSecondaryButton={values.showSecondaryButton}
				primaryButtonDisabled={values.primaryButtonDisabled}
				secondaryButtonDisabled={values.secondaryButtonDisabled}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		border-radius: 0.75rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1.25rem;
	}
</style>
