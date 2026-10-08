<script lang="ts">
	import type { SlotFileSystemItem } from '$stylist/file/interface/slot/file-system-item';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';

	import FileExplorer from './index.svelte';

	const items: SlotFileSystemItem[] = [
		{
			id: 'folder1',
			name: 'Documents',
			type: 'folder',
			size: 2048000,
			modified: new Date(Date.now() - 86400000),
			children: []
		},
		{
			id: 'file1',
			name: 'report.pdf',
			type: 'file',
			size: 1028000,
			modified: new Date(Date.now() - 172800000)
		},
		{
			id: 'file2',
			name: 'image.png',
			type: 'file',
			size: 3072000,
			modified: new Date(Date.now() - 259200000)
		},
		{
			id: 'folder2',
			name: 'Projects',
			type: 'folder',
			size: 5120000,
			modified: new Date(Date.now() - 345600000),
			children: []
		},
		{
			id: 'file3',
			name: 'presentation.pptx',
			type: 'file',
			size: 2048576,
			modified: new Date(Date.now() - 432000000)
		},
		{
			id: 'file4',
			name: 'spreadsheet.xlsx',
			type: 'file',
			size: 1536000,
			modified: new Date(Date.now() - 518400000)
		}
	];

	let currentPath = '/home/user';
	let viewMode: 'list' | 'grid' = 'grid';
	let searchable = true;
	let showPath = true;
	let enableSelection = true;
	let multiselect = false;

	const controls: SlotStory[] = [
		{ name: 'currentPath', type: 'text', defaultValue: '/home/user' },
		{ name: 'viewMode', type: 'select', options: ['list', 'grid'], defaultValue: 'grid' },
		{ name: 'searchable', type: 'boolean', defaultValue: true },
		{ name: 'showPath', type: 'boolean', defaultValue: true },
		{ name: 'enableSelection', type: 'boolean', defaultValue: true },
		{ name: 'multiselect', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	id="organisms-file-explorer"
	title="Organisms / Interaction / Controls / Files / FileExplorer"
	component={FileExplorer}
	category="Organisms/Interaction/Controls/Files"
	description="File explorer component with grid/list views, search and selection capabilities."
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-file-explorer _c1">
			<h1 class="_c2">FileExplorer Component</h1>

			<div class="_c3">
				<h2 class="_c4">Interactive FileExplorer</h2>
				<div class="_c5">
					<FileExplorer
						{items}
						currentPath={values.currentPath}
						viewMode={values.viewMode}
						searchable={values.searchable}
						showPath={values.showPath}
						enableSelection={values.enableSelection}
						multiselect={values.multiselect}
						onItemSelect={(item: SlotFileSystemItem) => {
							console.log('Item selected:', item.name);
						}}
						onItemDoubleClick={(item: SlotFileSystemItem) => {
							console.log('Item double-clicked:', item.name);
						}}
						onItemAction={(item: SlotFileSystemItem, action: string) => {
							console.log('Item action:', { item: item.name, action });
						}}
						onUpload={(files: FileList) => {
							console.log(
								'Files uploaded:',
								Array.from(files).map((f) => f.name)
							);
						}}
						onDownload={(item: SlotFileSystemItem) => {
							console.log('Item downloaded:', item.name);
						}}
					/>
				</div>

				<div class="_c6">
					<div>
						<label for="explorer-view-mode" class="_c7">View Mode:</label>
						<select id="explorer-view-mode" bind:value={viewMode} class="_c8">
							<option value="grid">Grid</option>
							<option value="list">List</option>
						</select>
					</div>

					<div class="_c9">
						<label for="explorer-searchable" class="_c10">
							<input id="explorer-searchable" type="checkbox" bind:checked={searchable} />
							Searchable
						</label>
					</div>

					<div class="_c9">
						<label for="explorer-show-path" class="_c10">
							<input id="explorer-show-path" type="checkbox" bind:checked={showPath} />
							Show Path
						</label>
					</div>

					<div class="_c9">
						<label for="explorer-enable-selection" class="_c10">
							<input
								id="explorer-enable-selection"
								type="checkbox"
								bind:checked={enableSelection}
							/>
							Enable Selection
						</label>
					</div>

					<div class="_c9">
						<label for="explorer-multiselect" class="_c10">
							<input id="explorer-multiselect" type="checkbox" bind:checked={multiselect} />
							Multiselect
						</label>
					</div>
				</div>
			</div>

			<div class="_c11">
				<h2 class="_c4">FileExplorer Variations</h2>
				<div class="_c12">
					<div>
						<h3 class="_c13">List View</h3>
						<div class="_c14">
							<FileExplorer {items} viewMode="list" currentPath="/documents" />
						</div>
					</div>
					<div>
						<h3 class="_c13">Grid View (No Search)</h3>
						<div class="_c14">
							<FileExplorer {items} viewMode="grid" currentPath="/projects" searchable={false} />
						</div>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c10 {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
	._c11 {
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		padding: 1rem;
	}
	._c12 {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 1rem;
	}
	@media (min-width: 768px) {
		._c12 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	._c13 {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
	}
	._c14 {
		height: 300px;
	}
	._c2 {
		margin-bottom: 1rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 600;
	}
	._c3 {
		margin-bottom: 1.5rem;
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		padding: 1rem;
	}
	._c4 {
		font-size: 1rem;
		line-height: 1.5rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}
	._c5 {
		height: 500px;
	}
	._c6 {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	._c7 {
		margin-bottom: 0.25rem;
		display: block;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c8 {
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		padding: 0.25rem;
	}
	._c9 {
		display: flex;
		align-items: flex-end;
	}
</style>
