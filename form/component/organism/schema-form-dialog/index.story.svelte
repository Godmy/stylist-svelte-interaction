<script lang="ts">
	import SchemaFormDialog from '$stylist/form/component/organism/schema-form-dialog/index.svelte';
	import type { RecipeSchemaFormDialog } from '$stylist/form/interface/recipe/schema-form-dialog';

	// Render of index.story.ts: the dialog's open state and the saved data live in the story.
	let { initialData, ...args }: Partial<RecipeSchemaFormDialog> = $props();

	let isOpen = $state(true);
	let savedData = $state<Record<string, unknown> | null>(null);

	async function handleSave(data: Record<string, unknown>) {
		savedData = data;
	}
</script>

<div class="schema-form-dialog-story">
	<button class="schema-form-dialog-story__trigger" type="button" onclick={() => (isOpen = true)}>
		Open dialog
	</button>

	{#if savedData}
		<pre class="schema-form-dialog-story__output">{JSON.stringify(savedData, null, 2)}</pre>
	{/if}

	<SchemaFormDialog
		{...args}
		mode={args.mode ?? 'create'}
		title={args.title ?? ''}
		fields={args.fields ?? []}
		{isOpen}
		initialData={args.mode === 'edit' ? initialData : undefined}
		onClose={() => (isOpen = false)}
		onSave={handleSave}
	/>
</div>

<style>
	.schema-form-dialog-story {
		display: grid;
		gap: 1rem;
	}

	.schema-form-dialog-story__trigger {
		width: fit-content;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		padding: 0.5rem 0.875rem;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		font: inherit;
		cursor: pointer;
	}

	.schema-form-dialog-story__output {
		max-width: 40rem;
		overflow: auto;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.375rem;
		padding: 0.75rem;
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
		font-size: 0.8125rem;
	}
</style>
