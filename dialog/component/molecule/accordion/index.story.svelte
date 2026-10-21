<script lang="ts">
	import Accordion from './index.svelte';
	import AccordionLayout from '$stylist/dialog/component/atom/accordion-layout/index.svelte';
	import type { RecipeAccordion } from '$stylist/dialog/interface/recipe/accordion';

	// Render of index.story.ts: the accordion is only meaningful with AccordionLayout children.
	let { defaultValue, ...args }: RecipeAccordion = $props();
</script>

<div class="_c1">
	<Accordion {...args} defaultValue={defaultValue || undefined}>
		<AccordionLayout value="section-1" title="What is Vibe?">
			<p>Vibe is a design system for building consistent UIs.</p>
		</AccordionLayout>
		<AccordionLayout value="section-2" title="How does it work?">
			<p>It provides composable components with shared context.</p>
		</AccordionLayout>
		<AccordionLayout value="section-3" title="Can I extend it?">
			<p>Yes — AccordionLayout works inside any context provider.</p>
		</AccordionLayout>
	</Accordion>
</div>

<style>
	._c1 {
		max-width: 480px;
	}
</style>
