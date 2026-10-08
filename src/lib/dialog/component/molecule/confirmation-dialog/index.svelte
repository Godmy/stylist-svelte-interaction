<script lang="ts">
	import type { RecipeConfirmationDialog } from '$stylist/dialog/interface/recipe/confirmation-dialog';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import { createConfirmationDialogState } from './state.svelte';

	let {
		open = false,
		title = 'Confirm Action',
		message = 'Are you sure you want to perform this action?',
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		onConfirm,
		onCancel,
		onClose = () => {},
		variant = 'warning',
		class: hostClass = '',
		contentClass = '',
		headerClass = '',
		bodyClass = '',
		footerClass = '',
		size = 'md',
		...restProps
	}: RecipeConfirmationDialog = $props();

	const state = createConfirmationDialogState({
		open,
		title,
		message,
		confirmText,
		cancelText,
		onConfirm,
		onCancel,
		onClose,
		variant,
		class: hostClass,
		contentClass,
		headerClass,
		bodyClass,
		footerClass,
		size
	});
</script>

{#if open}
	<div class="confirmation-dialog__overlay" {...restProps}>
		<div class="confirmation-dialog__content">
			<h3 class="confirmation-dialog__header">{title}</h3>
			<p class="confirmation-dialog__body">{message}</p>
			<div class="confirmation-dialog__footer">
				<Button variant="secondary" onclick={state.handleCancel}>
					{cancelText}
				</Button>
				<Button variant="primary" onclick={state.handleConfirm}>
					{confirmText}
				</Button>
			</div>
		</div>
	</div>
{/if}

<style>
</style>
