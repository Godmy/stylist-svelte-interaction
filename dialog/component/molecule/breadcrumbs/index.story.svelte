<script lang="ts">
	import Breadcrumbs from './index.svelte';
	import type { RecipeBreadcrumbs } from '$stylist/dialog/interface/recipe/breadcrumbs';

	// Render of index.story.ts: Breadcrumbs reports navigation through onNavigate; the story owns the active crumb.
	let args: RecipeBreadcrumbs = $props();
	let activeId = $derived(args.activeId);
</script>

<Breadcrumbs {...args} {activeId} onNavigate={(id: string) => (activeId = id)} />
