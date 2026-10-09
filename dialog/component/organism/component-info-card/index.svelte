<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeComponentInfoCard } from '$stylist/dialog/interface/recipe/component-info-card';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createComponentInfoCardState } from './state.svelte';

	const X = 'x';
	const Package = 'package';
	const Tag = 'tag';
	const FileCode = 'file-code';
	const ExternalLink = 'external-link';
	const Copy = 'copy';
	const CheckCircle = 'check-circle';
	const Info = 'info';
	const Layers = 'layers';
	const Calendar = 'calendar';
	const User = 'user';

	let props: RecipeComponentInfoCard & HTMLAttributes<HTMLDivElement> = $props();
	const state = createComponentInfoCardState(() => props);
</script>

{#if state.isOpen}
	<div
		class="pic-backdrop pic-backdrop--anim"
		onclick={state.handleClose}
		onkeydown={(e) => e.key === 'Escape' && state.handleClose()}
		role="button"
		tabindex="0"
		aria-label="Close component info"
	></div>

	<div class="pic-modal-pos">
		<div
			class="info-card-modal info-card-modal--anim"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => {
				if (e.key === 'Escape') {
					e.stopPropagation();
					state.handleClose();
				}
			}}
			role="dialog"
			aria-modal="true"
			aria-labelledby="component-info-title"
			tabindex="-1"
		>
			<div class="info-card-modal__hero">
				<div class="info-card-modal__heroGlow"></div>
				<div class="pic-hero-row">
					<div class="pic-hero-info">
						<div class="pic-title-row">
							<BaseIcon name={Package} size={20} style="color: white" />
							<h2 id="component-info-title" class="pic-comp-title">
								{state.componentName || 'Component Info'}
							</h2>
						</div>

						{#if state.category || state.subcategory}
							<div class="pic-badges">
								{#if state.category}
									<span class="info-card-modal__badge">{state.category}</span>
								{/if}
								{#if state.subcategory}
									<span class="info-card-modal__badge">{state.subcategory}</span>
								{/if}
							</div>
						{/if}
					</div>

					<button onclick={state.handleClose} class="pic-close-btn" title="Close">
						<BaseIcon name={X} size={20} style="color: white" />
					</button>
				</div>
			</div>

			<div class="pic-body">
				<div class="pic-section">
					<div class="pic-section-header">
						<BaseIcon
							name={Info}
							size={16}
							style="color: var(--playground-accent,var(--color-primary-600))"
						/>
						<h3 class="pic-section-title">Description</h3>
					</div>
					<p class="pic-desc">{state.description}</p>
				</div>

				<div class="pic-stats-grid">
					<div class="stat-card stat-card--indigo">
						<div class="pic-stat-header">
							<BaseIcon name={Layers} size={16} style="color: #4f46e5" />
							<span style="font-size:0.75rem;font-weight:600;color:#312e81">Props</span>
						</div>
						<p style="font-size:1.5rem;font-weight:900;color:#4f46e5">{state.propsCount}</p>
					</div>

					<div class="stat-card stat-card--green">
						<div class="pic-stat-header">
							<BaseIcon name={Tag} size={16} style="color: #16a34a" />
							<span style="font-size:0.75rem;font-weight:600;color:#14532d">Version</span>
						</div>
						<p style="font-family:monospace;font-size:1.5rem;font-weight:900;color:#16a34a">
							{state.version}
						</p>
					</div>

					<div class="stat-card stat-card--purple">
						<div class="pic-stat-header">
							<BaseIcon name={User} size={16} style="color: #9333ea" />
							<span style="font-size:0.75rem;font-weight:600;color:#581c87">Author</span>
						</div>
						<p style="font-size:0.875rem;font-weight:700;color:#9333ea">{state.author}</p>
					</div>

					<div class="stat-card stat-card--orange">
						<div class="pic-stat-header">
							<BaseIcon name={Calendar} size={16} style="color: #ea580c" />
							<span style="font-size:0.75rem;font-weight:600;color:#7c2d12">Updated</span>
						</div>
						<p style="font-size:0.875rem;font-weight:700;color:#ea580c">{state.lastUpdated}</p>
					</div>
				</div>

				{#if state.npmPackage}
					<div class="pic-section">
						<div class="pic-section-header">
							<BaseIcon
								name={Package}
								size={16}
								style="color: var(--playground-accent,var(--color-primary-600))"
							/>
							<h3 class="pic-section-title">Installation</h3>
						</div>
						<div class="pic-npm-wrap">
							<div class="pic-npm-block">
								<code class="pic-npm-code">npm install {state.npmPackage}</code>
							</div>
							<button onclick={state.copyNpmCommand} class="pic-npm-copy-btn" title="Copy command">
								{#if state.copySuccess}
									<BaseIcon name={CheckCircle} size={16} style="color: #4ade80" />
								{:else}
									<BaseIcon name={Copy} size={16} style="color: #9ca3af" />
								{/if}
							</button>
						</div>
					</div>
				{/if}

				{#if state.examples && state.examples.length > 0}
					<div class="pic-section">
						<div class="pic-section-header">
							<BaseIcon
								name={FileCode}
								size={16}
								style="color: var(--playground-accent,var(--color-primary-600))"
							/>
							<h3 class="pic-section-title">Usage Examples</h3>
						</div>
						<ul class="pic-examples-list">
							{#each state.examples as example}
								<li class="info-card-modal__example">
									<span class="info-card-modal__bullet"></span>
									<span style="font-size:0.875rem;color:var(--color-text-secondary)">{example}</span
									>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="pic-actions">
					<a
						href="https://www.npmjs.com/package/{state.npmPackage}"
						target="_blank"
						rel="noopener noreferrer"
						class="pic-action-link pic-action-link--npm"
					>
						<BaseIcon name={Package} size={16} />
						NPM Package
						<BaseIcon name={ExternalLink} size={14} />
					</a>
					<a
						href="/docs/components/{state.componentName}"
						class="pic-action-link pic-action-link--docs"
					>
						<BaseIcon name={FileCode} size={16} />
						Documentation
						<BaseIcon name={ExternalLink} size={14} />
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.pic-backdrop {
		position: fixed;
		inset: 0;
		z-index: var(--z-index-overlay);
		background: rgb(0 0 0 / 0.5);
		backdrop-filter: blur(4px);
	}
	.pic-modal-pos {
		pointer-events: none;
		position: fixed;
		inset: 0;
		z-index: var(--z-index-modal);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}
	.info-card-modal {
		pointer-events: auto;
		width: 100%;
		max-width: 48rem;
		overflow: hidden;
	}
	.info-card-modal__hero {
		position: relative;
		padding: 1.75rem;
	}
	.info-card-modal__heroGlow {
		position: absolute;
		inset: 0;
	}
	.pic-hero-row {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}
	.pic-hero-info {
		flex: 1;
	}
	.pic-title-row {
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.pic-comp-title {
		font-size: 1.875rem;
		font-weight: 900;
		letter-spacing: -0.025em;
		color: white;
	}
	.pic-badges {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}
	.pic-close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.75rem;
		padding: 0.5rem;
		background: none;
		border: none;
		cursor: pointer;
		transition: all 0.15s;
	}
	.pic-close-btn:hover {
		transform: scale(1.1);
		background: rgb(255 255 255 / 0.2);
	}
	.pic-close-btn:active {
		transform: scale(0.95);
	}
	.pic-body {
		max-height: 65vh;
		overflow-y: auto;
		padding: 1.75rem;
	}
	.pic-section {
		margin-bottom: 1.75rem;
	}
	.pic-section-header {
		margin-bottom: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.pic-section-title {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-text-primary);
	}
	.pic-desc {
		max-width: 48rem;
		font-size: 0.875rem;
		line-height: 1.75;
		color: var(--color-text-secondary);
	}
	.pic-stats-grid {
		margin-bottom: 1.75rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	@media (min-width: 768px) {
		.pic-stats-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	.pic-stat-header {
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.pic-npm-wrap {
		position: relative;
	}
	.pic-npm-block {
		border-radius: 1rem;
		border: 1px solid #1f2937;
		background: #030712;
		padding: 1rem;
	}
	.pic-npm-code {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.875rem;
		color: #4ade80;
	}
	.pic-npm-copy-btn {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		background: #1f2937;
		padding: 0.5rem;
		transition: all 0.15s;
		border: none;
		cursor: pointer;
	}
	.pic-npm-copy-btn:hover {
		transform: scale(1.1);
		background: #374151;
	}
	.pic-npm-copy-btn:active {
		transform: scale(0.95);
	}
	.pic-examples-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.pic-actions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	@media (min-width: 640px) {
		.pic-actions {
			flex-direction: row;
		}
	}
	.pic-action-link {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border-radius: 1rem;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		transition: all 0.15s;
		border: 1px solid;
	}
	.pic-action-link:hover {
		transform: scale(1.02);
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	.pic-action-link:active {
		transform: scale(0.99);
	}
	.pic-action-link--npm {
		border-color: #fecaca;
		background: linear-gradient(to right, #fef2f2, #fff7ed);
		color: #b91c1c;
	}
	.pic-action-link--docs {
		border-color: #c7d2fe;
		background: linear-gradient(to right, #eef2ff, #f5f3ff);
		color: #4338ca;
	}
	@keyframes fade-slide-up {
		from {
			opacity: var(--opacity-0);
			transform: translateY(8px);
		}
		to {
			opacity: var(--opacity-100);
			transform: translateY(0);
		}
	}

	.info-card-modal {
		border: 1px solid color-mix(in srgb, var(--color-border-primary) 82%, transparent);
		border-radius: 2rem;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--color-background-primary) 97%, white 3%),
			var(--color-background-primary)
		);
		box-shadow: 0 24px 60px rgb(15 23 42 / 0.24);
	}

	.info-card-modal__hero {
		background: linear-gradient(
			135deg,
			var(--color-primary-600),
			var(--color-info-600),
			var(--color-secondary-600, var(--color-primary-700))
		);
	}

	.info-card-modal__heroGlow {
		background:
			radial-gradient(circle at top right, rgb(255 255 255 / 0.24), transparent 32%),
			linear-gradient(180deg, rgb(0 0 0 / 0.12), transparent 60%);
	}

	.info-card-modal__badge {
		display: inline-flex;
		align-items: center;
		padding: 0.35rem 0.7rem;
		border: 1px solid rgb(255 255 255 / 0.28);
		border-radius: 999px;
		background: rgb(255 255 255 / 0.15);
		backdrop-filter: blur(8px);
		font-size: 0.74rem;
		font-weight: 700;
		color: white;
	}

	.info-card-modal__example {
		display: flex;
		align-items: flex-start;
		gap: 0.7rem;
		padding: 0.9rem 1rem;
		border: 1px solid color-mix(in srgb, var(--color-border-primary) 76%, transparent);
		border-radius: 1rem;
		background: color-mix(in srgb, var(--color-background-secondary) 72%, transparent);
	}

	.info-card-modal__bullet {
		width: 0.55rem;
		height: 0.55rem;
		margin-top: 0.45rem;
		border-radius: 999px;
		background: var(--playground-accent, var(--color-primary-500));
		flex-shrink: 0;
	}

	.stat-card {
		padding: 1rem;
		border-width: 1px;
		border-style: solid;
		border-radius: 1.25rem;
		animation: fade-slide-up var(--duration-300) var(--animation-ease-out);
	}

	.stat-card--indigo {
		border-color: rgb(199 210 254);
		background: linear-gradient(135deg, rgb(238 242 255), rgb(245 243 255));
	}

	.stat-card--green {
		border-color: rgb(187 247 208);
		background: linear-gradient(135deg, rgb(240 253 244), rgb(236 253 245));
	}

	.stat-card--purple {
		border-color: rgb(233 213 255);
		background: linear-gradient(135deg, rgb(250 245 255), rgb(253 242 248));
	}

	.stat-card--orange {
		border-color: rgb(254 215 170);
		background: linear-gradient(135deg, rgb(255 247 237), rgb(255 251 235));
	}

	.pic-backdrop--anim {
		animation: fadeIn 0.2s ease-out;
	}
	.info-card-modal--anim {
		animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
