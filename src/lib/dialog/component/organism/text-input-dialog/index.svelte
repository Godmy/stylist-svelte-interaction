<script lang="ts">
	interface TextInputDialogProps {
		open?: boolean;
		title?: string;
		path?: string;
		value?: string;
		loading?: boolean;
		saving?: boolean;
		error?: string;
		placeholder?: string;
		rows?: number;
		onClose?: () => void;
		onSave?: () => void;
		class?: string;
	}

	let {
		open = false,
		title = 'Input',
		path = '',
		value = $bindable(''),
		loading = false,
		saving = false,
		error = '',
		placeholder = '',
		rows = 14,
		onClose,
		onSave,
		class: className = ''
	}: TextInputDialogProps = $props();
</script>

{#if open}
	<div class="c-text-input-dialog {className}" role="presentation">
		<div
			class="dialog"
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			aria-labelledby="text-input-dialog-title"
		>
			<header class="dialog-head">
				<div>
					<h2 id="text-input-dialog-title">{title}</h2>
					{#if path}<p class="dialog-path">{path}</p>{/if}
				</div>
			</header>

			<div class="dialog-body">
				{#if loading}
					<p class="dialog-status">Loading...</p>
				{:else}
					<textarea class="dialog-textarea" {rows} bind:value {placeholder}></textarea>
				{/if}

				{#if error}
					<p class="dialog-error">{error}</p>
				{/if}
			</div>

			<footer class="dialog-actions">
				<button type="button" class="dialog-button" onclick={onClose}>Cancel</button>
				<button
					type="button"
					class="dialog-button dialog-button--primary"
					disabled={loading || saving}
					onclick={onSave}
				>
					{saving ? 'Saving...' : 'Save'}
				</button>
			</footer>
		</div>
	</div>
{/if}

<style>
	.c-text-input-dialog {
		position: fixed;
		inset: 0;
		z-index: 40;
		display: grid;
		place-items: center;
		padding: 1rem;
		background: rgba(15, 23, 42, 0.6);
	}

	.dialog {
		width: min(720px, 100%);
		display: grid;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 16px;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		box-shadow: 0 24px 80px rgba(15, 23, 42, 0.35);
	}

	.dialog-head {
		display: grid;
		gap: 0.25rem;
	}

	.dialog-head h2 {
		margin: 0;
		font-size: 18px;
	}

	.dialog-path {
		margin: 0;
		font-family: var(--font-mono, monospace);
		font-size: 12px;
		color: var(--color-text-secondary);
		word-break: break-all;
	}

	.dialog-body {
		display: grid;
		gap: 0.75rem;
	}

	.dialog-textarea {
		width: 100%;
		min-height: 280px;
		padding: 0.9rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 12px;
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
		font: inherit;
		line-height: 1.5;
		resize: vertical;
	}

	.dialog-status,
	.dialog-error {
		margin: 0;
		font-size: 13px;
	}

	.dialog-error {
		color: #b91c1c;
	}

	.dialog-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}

	.dialog-button {
		border: 1px solid var(--color-border-primary);
		border-radius: 10px;
		background: var(--color-background-secondary);
		color: var(--color-text-primary);
		padding: 0.55rem 0.85rem;
		font: inherit;
		cursor: pointer;
	}

	.dialog-button--primary {
		background: var(--color-primary-500);
		border-color: var(--color-primary-500);
		color: white;
	}

	.dialog-button--primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
