<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import FormHeader from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'title', type: 'text', defaultValue: 'Personal information' },
		{ name: 'subtitle', type: 'text', defaultValue: 'Step 1 of 3' },
		{
			name: 'description',
			type: 'text',
			defaultValue: 'Fill in profile details to continue setup.'
		},
		{ name: 'showBackButton', type: 'boolean', defaultValue: true },
		{ name: 'backButtonLabel', type: 'text', defaultValue: 'Back' }
	];
</script>

<Story
	component={FormHeader}
	title="FormHeader"
	description="Consistent heading section for multi-step forms."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<FormHeader
				title={values.title}
				subtitle={values.subtitle}
				description={values.description}
				backButtonLabel={values.backButtonLabel}
				backAction={values.showBackButton ? () => {} : undefined}
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
