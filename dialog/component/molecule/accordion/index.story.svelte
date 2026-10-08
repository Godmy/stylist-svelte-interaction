<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Accordion from './index.svelte';
	import AccordionLayout from '$stylist/dialog/component/atom/accordion-layout/index.svelte';

	const controls: SlotStory[] = [{ name: 'defaultValue', type: 'text', defaultValue: '' }];
</script>

<Story
	{controls}
	component={Accordion}
	title="Accordion"
	category="Molecules/Interaction/Controls/Accordion"
	description="Открывает один AccordionLayout — при клике на другой закрывает предыдущий"
>
	{#snippet children(values: any)}
		<div style="max-width: 480px;">
			<Accordion defaultValue={(values.defaultValue as string) || undefined}>
				{#snippet children()}
					<AccordionLayout value="section-1" title="What is Vibe?">
						{#snippet children()}
							<p>Vibe is a design system for building consistent UIs.</p>
						{/snippet}
					</AccordionLayout>
					<AccordionLayout value="section-2" title="How does it work?">
						{#snippet children()}
							<p>It provides composable components with shared context.</p>
						{/snippet}
					</AccordionLayout>
					<AccordionLayout value="section-3" title="Can I extend it?">
						{#snippet children()}
							<p>Yes — AccordionLayout works inside any context provider.</p>
						{/snippet}
					</AccordionLayout>
				{/snippet}
			</Accordion>
		</div>
	{/snippet}
</Story>
