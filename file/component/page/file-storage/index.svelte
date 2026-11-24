<script lang="ts">
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import FileManager from '$stylist/file/component/organism/file-manager/index.svelte';

	import { PresetFileManagerLabelsRu } from '$stylist/file/const/preset/file-manager-labels-ru';
	import type { RecipeFileStorage } from '$stylist/file/interface/recipe/file-storage';

	import createFileStorageComponentState from '$stylist/file/component/page/file-storage/state.svelte';

	let {
		element = $bindable(null),
		title = 'Общее хранилище',
		class: className,
		...rest
	}: RecipeFileStorage = $props();

	const state = createFileStorageComponentState();
</script>

<HtmlSection bind:element {...rest} class={['c-file-storage', className]} aria-label={title}>
	<FileManager
		bind:files={state.files}
		labels={PresetFileManagerLabelsRu}
		onEntrySelect={(entry) => (state.selectedId = entry.id)}
	/>
	{#if state.selected}
		<HtmlSection class="c-file-storage__details" aria-label="Сведения о файле">
			<HtmlH2 class="c-file-storage__title">{state.selected.name}</HtmlH2>
			<HtmlP>{state.selected.kind} · {state.selected.size} байт</HtmlP>
		</HtmlSection>
	{/if}
</HtmlSection>

<style>
	:global {
		.c-file-storage {
			display: flex;
			flex-direction: column;
			gap: calc(var(--space-4, 1rem) * 1.5);
			color: var(--color-text-primary);
		}
		.c-file-storage__details {
			padding: var(--space-4, 1rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			border-radius: var(--radius-3, 0.75rem);
			background: var(--color-background-secondary);
		}
		.c-file-storage__title {
			margin: 0 0 calc(var(--space-4, 1rem) / 2);
			font-size: var(--font-size-5, 1.25rem);
		}
	}
</style>
