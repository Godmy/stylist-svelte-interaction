<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import Pagination from './index.svelte';
	import { TOKEN_CONTROLLER_TYPE } from '$stylist/domain/const/object/controller-type';

	const controls = [
		{
			name: 'currentPage',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			defaultValue: 1
		},
		{
			name: 'totalPages',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: [5, 10, 15, 20],
			defaultValue: 10
		},
		{
			name: 'showFirstLast',
			type: TOKEN_CONTROLLER_TYPE.BOOLEAN,
			defaultValue: true
		},
		{
			name: 'showPrevNext',
			type: TOKEN_CONTROLLER_TYPE.BOOLEAN,
			defaultValue: true
		},
		{
			name: 'showDots',
			type: TOKEN_CONTROLLER_TYPE.BOOLEAN,
			defaultValue: true
		},
		{
			name: 'maxVisible',
			type: TOKEN_CONTROLLER_TYPE.SELECT,
			options: [3, 5, 7, 9],
			defaultValue: 5
		}
	];
</script>

<Story
	{controls}
	title="Pagination"
	category="Organisms/Interaction/Navigation"
	description="A component for navigating through multiple pages of content."
	tags={['pagination', 'navigation', 'pages', 'paging']}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<div class="_c2">
				<Pagination
					currentPage={values.currentPage}
					totalPages={values.totalPages}
					showFirstLast={values.showFirstLast}
					showPrevNext={values.showPrevNext}
					showDots={values.showDots}
					maxVisible={values.maxVisible}
				/>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1.5rem;
	}
	._c2 {
		margin-left: auto;
		margin-right: auto;
		max-width: 28rem;
	}
</style>
