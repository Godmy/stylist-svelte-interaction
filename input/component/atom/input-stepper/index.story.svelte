<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import InputStepper from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'value', type: 'number', defaultValue: 2, min: 0, max: 20, step: 1 },
		{ name: 'min', type: 'number', defaultValue: 0 },
		{ name: 'max', type: 'number', defaultValue: 20 },
		{ name: 'size', type: 'select', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
		{ name: 'background', type: 'text', defaultValue: '' },
		{ name: 'disabled', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	id="input-atoms-input-stepper"
	title="Input / InputStepper"
	component={InputStepper}
	category="Input/Atoms"
	description="Счётчик минус/число/плюс. `size` масштабирует весь контрол через font-size (кнопки в em), `background` принимает любое CSS-значение фона."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_surface">
			<InputStepper
				value={Number(values.value)}
				min={Number(values.min)}
				max={Number(values.max)}
				size={values.size}
				background={values.background || undefined}
				disabled={Boolean(values.disabled)}
				label="Гости"
			/>
		</div>
	{/snippet}
</Story>

<style>
	._surface {
		display: inline-grid;
		padding: 24px;
		background: #f7f3ec;
	}
</style>
