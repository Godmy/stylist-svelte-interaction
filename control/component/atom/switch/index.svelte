<script lang="ts">
	import type { RecipeSwitch } from '$stylist/control/interface/recipe/switch';
	import createSwitchState from './state.svelte';

	let {
		id: _id,
		label: _label,
		description: _description,
		size: _size,
		disabled: _disabled,
		checked = $bindable<boolean>(false),
		required: _required,
		class: _className,
		ariaLabel: _ariaLabel,
		name: _name,
		...props
	}: RecipeSwitch = $props();

	const state = createSwitchState(
		{
			...props,
			id: _id,
			label: _label,
			description: _description,
			size: _size,
			disabled: _disabled,
			checked,
			required: _required,
			class: _className,
			ariaLabel: _ariaLabel,
			name: _name
		},
		checked
	);
</script>

<label
	class={['c-switch', _className].filter(Boolean).join(' ')}
	data-size={state.size}
	data-checked={checked || undefined}
	data-disabled={state.disabled || undefined}
	data-label-position={state.labelPosition}
>
	<span class="c-switch__track">
		<input
			id={state.generatedId}
			name={state.name}
			type="checkbox"
			bind:checked
			disabled={state.disabled}
			required={state.required}
			class="c-switch__input"
			aria-label={state.ariaLabel}
			aria-describedby={state.descriptionId}
			aria-checked={checked ? 'true' : 'false'}
			role="switch"
			{...state.restProps}
		/>
		<span class="c-switch__knob" aria-hidden="true"></span>
	</span>

	{#if state.label || state.description}
		<span class="c-switch__label-group">
			{#if state.label}
				<span class="c-switch__label">
					{state.label}
					{#if state.required}
						<span class="c-switch__required" aria-hidden="true">*</span>
					{/if}
				</span>
			{/if}
			{#if state.description}
				<span id={state.descriptionId} class="c-switch__description">
					{state.description}
				</span>
			{/if}
		</span>
	{/if}
</label>

<style>
	.c-switch {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
	}

	.c-switch[data-label-position='left'] {
		flex-direction: row-reverse;
	}

	.c-switch[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	.c-switch__track {
		--sw-track-width: 2.75rem;
		--sw-track-height: 1.5rem;
		--sw-knob-size: 1.125rem;
		--sw-inset: 0.1875rem;
		position: relative;
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		width: var(--sw-track-width);
		height: var(--sw-track-height);
		border-radius: 9999px;
		border: 0;
		background: var(--color-border-primary);
		transition: background-color 200ms;
		cursor: pointer;
	}

	.c-switch[data-size='xs'] .c-switch__track {
		--sw-track-width: 2rem;
		--sw-track-height: 1rem;
		--sw-knob-size: 0.75rem;
		--sw-inset: 0.125rem;
	}

	.c-switch[data-size='sm'] .c-switch__track {
		--sw-track-width: 2.25rem;
		--sw-track-height: 1.25rem;
		--sw-knob-size: 0.875rem;
		--sw-inset: 0.1875rem;
	}

	.c-switch[data-size='lg'] .c-switch__track {
		--sw-track-width: 3.5rem;
		--sw-track-height: 1.75rem;
		--sw-knob-size: 1.375rem;
		--sw-inset: 0.1875rem;
	}

	.c-switch[data-size='xl'] .c-switch__track {
		--sw-track-width: 4rem;
		--sw-track-height: 2rem;
		--sw-knob-size: 1.625rem;
		--sw-inset: 0.1875rem;
	}

	.c-switch[data-checked] .c-switch__track {
		background: var(--color-primary-500);
	}

	.c-switch__input {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}

	.c-switch__knob {
		display: block;
		width: var(--sw-knob-size);
		height: var(--sw-knob-size);
		border-radius: 9999px;
		background: var(--color-background-primary);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
		transition: transform 200ms;
		transform: translateX(var(--sw-inset));
		pointer-events: none;
	}

	.c-switch[data-size='xs'] .c-switch__knob {
		width: 0.75rem;
		height: 0.75rem;
	}

	.c-switch[data-size='sm'] .c-switch__knob {
		width: 1rem;
		height: 1rem;
	}

	.c-switch[data-size='lg'] .c-switch__knob {
		width: 1.375rem;
		height: 1.375rem;
	}

	.c-switch[data-size='xl'] .c-switch__knob {
		width: 1.625rem;
		height: 1.625rem;
	}

	.c-switch[data-checked] .c-switch__knob {
		transform: translateX(calc(var(--sw-track-width) - var(--sw-knob-size) - var(--sw-inset)));
	}

	.c-switch__label-group {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.c-switch__label {
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		color: var(--color-text-primary);
	}

	.c-switch__description {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.c-switch__required {
		color: var(--color-danger-500, #ef4444);
		margin-left: 0.25rem;
	}
</style>
