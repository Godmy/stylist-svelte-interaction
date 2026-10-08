<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import SchemaFormDialog from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'title', type: 'text', defaultValue: 'Create profile' },
		{ name: 'subtitle', type: 'text', defaultValue: 'Fill in the schema-backed fields.' },
		{ name: 'mode', type: 'select', defaultValue: 'create', options: ['create', 'edit'] }
	];

	let isOpen = $state(true);
	let savedData = $state<Record<string, unknown> | null>(null);

	const fields = [
		{ name: 'id', type: 'integer', nullable: false, primaryKey: true, default: null },
		{ name: 'name', type: 'text', nullable: false, primaryKey: false, default: null },
		{ name: 'email', type: 'text', nullable: false, primaryKey: false, default: null },
		{ name: 'active', type: 'boolean', nullable: false, primaryKey: false, default: 'true' },
		{ name: 'notes', type: 'text', nullable: true, primaryKey: false, default: null }
	];

	const initialData = {
		id: 42,
		name: 'Dmitrii',
		email: 'dmitrii@example.com',
		active: true,
		notes: 'Existing record'
	};

	async function handleSave(data: Record<string, unknown>) {
		savedData = data;
	}
</script>

<Story
	{controls}
	component={SchemaFormDialog}
	title="SchemaFormDialog"
	category="Organisms/Interaction/Forms"
	description="Dialog form generated from schema field metadata."
	tags={['schema', 'dialog', 'form']}
>
	{#snippet children(values: any)}
		<div class="schema-form-dialog-story">
			<button
				class="schema-form-dialog-story__trigger"
				type="button"
				onclick={() => (isOpen = true)}
			>
				Open dialog
			</button>

			{#if savedData}
				<pre class="schema-form-dialog-story__output">{JSON.stringify(savedData, null, 2)}</pre>
			{/if}

			<SchemaFormDialog
				{isOpen}
				mode={values.mode as 'create' | 'edit'}
				title={values.title as string}
				subtitle={values.subtitle as string}
				{fields}
				initialData={values.mode === 'edit' ? initialData : undefined}
				onClose={() => (isOpen = false)}
				onSave={handleSave}
			/>
		</div>
	{/snippet}
</Story>

<style>
	.schema-form-dialog-story {
		display: grid;
		gap: 1rem;
		padding: 1rem;
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
