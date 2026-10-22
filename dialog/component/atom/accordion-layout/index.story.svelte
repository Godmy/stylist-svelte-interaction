<script lang="ts">
	import Accordion from '$stylist/dialog/component/molecule/accordion/index.svelte';
	import AccordionGroup from '$stylist/dialog/component/molecule/accordion-group/index.svelte';
	import AccordionLayout from '$stylist/dialog/component/atom/accordion-layout/index.svelte';
	import type { RecipeAccordionLayout } from '$stylist/dialog/interface/recipe/accordion-layout';

	// Render of index.story.ts: AccordionLayout opens only inside an Accordion or AccordionGroup context.
	let { panelText, ...args }: RecipeAccordionLayout & { panelText?: string } = $props();
</script>

<div class="_c1">
	<div>
		<p class="_c2">Accordion (один активный)</p>
		<Accordion>
			<AccordionLayout {...args}>
				<p>{panelText}</p>
			</AccordionLayout>
			<AccordionLayout value="b" title="Second Item">
				<p>Content for second item.</p>
			</AccordionLayout>
		</Accordion>
	</div>

	<div>
		<p class="_c2">AccordionGroup (несколько активных)</p>
		<AccordionGroup>
			<AccordionLayout {...args}>
				<p>{panelText}</p>
			</AccordionLayout>
			<AccordionLayout value="b" title="Second Item">
				<p>Content for second item.</p>
			</AccordionLayout>
		</AccordionGroup>
	</div>
</div>

<style>
	._c1 {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 480px;
	}
	._c2 {
		margin-bottom: 0.5rem;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
</style>
