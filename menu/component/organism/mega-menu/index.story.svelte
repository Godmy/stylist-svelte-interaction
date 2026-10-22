<script lang="ts">
	// Render of index.story.ts: leading/trailing are named snippets, the menu remounts when defaultOpenId changes and events go to a local log.
	import MegaMenu from '$stylist/menu/component/organism/mega-menu/index.svelte';
	import type { RecipeMegaMenu } from '$stylist/menu/interface/recipe/mega-menu';

	let args: RecipeMegaMenu = $props();
	let log = $state<string[]>([]);

	function pushLog(entry: string) {
		log = [entry, ...log].slice(0, 6);
	}

	function handleNavigate(event: MouseEvent) {
		event.preventDefault();
		const href = (event.currentTarget as HTMLAnchorElement | null)?.getAttribute('href');
		pushLog(`navigate → ${href}`);
	}
</script>

<div class="_c1">
	{#key args.defaultOpenId}
		<MegaMenu
			{...args}
			defaultOpenId={args.defaultOpenId || undefined}
			onOpenChange={(id) => pushLog(`open → ${id ?? 'closed'}`)}
			onNavigate={handleNavigate}
		>
			{#snippet leading()}
				<a class="_c2" href="#home" onclick={(event) => event.preventDefault()}>
					<span class="_c3">LT</span>
					Lanka Tour
				</a>
			{/snippet}
			{#snippet trailing()}
				<a class="_c4" href="#booking" onclick={(event) => event.preventDefault()}>
					Подобрать экскурсию
				</a>
			{/snippet}
		</MegaMenu>
	{/key}
	<div class="_c5">
		<p class="_c6">Event log</p>
		{#each log as entry, index (index)}
			<code class="_c7">{entry}</code>
		{:else}
			<span class="_c7">Hover, click or use the keyboard…</span>
		{/each}
	</div>
</div>

<style>
	._c1 {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 36rem;
	}

	._c2 {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 800;
		font-size: 1.0625rem;
		color: var(--color-text-primary, #0f172a);
		text-decoration: none;
	}

	._c3 {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		background: var(--color-primary-600, #0e7490);
		color: #fff;
		font-size: 0.8125rem;
	}

	._c4 {
		padding: 0.5rem 1rem;
		border-radius: 999px;
		background: var(--color-primary-600, #0e7490);
		color: #fff;
		font-size: 0.875rem;
		font-weight: 700;
		text-decoration: none;
		white-space: nowrap;
	}

	._c5 {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-top: auto;
		padding: 0.75rem 1rem;
		border-radius: 0.75rem;
		background: var(--color-background-secondary, #f1f5f9);
	}

	._c6 {
		margin: 0 0 0.25rem;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-text-secondary, #64748b);
	}

	._c7 {
		font-size: 0.8125rem;
		color: var(--color-text-primary, #0f172a);
	}
</style>
