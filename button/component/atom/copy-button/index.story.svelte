<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import CopyButton from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'copyText', type: 'text', defaultValue: 'npm install stylist-svelte' },
		{ name: 'text', type: 'text', defaultValue: 'Copy command' },
		{ name: 'showIcon', type: 'boolean', defaultValue: true },
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'outline',
			options: ['primary', 'secondary', 'success', 'warning', 'danger', 'outline', 'ghost']
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={CopyButton}
	title="CopyButton"
	category="Atoms/Interaction/Controls/Buttons"
	description="Copies the text passed via `copyText` to the clipboard when clicked. The icon and label switch to a checkmark and 'Copied!' for 2 seconds as confirmation, then revert automatically. Typically placed next to a code snippet, API key, or link that the user needs to paste elsewhere."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<pre class="_c2">{values.copyText as string}</pre>
			<CopyButton
				copyText={values.copyText as string}
				text={values.text as string}
				showIcon={values.showIcon as boolean}
				variant={values.variant as any}
				size={values.size as 'sm' | 'md' | 'lg'}
				disabled={values.disabled as boolean}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 > * + * {
		margin-top: 0.75rem;
	}
	._c2 {
		overflow: auto;
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		background-color: var(--color-background-secondary);
		padding: 0.75rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
