<script lang="ts">
	import TextInputDialog from './index.svelte';
	import type { RecipeTextInputDialog } from '$stylist/dialog/interface/recipe/text-input-dialog';

	// Render of index.story.ts: the textarea is bound to a local draft, and the error message follows its length.
	let args: RecipeTextInputDialog = $props();
	let draft = $state(
		'Document the edge cases for this component story.\nAdd concrete examples for keyboard and pointer states.'
	);
	const error = $derived(draft.length < 20 ? 'Draft should contain at least 20 characters.' : '');
</script>

<div class="_c1">
	<TextInputDialog {...args} bind:value={draft} {error} />
</div>

<style>
	._c1 {
		position: relative;
		min-height: 42rem;
		border-radius: 1.5rem;
		padding: 1rem;
	}
</style>
