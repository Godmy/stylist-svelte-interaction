<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import ZoomControls from './index.svelte';

	const controls = [
		{ name: 'initialValue', type: 'range', min: 50, max: 200, step: 10, defaultValue: 100 }
	];
</script>

<Story
	{controls}
	component={ZoomControls}
	title="ZoomControls"
	category="Atoms/Control/ZoomControls"
	description="Zoom controls for canvas and design tools"
>
	{#snippet children(values: any)}
		<div
			style="display: flex; gap: 8px; padding: 20px; background: var(--color-background-primary);"
		>
			<ZoomControls initialValue={Number(values.initialValue) || 100} />
		</div>
	{/snippet}
</Story>
