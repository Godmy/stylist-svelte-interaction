<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Accordion from '$stylist/dialog/component/molecule/accordion/index.svelte';
	import AccordionGroup from '$stylist/dialog/component/molecule/accordion-group/index.svelte';
	import AccordionLayout from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'title', type: 'text', defaultValue: 'Accordion Item' },
		{ name: 'content', type: 'text', defaultValue: 'Panel content goes here.' },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={AccordionLayout}
	title="AccordionLayout"
	category="Atoms/Interaction/Controls/Accordion"
	description="Базовый строительный блок accordion — заголовок + панель с контентом"
>
	{#snippet children(values: any)}
		<div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 480px;">
			<div>
				<p style="margin-bottom: 0.5rem; font-size: 0.75rem; color: var(--color-text-secondary);">
					Accordion (один активный)
				</p>
				<Accordion>
					{#snippet children()}
						<AccordionLayout
							value="a"
							title={values.title as string}
							disabled={values.disabled as boolean}
						>
							{#snippet children()}
								<p>{values.content as string}</p>
							{/snippet}
						</AccordionLayout>
						<AccordionLayout value="b" title="Second Item">
							{#snippet children()}
								<p>Content for second item.</p>
							{/snippet}
						</AccordionLayout>
					{/snippet}
				</Accordion>
			</div>

			<div>
				<p style="margin-bottom: 0.5rem; font-size: 0.75rem; color: var(--color-text-secondary);">
					AccordionGroup (несколько активных)
				</p>
				<AccordionGroup>
					{#snippet children()}
						<AccordionLayout
							value="a"
							title={values.title as string}
							disabled={values.disabled as boolean}
						>
							{#snippet children()}
								<p>{values.content as string}</p>
							{/snippet}
						</AccordionLayout>
						<AccordionLayout value="b" title="Second Item">
							{#snippet children()}
								<p>Content for second item.</p>
							{/snippet}
						</AccordionLayout>
					{/snippet}
				</AccordionGroup>
			</div>
		</div>
	{/snippet}
</Story>
