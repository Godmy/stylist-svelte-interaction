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

	import type { RecipeFileManager } from '$stylist/file/interface/recipe/file-manager';

	import createFileManagerComponentState from '$stylist/file/component/organism/file-manager/state.svelte';

	let {
		element = $bindable(null),
		files = $bindable(FILE_MANAGER_SAMPLE.map((entry) => ({ ...entry }))),
		labels,
		onEntrySelect,
		class: className,
		...rest
	}: RecipeFileManager = $props();

	const state = createFileManagerComponentState(() => ({
		get files() {
			return files;
		},
		set files(value) {
			files = value;
		},
		labels: labels,
		onEntrySelect: onEntrySelect
	}));
</script>

<HtmlSection
	bind:element
	{...rest}
	class={['c-file-manager', className]}
	aria-label={state.text.region}
>
	<HtmlDiv class="c-file-manager__row c-file-manager__row--between">
		<HtmlNav class="c-file-manager__row" aria-label={state.text.folders}>
			<HtmlButton
				type="button"
				class="c-file-manager__button c-file-manager__button--ghost"
				onclick={state.goRoot}
			>
				{state.text.allFiles}
			</HtmlButton>
			{#if state.folder}
				<HtmlSpan>/ {state.folder.name}</HtmlSpan>
			{/if}
		</HtmlNav>
		<HtmlSpan class="c-file-manager__badge"
			>{(state.total / 1048576).toFixed(2)} {state.text.megabytes}</HtmlSpan
		>
	</HtmlDiv>
	<HtmlDiv class="c-file-manager__row">
		<HtmlLabel class="c-file-manager__field">
			{state.text.search}
			<HtmlInputSearch class="c-file-manager__input" bind:value={state.query} />
		</HtmlLabel>
		<HtmlLabel class="c-file-manager__field">
			{state.text.kind}
			<HtmlSelect class="c-file-manager__input" bind:value={state.kind}>
				<HtmlOption value="">{state.text.kindAll}</HtmlOption>
				<HtmlOption value="image">{state.text.kindImage}</HtmlOption>
				<HtmlOption value="document">{state.text.kindDocument}</HtmlOption>
				<HtmlOption value="archive">{state.text.kindArchive}</HtmlOption>
			</HtmlSelect>
		</HtmlLabel>
		<HtmlLabel class="c-file-manager__field">
			{state.text.view}
			<HtmlSelect class="c-file-manager__input" bind:value={state.view}>
				<HtmlOption value="grid">{state.text.viewGrid}</HtmlOption>
				<HtmlOption value="list">{state.text.viewList}</HtmlOption>
			</HtmlSelect>
		</HtmlLabel>
		<HtmlLabel class="c-file-manager__field">
			{state.text.upload}
			<HtmlInputFile class="c-file-manager__input" multiple onchange={state.upload} />
		</HtmlLabel>
	</HtmlDiv>
	<HtmlForm class="c-file-manager__row c-file-manager__row--end" onsubmit={state.createFolder}>
		<HtmlLabel class="c-file-manager__field">
			{state.text.newFolder}
			<HtmlInputText class="c-file-manager__input" required bind:value={state.folderName} />
		</HtmlLabel>
		<HtmlButton type="submit" class="c-file-manager__button">{state.text.createFolder}</HtmlButton>
		<HtmlButton
			type="button"
			class="c-file-manager__button c-file-manager__button--ghost"
			disabled={!state.selected.length}
			onclick={() => (state.deleting = true)}
		>
			{state.text.deleteSelected} ({state.selected.length})
		</HtmlButton>
	</HtmlForm>
	{#if state.deleting}
		<HtmlSection class="c-file-manager__panel">
			<HtmlP>{state.text.deleteConfirm}</HtmlP>
			<HtmlDiv class="c-file-manager__row">
				<HtmlButton type="button" class="c-file-manager__button" onclick={state.remove}>
					{state.text.confirmDelete}
				</HtmlButton>
				<HtmlButton
					type="button"
					class="c-file-manager__button c-file-manager__button--ghost"
					onclick={() => (state.deleting = false)}
				>
					{state.text.cancelDelete}
				</HtmlButton>
			</HtmlDiv>
		</HtmlSection>
	{/if}
	{#if state.renameId}
		<HtmlForm
			class="c-file-manager__panel c-file-manager__row c-file-manager__row--end"
			onsubmit={state.rename}
		>
			<HtmlLabel class="c-file-manager__field">
				{state.text.newName}
				<HtmlInputText class="c-file-manager__input" required bind:value={state.newName} />
			</HtmlLabel>
			<HtmlButton type="submit" class="c-file-manager__button">{state.text.saveName}</HtmlButton>
			<HtmlButton
				type="button"
				class="c-file-manager__button c-file-manager__button--ghost"
				onclick={() => (state.renameId = '')}
			>
				{state.text.cancelName}
			</HtmlButton>
		</HtmlForm>
	{/if}
	<HtmlDiv class={['c-file-manager__entries', `c-file-manager__entries--${state.view}`]}>
		{#each state.visible as entry (entry.id)}
			<HtmlArticle class="c-file-manager__panel c-file-manager__entry">
				<HtmlLabel class="c-file-manager__row">
					<HtmlInputCheckbox
						value={entry.id}
						checked={state.selected.includes(entry.id)}
						onchange={(event) => state.toggle(entry.id, event.currentTarget.checked)}
					/>
					<HtmlSpan class="c-file-manager__badge">
						{entry.kind === 'folder' ? state.text.folder : entry.kind}
					</HtmlSpan>
				</HtmlLabel>
				<HtmlH3 class="c-file-manager__name">{entry.name}</HtmlH3>
				<HtmlSmall class="c-file-manager__meta">
					{entry.modified} · {(entry.size / 1024).toFixed(0)}
					{state.text.kilobytes}
				</HtmlSmall>
				<HtmlDiv class="c-file-manager__row">
					<HtmlButton
						type="button"
						class="c-file-manager__button"
						onclick={() => state.open(entry)}
					>
						{entry.kind === 'folder' ? state.text.openFolder : state.text.selectFile}: {entry.name}
					</HtmlButton>
					<HtmlButton
						type="button"
						class="c-file-manager__button c-file-manager__button--ghost"
						onclick={() => {
							state.renameId = entry.id;
							state.newName = entry.name;
						}}
					>
						{state.text.rename}: {entry.name}
					</HtmlButton>
				</HtmlDiv>
			</HtmlArticle>
		{:else}
			<HtmlP role="status">{state.text.empty}</HtmlP>
		{/each}
	</HtmlDiv>
	<HtmlP role="status" class="c-file-manager__notice">{state.notice}</HtmlP>
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
