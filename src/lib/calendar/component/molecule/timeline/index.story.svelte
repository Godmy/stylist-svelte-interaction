<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import RecipeTimeline from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';
	import { TOKEN_ORIENTATION } from '$stylist/layout/const/array/orientation';

	const defaultItems = [
		{ id: '1', date: '2023-01-15', title: 'Project Started', content: undefined },
		{ id: '2', date: '2023-02-01', title: 'Design Phase', content: undefined },
		{ id: '3', date: '2023-03-10', title: 'Development', content: undefined },
		{ id: '4', date: '2023-04-20', title: 'Testing', content: undefined },
		{ id: '5', date: '2023-05-05', title: 'Launch', content: undefined }
	];

	const controls = [
		{
			name: 'orientation',
			type: 'select' as TokenControllerType,
			defaultValue: 'vertical',
			options: TOKEN_ORIENTATION,
			description: 'Orientation of the timeline'
		}
	];
</script>

<Story
	{controls}
	title="RecipeTimeline Component"
	description="RecipeTimeline component to show events chronologically"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<RecipeTimeline items={defaultItems as any} orientation={controlValues.orientation} />
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
</style>
