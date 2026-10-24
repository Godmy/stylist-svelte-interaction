<script lang="ts">
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import FileManager from '$stylist/file/component/organism/file-manager/index.svelte';
	import { FILE_MANAGER_SAMPLE } from '$stylist/file/const/array/file-manager-sample';
	import { PresetFileManagerLabelsRu } from '$stylist/file/const/preset/file-manager-labels-ru';
	import type { RecipeFileStorage } from '$stylist/file/interface/recipe/file-storage';
	import type { FileManagerEntry } from '$stylist/file/type/struct/file-manager-entry';

	let {
		element = $bindable(null),
		title = 'Общее хранилище',
		class: className,
		...rest
	}: RecipeFileStorage = $props();

	let files = $state<FileManagerEntry[]>(FILE_MANAGER_SAMPLE.map((entry) => ({ ...entry })));
	let selectedId = $state('');
	// The page owns the records, so a deleted selection disappears from the details.
	const selected = $derived(files.find((entry) => entry.id === selectedId));
</script>

<HtmlSection bind:element {...rest} class={['c-file-storage', className]} aria-label={title}>
	<FileManager
		bind:files
		labels={PresetFileManagerLabelsRu}
		onEntrySelect={(entry) => (selectedId = entry.id)}
	/>
	{#if selected}
		<HtmlSection class="c-file-storage__details" aria-label="Сведения о файле">
			<HtmlH2 class="c-file-storage__title">{selected.name}</HtmlH2>
			<HtmlP>{selected.kind} · {selected.size} байт</HtmlP>
		</HtmlSection>
	{/if}
</HtmlSection>

<style>
	:global {
		.c-file-storage {
			display: flex;
			flex-direction: column;
			gap: calc(var(--layout-spacing-1rem, 1rem) * 1.5);
			color: var(--color-text-primary);
		}
		.c-file-storage__details {
			padding: var(--layout-spacing-1rem, 1rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			border-radius: var(--layout-border-radius-xl, 0.75rem);
			background: var(--color-background-secondary);
		}
		.c-file-storage__title {
			margin: 0 0 calc(var(--layout-spacing-1rem, 1rem) / 2);
			font-size: var(--typography-font-size-5, 1.25rem);
		}
	}
</style>
