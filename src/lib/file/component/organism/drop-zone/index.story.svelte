<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import DropZone from './index.svelte';

	type DemoDropItem = {
		id: string;
		name: string;
		type: string;
		size?: number;
	};

	type Props = {
		accept: string;
		multiple: boolean;
		disabled: boolean;
		preview: boolean;
		maxSize: number;
		maxItems: number;
		label: string;
		description: string;
	};

	const controls: SlotStory[] = [
		{ name: 'accept', type: 'text', defaultValue: 'image/*,.pdf' },
		{ name: 'multiple', type: 'boolean', defaultValue: true },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'preview', type: 'boolean', defaultValue: true },
		{ name: 'maxSize', type: 'number', defaultValue: 5 * 1024 * 1024, min: 1024 },
		{ name: 'maxItems', type: 'number', defaultValue: 5, min: 1, max: 10 },
		{ name: 'label', type: 'text', defaultValue: 'Drop files here' },
		{ name: 'description', type: 'text', defaultValue: 'or click to browse' }
	];

	let droppedItems = $state<DemoDropItem[]>([]);

	function handleDrop(items: DemoDropItem[]) {
		droppedItems = items;
	}
</script>

<Story
	id="organisms-drop-zone"
	title="Organisms / Interaction / Controls / Files / DropZone"
	component={DropZone}
	category="Organisms/Interaction/Controls/Files"
	description="A drag-and-drop surface with optional previews and validation controls."
	{controls}
>
	{#snippet children(values: any)}
		<section class="sb-organisms-drop-zone _c1">
			<div class="_c2">
				<header class="_c3">
					<p class="_c4">Uploader</p>
					<p class="_c5">Configure accepted types, maximum size, and preview behavior.</p>
				</header>

				<div class="_c6">
					<DropZone
						accept={values.accept}
						multiple={values.multiple}
						disabled={values.disabled}
						preview={values.preview}
						maxSize={values.maxSize}
						maxItems={values.maxItems}
						label={values.label}
						description={values.description}
						onDrop={handleDrop}
					/>
				</div>
			</div>

			<div class="_c7">
				<h3 class="_c8">Recent drops</h3>
				<p class="_c9">As you drop files we mirror the payload below.</p>

				{#if droppedItems.length === 0}
					<div class="_c10">
						Waiting for the first file - drag something over the panel or use the browse button.
					</div>
				{:else}
					<ul class="_c11">
						{#each droppedItems as item}
							<li class="_c12">
								<div class="_c13">
									<span class="_c14">{item.name}</span>
									<span class="_c15">{item.type || 'unknown'}</span>
								</div>
								{#if item.size}
									<p class="_c15">
										{(item.size / 1024).toFixed(1)} KB
									</p>
								{/if}
							</li>
						{/each}
					</ul>
				{/if}
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
			grid-template-columns: 1.15fr 0.85fr;
		}
	}
	._c10 {
		margin-top: 1.5rem;
		border-radius: 1rem;
		border-width: 1px;
		border-style: dashed;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
	._c11 {
		margin-top: 1.5rem;
	}
	._c11 > * + * {
		margin-top: 0.75rem;
	}
	._c12 {
		border-radius: 1rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c13 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	._c14 {
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c15 {
		font-size: 0.75rem;
		line-height: 1rem;
		color: var(--color-text-secondary);
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
	._c3 > * + * {
		margin-top: 0.5rem;
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
		margin-top: 1.5rem;
	}
	._c7 {
		border-radius: 2.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c8 {
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c9 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
