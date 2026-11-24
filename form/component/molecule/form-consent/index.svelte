<script lang="ts">
	import type { RecipeFormConsent } from '$stylist/form/interface/recipe/form-consent';
	let {
		name = 'consent',
		value = 'true',
		required = true,
		checked = $bindable(false),
		class: className,
		children,
		...rest
	}: RecipeFormConsent = $props();
</script>

<label {...rest} class={['form-consent', className]}>
	<input type="checkbox" {name} {value} {required} bind:checked />
	<span>{@render children()}</span>
</label>

<style>
	:where(.form-consent) {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3, 0.75rem);
		color: var(--color-text-secondary, #475569);
		font-size: 0.9rem;
		line-height: 1.6;
	}
	:where(.form-consent input) {
		flex-shrink: 0;
		width: 1.125rem;
		height: 1.125rem;
		margin-top: 0.2rem;
		accent-color: var(--color-primary-600, #2563eb);
	}
	:where(.form-consent a) {
		color: var(--color-primary-600, #2563eb);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
