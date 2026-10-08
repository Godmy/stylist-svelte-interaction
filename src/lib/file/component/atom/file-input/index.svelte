<script lang="ts">
	import { createFileInputState } from './state.svelte';
	import type { RecipeFileInput } from '$stylist/file/interface/recipe/file-input';

	let props: RecipeFileInput = $props();
	const state = createFileInputState(() => props);
</script>

<div class="fi-wrapper">
	<label class={`fi-label ${state.classes}`.trim()}>
		<input
			bind:this={state.inputElement}
			type="file"
			multiple={state.multiple}
			accept={state.accept}
			disabled={state.disabled}
			onchange={state.handleChange}
			class="fi-hidden"
		/>
		<span class="fi-content">
			{#if state.fileName}
				<span class="fi-filename">{state.fileName}</span>
				<button
					type="button"
					class="fi-clear-btn"
					onclick={(e) => {
						e.stopPropagation();
						state.clearSelection();
					}}
					aria-label="Clear file"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="fi-icon-sm"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="fi-icon-md"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
				<span>{state.placeholder}</span>
			{/if}
		</span>
	</label>
</div>

<style>
	.fi-wrapper {
		position: relative;
	}

	.fi-label {
		display: flex;
		cursor: pointer;
		align-items: center;
		justify-content: center;
	}

	.fi-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	.fi-content {
		display: flex;
		align-items: center;
	}

	.fi-filename {
		margin-right: 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fi-clear-btn {
		color: var(--color-text-secondary);
	}

	.fi-clear-btn:hover {
		color: var(--color-text-primary);
	}

	.fi-icon-sm {
		width: 1rem;
		height: 1rem;
	}
	.fi-icon-md {
		margin-right: 0.5rem;
		width: 1.25rem;
		height: 1.25rem;
	}
</style>
