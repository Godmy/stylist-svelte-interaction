<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeShortcutsPanel } from '$stylist/control/interface/recipe/shortcuts-panel';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createShortcutsPanelState } from './state.svelte';
	const Keyboard = 'keyboard';
	const Command = 'command';
	const Search = 'search';
	const Zap = 'zap';
	const Eye = 'eye';
	const SidebarIcon = 'sidebar';
	const Layout = 'layout';
	const Grid = 'grid';
	const Moon = 'moon';
	const Code = 'code';
	const Copy = 'copy';

	let props: RecipeShortcutsPanel & HTMLAttributes<HTMLDivElement> = $props();
	const state = createShortcutsPanelState(() => props);
</script>

<div class="shortcuts-panel">
	<div class="sp-header">
		<div class="sp-header-row">
			<div class="sp-icon-box">
				<BaseIcon name={Keyboard} size={24} style="color: white" />
			</div>
			<h3 class="sp-title">Keyboard Shortcuts</h3>
		</div>
		<p class="sp-subtitle">Master the playground with these keyboard shortcuts</p>
	</div>

	<div class="sp-shortcuts-list">
		{#each state.categoryOrder as category}
			{#if state.groupedShortcuts.has(category)}
				{@const categoryShortcuts = state.groupedShortcuts.get(category) || []}
				<div class="category-section">
					<div class="sp-cat-header">
						<div class="sp-cat-icon {state.getCategoryColor(category)} _c1">
							<BaseIcon
								name={state.getCategoryIcon(category)}
								size={16} style="color: #374151"
							/>
						</div>
						<h4 class="sp-cat-label">{category}</h4>
						<span class="sp-cat-count">{categoryShortcuts.length}</span>
					</div>

					<div class="sp-items">
						{#each categoryShortcuts as shortcut, index}
							<div class="shortcut-item sp-item group" style="animation-delay: {index * 30}ms">
								<div class="sp-item-inner">
									<div class="sp-item-left">
										{#if shortcut.icon}
											<BaseIcon
												name={shortcut.icon}
												size={16} style="flex-shrink: 0; color: #6b7280"
											/>
										{/if}
										<span class="sp-item-desc">{shortcut.description}</span>
									</div>
									<div class="sp-keys">
										{#each shortcut.keys as key, i}
											<kbd class="sp-kbd {state.getKeyColor(key)}">{key}</kbd>
											{#if i < shortcut.keys.length - 1}
												<span class="sp-key-sep">+</span>
											{/if}
										{/each}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<div class="sp-tips">
		<h4 class="sp-tips-header">
			<BaseIcon name={Zap} size={16} />
			Pro Tips
		</h4>
		<ul class="sp-tips-list">
			<li class="sp-tip-item">
				<span class="sp-tip-bullet">•</span>
				<span
					>Hold <kbd class="sp-tip-kbd">Shift</kbd> while using zoom shortcuts for finer control</span
				>
			</li>
			<li class="sp-tip-item">
				<span class="sp-tip-bullet">•</span>
				<span>Press <kbd class="sp-tip-kbd">?</kbd> anytime to open this shortcuts panel</span>
			</li>
			<li class="sp-tip-item">
				<span class="sp-tip-bullet">•</span>
				<span>Use <kbd class="sp-tip-kbd">Esc</kbd> to close any modal or panel</span>
			</li>
		</ul>
	</div>

	<div class="sp-platform-note">
		<p class="sp-platform-text">
			On macOS, replace <kbd class="sp-kbd">Ctrl</kbd> with <kbd class="sp-kbd">⌘</kbd> (Command)
		</p>
	</div>
</div>

<style>
	.shortcuts-panel {
		height: 100%;
		overflow: auto;
		background: linear-gradient(to bottom, white, #f9fafb);
		padding: 1.5rem;
	}
	@media (prefers-color-scheme: dark) {
		.shortcuts-panel {
			background: linear-gradient(to bottom, #1f2937, #111827);
		}
	}
	.sp-header {
		margin-bottom: 1.5rem;
	}
	.sp-header-row {
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	.sp-icon-box {
		display: flex;
		height: 2.5rem;
		width: 2.5rem;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		background: linear-gradient(to bottom right, #6366f1, #a855f7);
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	.sp-title {
		background: linear-gradient(to right, #4f46e5, #9333ea);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		font-size: 1rem;
		font-weight: 700;
	}
	@media (prefers-color-scheme: dark) {
		.sp-title {
			background: linear-gradient(to right, #818cf8, #c084fc);
			-webkit-background-clip: text;
			background-clip: text;
		}
	}
	.sp-subtitle {
		font-size: 0.875rem;
		color: #4b5563;
	}
	@media (prefers-color-scheme: dark) {
		.sp-subtitle {
			color: #9ca3af;
		}
	}
	.sp-shortcuts-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.sp-cat-header {
		margin-bottom: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.sp-cat-icon {
		display: flex;
		height: 2rem;
		width: 2rem;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		flex-shrink: 0;
		border: 1px solid transparent;
	}
	.sp-cat--navigation {
		background: linear-gradient(to bottom right, #eef2ff, #faf5ff);
		border-color: #c7d2fe;
	}
	.sp-cat--view {
		background: linear-gradient(to bottom right, #f0fdf4, #ecfdf5);
		border-color: #bbf7d0;
	}
	.sp-cat--actions {
		background: linear-gradient(to bottom right, #fff7ed, #fffbeb);
		border-color: #fed7aa;
	}
	.sp-cat--viewport {
		background: linear-gradient(to bottom right, #eff6ff, #ecfeff);
		border-color: #bfdbfe;
	}
	.sp-cat--tabs {
		background: linear-gradient(to bottom right, #faf5ff, #fdf2f8);
		border-color: #e9d5ff;
	}
	.sp-cat--misc {
		background: linear-gradient(to bottom right, #f9fafb, #f8fafc);
		border-color: #e5e7eb;
	}
	@media (prefers-color-scheme: dark) {
		.sp-cat--navigation {
			background: linear-gradient(to bottom right, rgba(49, 46, 129, 0.3), rgba(88, 28, 135, 0.3));
			border-color: #3730a3;
		}
		.sp-cat--view {
			background: linear-gradient(to bottom right, rgba(20, 83, 45, 0.3), rgba(6, 78, 59, 0.3));
			border-color: #166534;
		}
		.sp-cat--actions {
			background: linear-gradient(to bottom right, rgba(124, 45, 18, 0.3), rgba(120, 53, 15, 0.3));
			border-color: #9a3412;
		}
		.sp-cat--viewport {
			background: linear-gradient(to bottom right, rgba(30, 58, 138, 0.3), rgba(22, 78, 99, 0.3));
			border-color: #1e40af;
		}
		.sp-cat--tabs {
			background: linear-gradient(to bottom right, rgba(88, 28, 135, 0.3), rgba(131, 24, 67, 0.3));
			border-color: #6b21a8;
		}
		.sp-cat--misc {
			background: linear-gradient(to bottom right, rgba(17, 24, 39, 0.3), rgba(15, 23, 42, 0.3));
			border-color: #374151;
		}
	}
	.sp-cat-label {
		font-size: 0.875rem;
		font-weight: 700;
		color: #111827;
	}
	@media (prefers-color-scheme: dark) {
		.sp-cat-label {
			color: white;
		}
	}
	.sp-cat-count {
		border-radius: 9999px;
		background: #f3f4f6;
		padding: 0.125rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: #4b5563;
	}
	@media (prefers-color-scheme: dark) {
		.sp-cat-count {
			background: #1f2937;
			color: #9ca3af;
		}
	}
	.sp-items {
		margin-left: 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.sp-item {
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
		background: linear-gradient(to bottom right, white, #f9fafb);
		padding: 0.75rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		transition: all 0.15s;
	}
	.sp-item:hover {
		transform: scale(1.02);
		border-color: #a5b4fc;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	@media (prefers-color-scheme: dark) {
		.sp-item {
			border-color: #374151;
			background: linear-gradient(to bottom right, #1f2937, #111827);
		}
		.sp-item:hover {
			border-color: #3730a3;
		}
	}
	.sp-item-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}
	.sp-item-left {
		display: flex;
		min-width: 0;
		flex: 1;
		align-items: center;
		gap: 0.75rem;
	}
	.sp-item-desc {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
	}
	@media (prefers-color-scheme: dark) {
		.sp-item-desc {
			color: #d1d5db;
		}
	}
	.sp-keys {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.25rem;
	}
	.sp-kbd {
		border-radius: 0.25rem;
		padding: 0.25rem 0.625rem;
		font-size: 0.75rem;
		font-weight: 700;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		border-width: 1px;
		border-style: solid;
		transition: all 0.15s;
	}
	.sp-key-sep {
		margin-left: 0.125rem;
		margin-right: 0.125rem;
		font-size: 0.75rem;
		color: #9ca3af;
	}
	@media (prefers-color-scheme: dark) {
		.sp-key-sep {
			color: #4b5563;
		}
	}
	.sp-kbd--modifier {
		background: #e0e7ff;
		color: #4338ca;
		border-color: #a5b4fc;
	}
	.sp-kbd--default {
		background: white;
		color: #111827;
		border-color: #d1d5db;
	}
	@media (prefers-color-scheme: dark) {
		.sp-kbd--modifier {
			background: rgba(49, 46, 129, 0.5);
			color: #a5b4fc;
			border-color: #4338ca;
		}
		.sp-kbd--default {
			background: #1f2937;
			color: white;
			border-color: #4b5563;
		}
	}
	.sp-tips {
		margin-top: 1.5rem;
		border-radius: 0.75rem;
		border: 1px solid #c7d2fe;
		background: linear-gradient(to bottom right, #eef2ff, #f5f3ff);
		padding: 1rem;
	}
	@media (prefers-color-scheme: dark) {
		.sp-tips {
			border-color: #3730a3;
			background: linear-gradient(to bottom right, rgb(67 56 202 / 0.2), rgb(109 40 217 / 0.2));
		}
	}
	.sp-tips-header {
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		font-weight: 700;
		color: #312e81;
	}
	@media (prefers-color-scheme: dark) {
		.sp-tips-header {
			color: #c7d2fe;
		}
	}
	.sp-tips-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		font-size: 0.75rem;
		color: #4338ca;
	}
	@media (prefers-color-scheme: dark) {
		.sp-tips-list {
			color: #a5b4fc;
		}
	}
	.sp-tip-item {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
	}
	.sp-tip-bullet {
		margin-top: 0.125rem;
		color: #6366f1;
	}
	.sp-tip-kbd {
		border-radius: 0.25rem;
		border: 1px solid #c7d2fe;
		background: white;
		padding: 0 0.25rem;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.625rem;
	}
	@media (prefers-color-scheme: dark) {
		.sp-tip-kbd {
			border-color: #3730a3;
			background: #1f2937;
		}
	}
	.sp-platform-note {
		margin-top: 1rem;
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
		background: #f3f4f6;
		padding: 0.75rem;
	}
	@media (prefers-color-scheme: dark) {
		.sp-platform-note {
			border-color: #374151;
			background: #1f2937;
		}
	}
	.sp-platform-text {
		text-align: center;
		font-size: 0.75rem;
		color: #4b5563;
	}
	@media (prefers-color-scheme: dark) {
		.sp-platform-text {
			color: #9ca3af;
		}
	}
	.shortcut-item {
		animation: fade-slide-in var(--duration-300) var(--animation-ease-out);
	}

	@keyframes fade-slide-in {
		from {
			opacity: var(--opacity-0);
			transform: translateX(-8px);
		}
		to {
			opacity: var(--opacity-100);
			transform: translateX(0);
		}
	}

	.category-section {
		animation: fade-in var(--duration-400) var(--animation-ease-out);
	}

	@keyframes fade-in {
		from {
			opacity: var(--opacity-0);
		}
		to {
			opacity: var(--opacity-100);
		}
	}

	._c1 {
		border-width: 2px;
		border-style: solid;
	}
</style>
