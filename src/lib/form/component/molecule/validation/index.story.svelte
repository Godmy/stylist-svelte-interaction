<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import FormFieldGroup from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'label',
			type: 'text' as TokenControllerType,
			defaultValue: 'Email Address',
			description: 'Label for the form field'
		},
		{
			name: 'description',
			type: 'text' as TokenControllerType,
			defaultValue: "We'll never share your email with anyone else.",
			description: 'Description for the form field'
		},
		{
			name: 'required',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the field is required'
		},
		{
			name: 'error',
			type: 'text' as TokenControllerType,
			defaultValue: '',
			description: 'Error message to display'
		}
	];
</script>

<Story
	{controls}
	title="FormFieldGroup Component"
	description="Form field group component with label, description, and error support"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<FormFieldGroup
				label={controlValues.label}
				description={controlValues.description}
				required={controlValues.required}
				error={controlValues.error}
			>
				<input type="email" placeholder="email@example.com" class="_c2 _c1" />
			</FormFieldGroup>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 2rem;
	}
	._c2 {
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
		._c2 {
			font-size: 0.875rem;
			line-height: 1.25rem;
		}
	}

	._c1:focus {
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 3px var(--color-indigo-500);
	}
</style>
