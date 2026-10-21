<script lang="ts">
	// Render of index.story.ts: the count follows a textarea bound to local state.
	import CharactersCount from './index.svelte';
	import type { RecipeCharactersCount } from '$stylist/input/interface/recipe/characters-count';

	let { disabled = false, ...args }: RecipeCharactersCount & { disabled?: boolean } = $props();
	let draft = $state('The quick brief for a new onboarding screen.');
</script>

<div class="_c1">
	<textarea class="_c2" bind:value={draft} maxlength={args.max} {disabled} rows="4"></textarea>
	<CharactersCount {...args} current={draft.length} />
</div>

<style>
	._c1 {
		display: grid;
		gap: 0.5rem;
		max-width: 32rem;
	}
	._c2 {
		width: 100%;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		padding: 0.75rem;
		font: inherit;
		resize: vertical;
	}
</style>
