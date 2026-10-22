<script lang="ts">
	import AccordionGroup from '$stylist/dialog/component/molecule/accordion-group/index.svelte';
	import AccordionLayout from '$stylist/dialog/component/atom/accordion-layout/index.svelte';
	import type { RecipeAccordionGroup } from '$stylist/dialog/interface/recipe/accordion-group';

	// Render of index.story.ts: the group is only meaningful with AccordionLayout children.
	let args: RecipeAccordionGroup = $props();
</script>

<div class="_c1">
	<AccordionGroup {...args}>
		<AccordionLayout value="section-1" title="Getting Started">
			<p>Install the package and import the components you need.</p>
		</AccordionLayout>
		<AccordionLayout value="section-2" title="Configuration">
			<p>Configure via CSS custom properties and slot props.</p>
		</AccordionLayout>
		<AccordionLayout value="section-3" title="Advanced Usage">
			<p>Nest AccordionLayout inside any context provider.</p>
		</AccordionLayout>
	</AccordionGroup>
</div>

<style>
	._c1 {
		max-width: 480px;
	}
</style>
