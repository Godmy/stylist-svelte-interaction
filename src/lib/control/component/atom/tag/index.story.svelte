<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Tag from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'text', type: 'text', defaultValue: 'Label' },
		{
			name: 'variant',
			type: 'select',
			defaultValue: 'default',
			options: ['default', 'primary', 'secondary', 'success', 'warning', 'error']
		},
		{ name: 'size', type: 'select', defaultValue: 'md', options: ['sm', 'md', 'lg'] },
		{ name: 'closable', type: 'boolean', defaultValue: false },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={Tag}
	title="Tag"
	category="Atoms/Interaction/Controls"
	description="Тег для маркировки и категоризации контента"
	tags={['tag', 'label', 'badge', 'marker']}
>
	{#snippet children(values: any)}
		<Tag
			text={values.text as string}
			variant={values.variant as
				| 'default'
				| 'primary'
				| 'secondary'
				| 'success'
				| 'warning'
				| 'error'}
			size={values.size as 'sm' | 'md' | 'lg'}
			closable={values.closable as boolean}
			disabled={values.disabled as boolean}
		/>
	{/snippet}
</Story>
