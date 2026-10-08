<script lang="ts">
	import { onMount } from 'svelte';
	import type { RecipeSchemaFormDialog } from '$stylist/form/interface/recipe/schema-form-dialog';
	import Button from '$stylist/button/component/atom/button/index.svelte';

	let {
		isOpen,
		mode,
		title,
		subtitle,
		fields,
		initialData,
		onClose,
		onSave
	}: RecipeSchemaFormDialog = $props();

	let formData = $state<Record<string, any>>({});
	let isSaving = $state(false);
	let errors = $state<Record<string, string>>({});

	$effect(() => {
		if (isOpen) {
			if (mode === 'edit' && initialData) {
				formData = { ...initialData };
			} else {
				const newData: Record<string, any> = {};
				fields.forEach((field) => {
					if (!field.primaryKey) {
						newData[field.name] = initialData?.[field.name] ?? '';
					}
				});
				formData = newData;
			}
			errors = {};
		}
	});

	function handleClose() {
		if (!isSaving) {
			onClose();
		}
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	}

	function getInputType(fieldType: string): string {
		const type = fieldType.toLowerCase();
		if (type.includes('int') || type.includes('numeric') || type.includes('decimal'))
			return 'number';
		if (type.includes('bool')) return 'checkbox';
		if (type.includes('date') && !type.includes('timestamp')) return 'date';
		if (type.includes('timestamp') || type.includes('datetime')) return 'datetime-local';
		if (type.includes('text')) return 'textarea';
		return 'text';
	}

	function validateForm(): boolean {
		const newErrors: Record<string, string> = {};
		fields.forEach((field) => {
			if (field.primaryKey && mode === 'create') return;
			const value = formData[field.name];
			const isEmpty = value === null || value === undefined || value === '';
			if (!field.nullable && isEmpty && !field.default) {
				newErrors[field.name] = 'This field is required';
			}
		});
		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!validateForm()) return;

		isSaving = true;
		try {
			const cleanedData: Record<string, unknown> = {};
			Object.entries(formData).forEach(([key, value]) => {
				const field = fields.find((f) => f.name === key);
				if (value === '' && field?.nullable) {
					cleanedData[key] = null;
				} else if (value !== '' || !field?.nullable) {
					cleanedData[key] = value;
				}
			});
			await onSave(cleanedData);
			handleClose();
		} catch (error) {
			errors._form = error instanceof Error ? error.message : 'Failed to save';
		} finally {
			isSaving = false;
		}
	}

	onMount(() => {
		const handleWindowEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) handleClose();
		};
		window.addEventListener('keydown', handleWindowEscape);
		return () => window.removeEventListener('keydown', handleWindowEscape);
	});
</script>

