<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import FileBrowser from './index.svelte';

	let {
		id = '',
		title = '',
		description = '',
		controls = [{ name: 'showSize', type: 'boolean', defaultValue: true }]
	} = $props<{
		id?: string;
		title?: string;
		description?: string;
		controls?: SlotStory[];
	}>();

	type SlotFolderItem = {
		id: string;
		name: string;
		children?: SlotFolderItem[];
		expanded?: boolean;
		selected?: boolean;
		type?: 'folder' | 'file';
		icon?: any;
		data?: any;
	};

	const items: SlotFolderItem[] = [
		{
			id: 'folder1',
			name: 'Documents',
			type: 'folder',
			children: [
				{
					id: 'folder1-1',
					name: 'Work',
					type: 'folder',
					children: [
						{ id: 'file1', name: 'report.pdf', type: 'file' },
						{ id: 'file2', name: 'presentation.pptx', type: 'file' },
						{ id: 'folder1-1-1', name: 'Archives', type: 'folder', children: [] }
					]
				},
				{
					id: 'folder1-2',
					name: 'Personal',
					type: 'folder',
					children: [
						{ id: 'file3', name: 'budget.xlsx', type: 'file' },
						{ id: 'file4', name: 'notes.txt', type: 'file' }
					]
				}
			]
		}
	];

	function handleSelect(item: SlotFolderItem) {
		console.log('Selected:', item.name);
	}

	function handleExpand(item: SlotFolderItem) {
		console.log('Expanded:', item.name);
	}
</script>

<Story {id} {title} {description} component={FileBrowser} category="Organisms" {controls}>
	{#snippet children(values: any)}
		<section class="sb-organisms-file-browser _c1">
			<div class="_c2">
				<p class="_c3">Primary File Browser Example</p>
				<p class="_c4">Interactive file browser with customizable options.</p>

				<div class="_c5">
					<FileBrowser {items} />
				</div>
			</div>

			<div class="_c6">
				<h3 class="_c7">File Browser Variations</h3>
				<p class="_c8">Different file browser configurations with various options.</p>

				<div class="_c9">
					<article class="_c10">
						<p class="_c11">Without Preview</p>
						<div>
							<FileBrowser {items} />
						</div>
					</article>

					<article class="_c10">
						<p class="_c11">Multi Select</p>
						<div>
							<FileBrowser {items} />
						</div>
					</article>
				</div>
			</div>
		</section>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		width: 100%;
		gap: 2rem;
	}
	@media (min-width: 1024px) {
		._c1 {
			grid-template-columns: 1fr 1fr;
		}
	}
	._c10 {
		border-radius: 1rem;
		border-width: 1px;
		border-style: dashed;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1rem;
	}
	._c11 {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c2 {
		border-radius: 2rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c3 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		letter-spacing: 0.025em;
		color: var(--color-text-secondary);
		text-transform: uppercase;
	}
	._c4 {
		margin-top: 0.25rem;
		color: var(--color-text-primary);
	}
	._c5 {
		margin-top: 1.5rem;
	}
	._c6 {
		border-radius: 2rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c7 {
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c8 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
	._c9 {
		margin-top: 1.25rem;
	}
	._c9 > * + * {
		margin-top: 1rem;
	}
</style>
