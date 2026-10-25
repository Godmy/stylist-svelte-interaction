<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlH3 from '$stylist/html/component/atom/h3/index.svelte';
	import HtmlInputCheckbox from '$stylist/html/component/atom/input-checkbox/index.svelte';
	import HtmlInputFile from '$stylist/html/component/atom/input-file/index.svelte';
	import HtmlInputSearch from '$stylist/html/component/atom/input-search/index.svelte';
	import HtmlInputText from '$stylist/html/component/atom/input-text/index.svelte';
	import HtmlLabel from '$stylist/html/component/atom/label/index.svelte';
	import HtmlOption from '$stylist/html/component/atom/option/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSmall from '$stylist/html/component/atom/small/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlSelect from '$stylist/html/component/molecule/select/index.svelte';
	import HtmlArticle from '$stylist/html/component/organism/article/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlForm from '$stylist/html/component/organism/form/index.svelte';
	import HtmlNav from '$stylist/html/component/organism/nav/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import { FILE_MANAGER_SAMPLE } from '$stylist/file/const/array/file-manager-sample';
	import { PresetFileManagerLabels } from '$stylist/file/const/preset/file-manager-labels';
	import { fileKind } from '$stylist/file/function/resolve/file-kind';
	import { fileManagerFilter } from '$stylist/file/function/transform/file-manager-filter';
	import type { RecipeFileManager } from '$stylist/file/interface/recipe/file-manager';
	import type { FileManagerEntry } from '$stylist/file/type/struct/file-manager-entry';

	let {
		element = $bindable(null),
		files = $bindable(FILE_MANAGER_SAMPLE.map((entry) => ({ ...entry }))),
		labels,
		onEntrySelect,
		class: className,
		...rest
	}: RecipeFileManager = $props();

	const text = $derived({ ...PresetFileManagerLabels, ...labels });

	let parent = $state<string | null>(null);
	let query = $state('');
	let kind = $state('');
	let view = $state('grid');
	let selected = $state<string[]>([]);
	let renameId = $state('');
	let newName = $state('');
	let folderName = $state('');
	let serial = $state(1);
	let notice = $state('');
	let deleting = $state(false);

	const visible = $derived(fileManagerFilter(files, parent, query, kind));
	const folder = $derived(files.find((entry) => entry.id === parent));
	const total = $derived(files.reduce((sum, entry) => sum + entry.size, 0));

	function today(): string {
		return new Date().toISOString().slice(0, 10);
	}

	function goRoot() {
		parent = null;
		query = '';
		selected = [];
	}

	function open(entry: FileManagerEntry) {
		if (entry.kind === 'folder') {
			parent = entry.id;
			query = '';
			selected = [];
		} else {
			selected = [entry.id];
			onEntrySelect?.({ ...entry });
		}
	}

	function toggle(id: string, checked: boolean) {
		selected = checked ? [...selected, id] : selected.filter((item) => item !== id);
	}

	// Only metadata is kept; file contents never leave the input.
	function upload(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const batch = Array.from(input.files ?? []);
		files = [
			...files,
			...batch.map((file) => ({
				id: `upload-${serial++}`,
				name: file.name,
				parentId: parent,
				kind: fileKind(file.name),
				size: file.size,
				modified: today()
			}))
		];
		notice = `${text.uploaded}: ${batch.length}`;
		input.value = '';
	}

	function createFolder(event: SubmitEvent) {
		event.preventDefault();
		if (!folderName.trim()) return;
		files = [
			...files,
			{
				id: `folder-${serial++}`,
				name: folderName.trim(),
				parentId: parent,
				kind: 'folder',
				size: 0,
				modified: today()
			}
		];
		folderName = '';
	}

	// Deleting a folder removes its whole subtree.
	function remove() {
		const ids = new Set(selected);
		let previous = -1;
		while (previous !== ids.size) {
			previous = ids.size;
			for (const entry of files) if (entry.parentId && ids.has(entry.parentId)) ids.add(entry.id);
		}
		files = files.filter((entry) => !ids.has(entry.id));
		selected = [];
		deleting = false;
	}

	function rename(event: SubmitEvent) {
		event.preventDefault();
		if (!newName.trim()) return;
		files = files.map((entry) =>
			entry.id === renameId ? { ...entry, name: newName.trim() } : entry
		);
		renameId = '';
		newName = '';
	}