{#if isOpen}
	<div
		class="c-schema-form-dialog"
		onclick={handleBackdropClick}
		onkeydown={(e) => e.key === 'Escape' && handleClose()}
		role="dialog"
		aria-modal="true"
		tabindex={-1}
	>
		<div class="c-schema-form-dialog__panel">
			<div class="c-schema-form-dialog__header">
				<div>
					<h2 class="c-schema-form-dialog__title">{title}</h2>
					{#if subtitle}
						<p class="c-schema-form-dialog__subtitle">{subtitle}</p>
					{/if}
				</div>
				<button
					class="c-schema-form-dialog__close"
					onclick={handleClose}
					disabled={isSaving}
					aria-label="Close"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
				</button>
			</div>

			<form class="c-schema-form-dialog__form" onsubmit={handleSubmit}>
				{#if errors._form}
					<div class="c-schema-form-dialog__form-error">{errors._form}</div>
				{/if}

				<div class="c-schema-form-dialog__fields">
					{#each fields as field (field.name)}
						{#if !field.primaryKey || mode === 'edit'}
							<div class="c-schema-form-dialog__field">
								<label class="c-schema-form-dialog__label" for={field.name}>
									{field.name}
									{#if field.primaryKey}
										<span class="c-schema-form-dialog__pk-badge">(Primary Key)</span>
									{/if}
									{#if !field.nullable}
										<span class="c-schema-form-dialog__required">*</span>
									{/if}
								</label>

								<div class="c-schema-form-dialog__control">
									{#if getInputType(field.type) === 'checkbox'}
										<input
											id={field.name}
											type="checkbox"
											bind:checked={formData[field.name]}
											disabled={field.primaryKey && mode === 'edit'}
											class="c-schema-form-dialog__checkbox"
										/>
									{:else if getInputType(field.type) === 'textarea'}
										<textarea
											id={field.name}
											bind:value={formData[field.name]}
											disabled={field.primaryKey && mode === 'edit'}
											rows={3}
											class="c-schema-form-dialog__input"
										></textarea>
									{:else}
										<input
											id={field.name}
											type={getInputType(field.type)}
											bind:value={formData[field.name]}
											disabled={field.primaryKey && mode === 'edit'}
											class="c-schema-form-dialog__input"
										/>
									{/if}

									{#if errors[field.name]}
										<p class="c-schema-form-dialog__field-error">{errors[field.name]}</p>
									{/if}
									<p class="c-schema-form-dialog__field-hint">
										Type: {field.type}{field.nullable ? ' • Nullable' : ''}{field.default
											? ` • Default: ${field.default}`
											: ''}
									</p>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</form>

			<div class="c-schema-form-dialog__footer">
				<Button variant="default" onclick={handleClose} disabled={isSaving}>Cancel</Button>
				<Button variant="primary" type="submit" onclick={handleSubmit} loading={isSaving}>
					{mode === 'create' ? 'Create' : 'Update'}
				</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	.c-schema-form-dialog {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background: rgb(0 0 0 / 0.5);
	}
	.c-schema-form-dialog__panel {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 42rem;
		max-height: 90vh;
		background: var(--color-background-primary, #fff);
		border-radius: var(--radius-xl, 0.75rem);
		box-shadow: 0 20px 60px rgb(0 0 0 / 0.2);
	}
	.c-schema-form-dialog__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--color-border-primary, #e5e7eb);
		padding: 1.25rem 1.5rem;
		flex-shrink: 0;
	}
	.c-schema-form-dialog__title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text-primary, #111827);
		margin: 0;
	}
	.c-schema-form-dialog__subtitle {
		font-size: 0.875rem;
		color: var(--color-text-secondary, #6b7280);
		margin: 0.25rem 0 0;
	}
	.c-schema-form-dialog__close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border: none;
		border-radius: var(--radius-md, 0.375rem);
		background: transparent;
		color: var(--color-text-tertiary, #9ca3af);
		cursor: pointer;
		transition:
			background 0.12s,
			color 0.12s;
	}
	.c-schema-form-dialog__close:hover {
		background: var(--color-background-secondary, #f3f4f6);
		color: var(--color-text-secondary, #374151);
	}
	.c-schema-form-dialog__close:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.c-schema-form-dialog__form {
		flex: 1;
		overflow-y: auto;
		padding: 1.5rem;
	}
	.c-schema-form-dialog__form-error {
		margin-bottom: 1rem;
		padding: 0.75rem;
		border-radius: var(--radius-md, 0.375rem);
		background: #fef2f2;
		color: #b91c1c;
		font-size: 0.875rem;
	}
	.c-schema-form-dialog__fields {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.c-schema-form-dialog__field {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}
	.c-schema-form-dialog__label {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary, #374151);
	}
	.c-schema-form-dialog__pk-badge {
		font-size: 0.75rem;
		color: var(--color-primary-600, #4f46e5);
	}
	.c-schema-form-dialog__required {
		color: #ef4444;
	}
	.c-schema-form-dialog__control {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.c-schema-form-dialog__input {
		display: block;
		width: 100%;
		border: 1px solid var(--color-border-primary, #d1d5db);
		border-radius: var(--radius-md, 0.375rem);
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		color: var(--color-text-primary, #111827);
		background: var(--color-background-primary, #fff);
		box-sizing: border-box;
	}
	.c-schema-form-dialog__input:focus {
		outline: none;
		border-color: var(--color-primary-500, #6366f1);
		box-shadow: 0 0 0 2px rgb(99 102 241 / 0.15);
	}
	.c-schema-form-dialog__input:disabled {
		background: var(--color-background-secondary, #f9fafb);
		opacity: 0.7;
		cursor: not-allowed;
	}
	.c-schema-form-dialog__checkbox {
		width: 1rem;
		height: 1rem;
		accent-color: var(--color-primary-600, #4f46e5);
	}
	.c-schema-form-dialog__field-error {
		font-size: 0.75rem;
		color: #dc2626;
		margin: 0;
	}
	.c-schema-form-dialog__field-hint {
		font-size: 0.75rem;
		color: var(--color-text-tertiary, #9ca3af);
		margin: 0;
	}
	.c-schema-form-dialog__footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.75rem;
		border-top: 1px solid var(--color-border-primary, #e5e7eb);
		padding: 1rem 1.5rem;
		flex-shrink: 0;
	}
</style>
