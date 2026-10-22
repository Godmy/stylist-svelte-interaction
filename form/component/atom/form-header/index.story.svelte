<script lang="ts">
	import FormHeader from '$stylist/form/component/atom/form-header/index.svelte';
	import type { RecipeFormHeader } from '$stylist/form/interface/recipe/form-header';

	// Render of index.story.ts: the back button appears only with a backAction callback.
	let { showBackButton = true, ...args }: RecipeFormHeader & { showBackButton?: boolean } =
		$props();
</script>

<FormHeader {...args} backAction={showBackButton ? () => {} : undefined} />
