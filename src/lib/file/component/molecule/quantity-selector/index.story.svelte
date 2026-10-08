<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import QuantitySelector from './index.svelte';

	let {
		id = '',
		title = '',
		description = '',
		controls = [
			{ name: 'value', type: 'number', defaultValue: 1 },
			{ name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
			{
				name: 'variant',
				type: 'select',
				options: ['default', 'minimal', 'filled'],
				defaultValue: 'default'
			},
			{ name: 'min', type: 'number', defaultValue: 1 },
			{ name: 'max', type: 'number', defaultValue: 99 },
			{ name: 'disabled', type: 'boolean', defaultValue: false },
			{ name: 'showInput', type: 'boolean', defaultValue: true },
			{ name: 'showButtons', type: 'boolean', defaultValue: true }
		]
	} = $props<{
		id?: string;
		title?: string;
		description?: string;
		controls?: SlotStory[];
	}>();

	function handleValueChange(newValue: number) {
		console.log('Value changed:', newValue);
	}
</script>

<Story {id} {title} {description} component={QuantitySelector} category="Molecules" {controls}>
	{#snippet children(values: any)}
		<section class="sb-molecules-quantity-selector _c1">
			<div class="_c2">
				<p class="_c3">Primary Quantity Selector Example</p>
				<p class="_c4">Interactive quantity selector with customizable options.</p>

				<div class="_c5">
					<QuantitySelector
						value={values.value}
						min={values.min}
						max={values.max}
						disabled={values.disabled}
						variant={values.variant}
						size={values.size}
						showInput={values.showInput}
						showButtons={values.showButtons}
						onValueChange={handleValueChange}
					/>
				</div>
			</div>

			<div class="_c6">
				<h3 class="_c7">Quantity Selector Variations</h3>
				<p class="_c8">Different quantity selector configurations with various options.</p>

				<div class="_c9">
					<article class="_c10">
						<p class="_c11">Small Size</p>
						<div>
							<QuantitySelector
								value={1}
								size="sm"
								variant="default"
								onValueChange={handleValueChange}
							/>
						</div>
					</article>

					<article class="_c10">
						<p class="_c11">Large Size</p>
						<div>
							<QuantitySelector
								value={5}
								size="lg"
								variant="filled"
								onValueChange={handleValueChange}
							/>
						</div>
					</article>

					<article class="_c10">
						<p class="_c11">Minimal Variant</p>
						<div>
							<QuantitySelector
								value={3}
								size="md"
								variant="minimal"
								onValueChange={handleValueChange}
							/>
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