</script>

<HtmlSection bind:element {...rest} class={['c-file-manager', className]} aria-label={text.region}>
	<HtmlDiv class="c-file-manager__row c-file-manager__row--between">
		<HtmlNav class="c-file-manager__row" aria-label={text.folders}>
			<HtmlButton
				type="button"
				class="c-file-manager__button c-file-manager__button--ghost"
				onclick={goRoot}
			>
				{text.allFiles}
			</HtmlButton>
			{#if folder}
				<HtmlSpan>/ {folder.name}</HtmlSpan>
			{/if}
		</HtmlNav>
		<HtmlSpan class="c-file-manager__badge"
			>{(total / 1048576).toFixed(2)} {text.megabytes}</HtmlSpan
		>
	</HtmlDiv>
	<HtmlDiv class="c-file-manager__row">
		<HtmlLabel class="c-file-manager__field">
			{text.search}
			<HtmlInputSearch class="c-file-manager__input" bind:value={query} />
		</HtmlLabel>
		<HtmlLabel class="c-file-manager__field">
			{text.kind}
			<HtmlSelect class="c-file-manager__input" bind:value={kind}>
				<HtmlOption value="">{text.kindAll}</HtmlOption>
				<HtmlOption value="image">{text.kindImage}</HtmlOption>
				<HtmlOption value="document">{text.kindDocument}</HtmlOption>
				<HtmlOption value="archive">{text.kindArchive}</HtmlOption>
			</HtmlSelect>
		</HtmlLabel>
		<HtmlLabel class="c-file-manager__field">
			{text.view}
			<HtmlSelect class="c-file-manager__input" bind:value={view}>
				<HtmlOption value="grid">{text.viewGrid}</HtmlOption>
				<HtmlOption value="list">{text.viewList}</HtmlOption>
			</HtmlSelect>
		</HtmlLabel>
		<HtmlLabel class="c-file-manager__field">
			{text.upload}
			<HtmlInputFile class="c-file-manager__input" multiple onchange={upload} />
		</HtmlLabel>
	</HtmlDiv>
	<HtmlForm class="c-file-manager__row c-file-manager__row--end" onsubmit={createFolder}>
		<HtmlLabel class="c-file-manager__field">
			{text.newFolder}
			<HtmlInputText class="c-file-manager__input" required bind:value={folderName} />
		</HtmlLabel>
		<HtmlButton type="submit" class="c-file-manager__button">{text.createFolder}</HtmlButton>
		<HtmlButton
			type="button"
			class="c-file-manager__button c-file-manager__button--ghost"
			disabled={!selected.length}
			onclick={() => (deleting = true)}
		>
			{text.deleteSelected} ({selected.length})
		</HtmlButton>
	</HtmlForm>
	{#if deleting}
		<HtmlSection class="c-file-manager__panel">
			<HtmlP>{text.deleteConfirm}</HtmlP>
			<HtmlDiv class="c-file-manager__row">
				<HtmlButton type="button" class="c-file-manager__button" onclick={remove}>
					{text.confirmDelete}
				</HtmlButton>
				<HtmlButton
					type="button"
					class="c-file-manager__button c-file-manager__button--ghost"
					onclick={() => (deleting = false)}
				>
					{text.cancelDelete}
				</HtmlButton>
			</HtmlDiv>
		</HtmlSection>
	{/if}
	{#if renameId}
		<HtmlForm
			class="c-file-manager__panel c-file-manager__row c-file-manager__row--end"
			onsubmit={rename}
		>
			<HtmlLabel class="c-file-manager__field">
				{text.newName}
				<HtmlInputText class="c-file-manager__input" required bind:value={newName} />
			</HtmlLabel>
			<HtmlButton type="submit" class="c-file-manager__button">{text.saveName}</HtmlButton>
			<HtmlButton
				type="button"
				class="c-file-manager__button c-file-manager__button--ghost"
				onclick={() => (renameId = '')}
			>
				{text.cancelName}
			</HtmlButton>
		</HtmlForm>
	{/if}
	<HtmlDiv class={['c-file-manager__entries', `c-file-manager__entries--${view}`]}>
		{#each visible as entry (entry.id)}
			<HtmlArticle class="c-file-manager__panel c-file-manager__entry">
				<HtmlLabel class="c-file-manager__row">
					<HtmlInputCheckbox
						value={entry.id}
						checked={selected.includes(entry.id)}
						onchange={(event) => toggle(entry.id, event.currentTarget.checked)}
					/>
					<HtmlSpan class="c-file-manager__badge">
						{entry.kind === 'folder' ? text.folder : entry.kind}
					</HtmlSpan>
				</HtmlLabel>
				<HtmlH3 class="c-file-manager__name">{entry.name}</HtmlH3>
				<HtmlSmall class="c-file-manager__meta">
					{entry.modified} · {(entry.size / 1024).toFixed(0)}
					{text.kilobytes}
				</HtmlSmall>
				<HtmlDiv class="c-file-manager__row">
					<HtmlButton type="button" class="c-file-manager__button" onclick={() => open(entry)}>
						{entry.kind === 'folder' ? text.openFolder : text.selectFile}: {entry.name}
					</HtmlButton>
					<HtmlButton
						type="button"
						class="c-file-manager__button c-file-manager__button--ghost"
						onclick={() => {
							renameId = entry.id;
							newName = entry.name;
						}}
					>
						{text.rename}: {entry.name}
					</HtmlButton>
				</HtmlDiv>
			</HtmlArticle>
		{:else}
			<HtmlP role="status">{text.empty}</HtmlP>
		{/each}
	</HtmlDiv>
	<HtmlP role="status" class="c-file-manager__notice">{notice}</HtmlP>
</HtmlSection>

<style>
	:global {
		.c-file-manager {
			display: flex;
			flex-direction: column;
			gap: var(--space-4, 1rem);
			color: var(--color-text-primary);
		}
		.c-file-manager__row {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: calc(var(--space-4, 1rem) * 0.75);
		}
		.c-file-manager__row--between {
			justify-content: space-between;
		}
		.c-file-manager__row--end {
			align-items: end;
		}
		.c-file-manager__field {
			display: flex;
			flex-direction: column;
			gap: calc(var(--space-4, 1rem) / 4);
			font-weight: var(--font-weight-medium, 500);
		}
		.c-file-manager__input {
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-secondary);
			border-radius: var(--radius-1-5, 0.375rem);
			background: var(--color-background-primary);
			color: var(--color-text-primary);
			font: inherit;
		}
		.c-file-manager__button {
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid var(--color-primary-600);
			border-radius: var(--radius-1-5, 0.375rem);
			background: var(--color-primary-600);
			color: var(--color-on-primary, #fff);
			font: inherit;
			cursor: pointer;
		}
		.c-file-manager__button--ghost {
			border-color: var(--color-border-secondary);
			background: transparent;
			color: var(--color-text-primary);
		}
		.c-file-manager__button:disabled {
			opacity: var(--opacity-50, 0.5);
			cursor: default;
		}
		.c-file-manager__input:focus-visible,
		.c-file-manager__button:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: var(--focus-offset, 0.125rem);
		}
		.c-file-manager__panel {
			padding: var(--space-4, 1rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			border-radius: var(--radius-3, 0.75rem);
			background: var(--color-background-primary);
		}
		.c-file-manager__entries {
			display: flex;
			flex-direction: column;
			gap: calc(var(--space-4, 1rem) * 0.75);
		}
		.c-file-manager__entries--grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		}
		.c-file-manager__entry {
			display: flex;
			flex-direction: column;
			gap: calc(var(--space-4, 1rem) / 2);
			min-width: 0;
		}
		.c-file-manager__name {
			margin: 0;
			font-size: var(--font-size-4, 1rem);
			overflow-wrap: anywhere;
		}
		.c-file-manager__meta {
			color: var(--color-text-secondary);
		}
		.c-file-manager__badge {
			display: inline-block;
			padding: calc(var(--space-4, 1rem) / 8) calc(var(--space-4, 1rem) / 2);
			border-radius: var(--radius-full, 9999px);
			background: var(--color-secondary-container, var(--color-background-secondary));
			color: var(--color-on-secondary-container, var(--color-text-primary));
			font-size: var(--font-size-3, 0.75rem);
		}
		.c-file-manager__notice {
			margin: 0;
			min-height: 1.5em;
		}
	}
</style>
