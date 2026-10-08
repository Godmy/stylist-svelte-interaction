<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import FormSection from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'title',
			type: 'text' as TokenControllerType,
			defaultValue: 'Personal Information',
			description: 'Title of the form section'
		},
		{
			name: 'description',
			type: 'text' as TokenControllerType,
			defaultValue: 'Please provide your personal details.',
			description: 'Description of the form section'
		},
		{
			name: 'collapsible',
			type: 'boolean' as TokenControllerType,
			defaultValue: true,
			description: 'Whether the section is collapsible'
		}
	];
</script>

<Story
	{controls}
	title="FormSection Component"
	description="Form section component with optional collapsible functionality"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<FormSection
				title={controlValues.title}
				description={controlValues.description}
				collapsible={controlValues.collapsible}
				initiallyCollapsed={false}
			>
				<div class="_c2">
					<div>
						<label for="form-name" class="_c3">Name</label>
						<input id="form-name" type="text" class="_c4 _c1" />
					</div>

					<div>
						<label for="form-email" class="_c3">Email</label>
						<input id="form-email" type="email" class="_c4 _c1" />
					</div>

					<div>
						<label for="form-phone" class="_c3">Phone</label>
						<input id="form-phone" type="tel" class="_c4 _c1" />
					</div>
				</div>
			</FormSection>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 2rem;
	}
	._c2 > * + * {
		margin-top: 1rem;
	}
	._c3 {
		display: block;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}
	._c4 {
		margin-top: 0.25rem;
		display: block;
		width: 100%;
		border-radius: 0.375rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		padding: 0.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	@media (min-width: 640px) {
		._c4 {
			font-size: 0.875rem;
			line-height: 1.25rem;
		}
	}

	._c1:focus {
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px var(--color-indigo-500);
	}
</style>
