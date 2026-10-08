<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import FormWithValidation from './index.svelte';
</script>

<Story
	id="organisms-form-with-validation"
	title="Organisms / Interaction / Forms / Form With Validation"
	component={FormWithValidation}
	category="Organisms/Interaction/Forms"
	description="A form component with comprehensive validation for various input types."
	tags={['form', 'validation', 'inputs']}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-form-with-validation _c1">
			<h1 class="_c2">FormWithValidation Component</h1>

			<div class="_c3">
				<h2 class="_c4">Interactive FormWithValidation</h2>
				<div class="_c5">
					<FormWithValidation />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c1 > * + * {
		margin-top: 1.5rem;
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
</style>
