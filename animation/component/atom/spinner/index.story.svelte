<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Spinner from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{ name: 'label', type: 'text', defaultValue: 'Loading' }
	];
</script>

<Story
	id="atoms-information-spinner"
	title="Spinner"
	component={Spinner}
	category="Atoms"
	description="Indeterminate loading indicator."
	tags={['spinner', 'loading', 'information']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<div class="_c2">
				<Spinner size={values.size} label={String(values.label || 'Loading')} />
				<span>{String(values.label || 'Loading')}</span>
			</div>
			<div class="_c3">
				<Spinner size="sm" />
				<Spinner size="md" />
				<Spinner size="lg" />
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		width: min(100%, 20rem);
		gap: 1rem;
		padding: 1.25rem;
		background: var(--color-background-secondary, #f8fafc);
		border: 1px solid var(--color-border-primary, #e2e8f0);
		border-radius: 0.5rem;
		box-shadow: 0 0.75rem 1.75rem color-mix(in srgb, var(--color-text-primary) 10%, transparent);
	}

	._c2 {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		color: var(--color-text-primary);
		font-weight: 600;
	}

	._c3 {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		color: var(--color-primary-600);
	}
</style>
