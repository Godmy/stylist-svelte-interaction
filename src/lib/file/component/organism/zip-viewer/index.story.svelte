<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import ZipViewer from './index.svelte';

	type SlotZipEntry = {
		id: string;
		name: string;
		type: 'file' | 'directory';
		size?: number;
		compressedSize?: number;
		modified?: Date;
		isText?: boolean;
		path: string;
		parentPath?: string;
	};

	const primaryEntries: SlotZipEntry[] = [
		{ id: '1', name: 'design-system/', type: 'directory', path: 'design-system/' },
		{
			id: '2',
			name: 'components/',
			type: 'directory',
			path: 'design-system/components/',
			parentPath: 'design-system/'
		},
		{
			id: '3',
			name: 'Button.svelte',
			type: 'file',
			path: 'design-system/components/Button.svelte',
			parentPath: 'design-system/components/',
			size: 3420,
			isText: true,
			modified: new Date()
		},
		{
			id: '4',
			name: 'Select.svelte',
			type: 'file',
			path: 'design-system/components/Select.svelte',
			parentPath: 'design-system/components/',
			size: 4192,
			isText: true,
			modified: new Date()
		},
		{
			id: '5',
			name: 'tokens/',
			type: 'directory',
			path: 'design-system/tokens/',
			parentPath: 'design-system/'
		},
		{
			id: '6',
			name: 'colors.json',
			type: 'file',
			path: 'design-system/tokens/colors.json',
			parentPath: 'design-system/tokens/',
			size: 1820,
			isText: true,
			modified: new Date()
		},
		{
			id: '7',
			name: 'README.md',
			type: 'file',
			path: 'README.md',
			size: 1096,
			isText: true,
			modified: new Date()
		}
	];

	const variantArchives = [
		{
			name: 'QA results',
			files: 48,
			description: 'Archive with regression screenshots grouped per platform.'
		},
		{
			name: 'Translation bundle',
			files: 26,
			description: 'Contains JSON locales with nested folders for every language.'
		},
		{
			name: 'Crash report',
			files: 5,
			description: 'Minidumps + diagnostics zipped for support teams.'
		}
	];

	type Props = {
		searchable?: boolean;
		showPath?: boolean;
		enableFiltering?: boolean;
		defaultExpanded?: boolean;
	};

	const controls: SlotStory[] = [
		{ name: 'searchable', type: 'boolean', defaultValue: true },
		{ name: 'showPath', type: 'boolean', defaultValue: true },
		{ name: 'enableFiltering', type: 'boolean', defaultValue: true },
		{ name: 'defaultExpanded', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	id="organisms-zip-viewer"
	title="Organisms / Interaction / Controls / Files / ZipViewer"
	component={ZipViewer}
	category="Organisms/Interaction/Controls/Files"
	description="Inspect the contents of backup archives, crash bundles, or exported design systems."
	{controls}
>
	{#snippet children(values: any)}
		<section class="sb-organisms-zip-viewer _c1">
			<div class="_c2">
				<div class="_c3">
					<div>
						<p class="_c4">Design system bundle</p>
						<p class="_c5">Explore directories, view metadata, and preview text entries.</p>
					</div>
					<div class="_c6">
						{primaryEntries.length} entries
					</div>
				</div>

				<div class="_c7">
					<ZipViewer
						entries={primaryEntries}
						searchable={values.searchable}
						showPath={values.showPath}
						enableFiltering={values.enableFiltering}
						defaultExpanded={values.defaultExpanded}
					/>
				</div>
			</div>

			<div class="_c8">
				<h3 class="_c9">Common archive types</h3>
				<p class="_c10">ZipViewer is reusable for QA drops, translation packs, or audit exports.</p>

				<div class="_c11">
					{#each variantArchives as archive}
						<article class="_c12">
							<div class="_c3">
								<div>
									<p class="_c13">{archive.name}</p>
									<p class="_c14">{archive.description}</p>
								</div>
								<span class="_c15">
									{archive.files} files
								</span>
							</div>
						</article>
					{/each}
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
			grid-template-columns: 1.25fr 0.75fr;
		}
	}
	._c10 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
	._c11 {
		margin-top: 1.25rem;
	}
	._c11 > * + * {
		margin-top: 1rem;
	}
	._c12 {
		border-radius: 1rem;
		border-width: 1px;
		border-style: dashed;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1rem;
	}
	._c13 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c14 {
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--color-text-secondary);
	}
	._c15 {
		border-radius: 9999px;
		background-color: var(--color-background-secondary);
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.125rem;
		padding-bottom: 0.125rem;
		font-size: 0.75rem;
		line-height: 1rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c2 {
		border-radius: 2.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	._c4 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		letter-spacing: 0.025em;
		color: var(--color-text-secondary);
		text-transform: uppercase;
	}
	._c5 {
		font-size: 1.125rem;
		line-height: 1.75rem;
		color: var(--color-text-primary);
	}
	._c6 {
		border-radius: 9999px;
		background-color: var(--color-background-secondary);
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		font-size: 0.75rem;
		line-height: 1rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c7 {
		margin-top: 1.5rem;
		border-radius: 1rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 1rem;
	}
	._c8 {
		border-radius: 2.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c9 {
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
</style>
