<script lang="ts">
	import type { RecipeContactForm } from '$stylist/form/interface/recipe/contact-form';
	import createContactFormState from '$stylist/form/component/organism/contact-form/state.svelte';
	let props: RecipeContactForm = $props();
	const fieldId = $props.id();
	const state = createContactFormState(() => props);
</script>

<form
	method="POST"
	{...state.rest}
	class={['c-contact-form', 'contact-form', props.class]}
	{@attach props.formAttachment}
>
	{#if props.topicLabel}<div class="topic-chip">
			<span>{state.messages.topic}: {props.topicLabel}</span>
			{#if props.onClearTopic}<button
					type="button"
					aria-label={state.messages.clearTopic}
					onclick={props.onClearTopic}>×</button
				>{/if}
		</div>{/if}
	<input type="hidden" name="topic" value={props.topicValue ?? ''} />
	<input
		type="text"
		name="company"
		class="hp-field"
		tabindex="-1"
		autocomplete="off"
		aria-label={state.messages.honeypot}
	/>
	<div class="field">
		<label for={`${fieldId}-name`}>{state.messages.name}</label><input
			id={`${fieldId}-name`}
			name="name"
			autocomplete="name"
			required
			maxlength="200"
		/>
	</div>
	<div class="field">
		<label for={`${fieldId}-contact`}>{state.messages.contact}</label><input
			id={`${fieldId}-contact`}
			name="contact"
			placeholder={state.messages.contactPlaceholder}
			required
			maxlength="200"
		/>
	</div>
	<div class="field">
		<label for={`${fieldId}-message`}>{state.messages.message}</label><textarea
			id={`${fieldId}-message`}
			name="message"
			required
			maxlength="4000"
			bind:value={state.message}></textarea>
	</div>
	{#if props.feedback}<p
			class="form-message"
			class:success={props.feedback.kind === 'success'}
			class:error={props.feedback.kind === 'error'}
			role={props.feedback.kind === 'error' ? 'alert' : 'status'}
		>
			{props.feedback.message}
			{#if props.feedback.kind === 'error' && props.errorDetails}{@render props.errorDetails()}{/if}
		</p>{/if}
	<label class="contact-consent"
		><input type="checkbox" name="consent" value="yes" required bind:checked={state.consent} /><span
			>{#if props.consentContent}{@render props.consentContent()}{:else}{state.messages
					.consent}{/if}</span
		></label
	>
	<button
		type="submit"
		class="submit btn btn-primary btn-block"
		disabled={props.submitting || !state.consent}
		>{props.submitting ? state.messages.submitting : state.messages.submit}</button
	>
	<p class="form-note">{state.messages.note}</p>
	{#if props.footer}{@render props.footer()}{/if}
</form>

<style>
	.c-contact-form {
		min-width: 0;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.8rem;
		background: var(--color-background-raised, var(--color-background-primary));
		padding: clamp(1.25rem, 3vw, 2rem);
		display: grid;
		gap: 1.25rem;
	}
	.field {
		display: grid;
		gap: 0.6rem;
	}
	.field label {
		color: var(--color-text-primary);
		font-size: 0.85rem;
	}
	.field input,
	.field textarea {
		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.4rem;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		padding: 0.85rem 1rem;
		font: inherit;
	}
	.field textarea {
		resize: vertical;
		min-height: 10rem;
	}
	.field input:focus,
	.field textarea:focus {
		outline: 2px solid var(--color-border-accent, var(--color-primary-400));
		outline-offset: 2px;
	}
	.hp-field {
		position: absolute;
		left: -10000px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
	.form-message {
		padding: 1rem;
		border: 1px solid currentColor;
		border-radius: 0.4rem;
	}
	.success {
		color: var(--color-success-600, #16a34a);
	}
	.error {
		color: var(--color-error-400, #e2685a);
	}
	.contact-consent {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--color-text-primary);
	}
	.contact-consent input {
		width: 20px;
		height: 20px;
		margin-top: 0.2rem;
		flex-shrink: 0;
		accent-color: var(--color-primary-400);
	}
	.topic-chip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		border: 1px solid var(--color-border-accent);
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		color: var(--color-text-primary);
	}
	.topic-chip button {
		background: none;
		border: 0;
		color: inherit;
		min-height: 44px;
		min-width: 44px;
		cursor: pointer;
	}
	.submit {
		width: 100%;
		min-height: 44px;
		padding: 0.75rem 1rem;
		font: inherit;
		font-weight: 600;
		border: 0;
		border-radius: 0.5rem;
		cursor: pointer;
		background: var(--color-primary-400);
		color: var(--color-on-primary);
	}
	.submit:disabled {
		cursor: wait;
		opacity: 0.65;
	}
	.submit:focus-visible {
		outline: 2px solid var(--color-border-accent);
		outline-offset: 2px;
	}
	.form-note {
		font-size: 0.8rem;
		color: var(--color-text-secondary);
	}
</style>
