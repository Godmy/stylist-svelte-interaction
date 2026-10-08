<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import DialogConfirm from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'isOpen',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the dialog is open'
		},
		{
			name: 'title',
			type: 'text' as TokenControllerType,
			defaultValue: 'Delete Item',
			description: 'Title of the dialog'
		},
		{
			name: 'message',
			type: 'text' as TokenControllerType,
			defaultValue: 'Are you sure you want to delete this item? This action cannot be undone.',
			description: 'Message content of the dialog'
		},
		{
			name: 'confirmText',
			type: 'text' as TokenControllerType,
			defaultValue: 'Delete',
			description: 'Text for the confirm button'
		},
		{
			name: 'cancelText',
			type: 'text' as TokenControllerType,
			defaultValue: 'Cancel',
			description: 'Text for the cancel button'
		},
		{
			name: 'variant',
			type: 'select' as TokenControllerType,
			defaultValue: 'danger',
			options: ['danger', 'warning', 'info'],
			description: 'Visual variant of the dialog'
		},
		{
			name: 'isLoading',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the dialog is in loading state'
		}
	];

	function handleClose() {
		console.log('Dialog closed');
	}

	function handleConfirm() {
		console.log('Confirmed action');
	}
</script>

<Story
	{controls}
	title="DialogConfirm Component"
	description="A confirmation dialog component with different variants"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<DialogConfirm
				isOpen={controlValues.isOpen}
				title={controlValues.title}
				message={controlValues.message}
				confirmText={controlValues.confirmText}
				cancelText={controlValues.cancelText}
				variant={controlValues.variant}
				isLoading={controlValues.isLoading}
				onClose={handleClose}
				onConfirm={handleConfirm}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
</style>
