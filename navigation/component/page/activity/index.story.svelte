<script lang="ts">
	// Render of index.story.ts: fragments, top bar actions and the FAB are snippet props.
	import Activity from '$stylist/navigation/component/page/activity/index.svelte';
	import FloatingActionButton from '$stylist/navigation/component/atom/floating-action-button/index.svelte';
	import Fragment from '$stylist/navigation/component/template/fragment/index.svelte';
	import NavigationGraph from '$stylist/navigation/component/page/navigation-graph/index.svelte';
	import Pagination from '$stylist/pager/component/organism/pagination/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeActivity } from '$stylist/navigation/interface/recipe/activity';

	let args: RecipeActivity = $props();
	const tours = [
		'Sigiriya sunrise',
		'Tea hills of Ella',
		'Galle fort walk',
		'Yala safari',
		'Kandy temples'
	];
	let photo = $state(1);
	let bookingPage = $state(1);
</script>

<Activity {...args}>
	{#snippet fragment(navigator)}
		{@const tour = String(navigator.entry.args?.tour ?? tours[0])}
		{#if navigator.destination.id === 'discover'}
			<Fragment layout="full">
				<div class="_hero">
					<h2>Find your next trip</h2>
					<p>Landing fragment: full-bleed content without the fragment padding.</p>
					<button type="button" onclick={() => navigator.navigate('explore')}>Explore tours</button>
				</div>
			</Fragment>
		{:else if navigator.destination.id === 'catalog-list'}
			<Fragment
				layout="wide"
				heading="Tours"
				description="Recycler-like list; an item opens the details."
			>
				<ul class="_list">
					{#each tours as item (item)}
						<li>
							<button type="button" onclick={() => navigator.navigate('open-tour', { tour: item })}>
								{item}
							</button>
						</li>
					{/each}
				</ul>
			</Fragment>
		{:else if navigator.destination.id === 'catalog-detail'}
			<Fragment
				heading={tour}
				description="Inner destination: the top bar shows Up instead of the burger."
			>
				<p>Back stack: {navigator.stack.map((entry) => entry.id).join(' → ')}</p>
				<button type="button" onclick={() => navigator.navigate('open-gallery', { tour })}>
					Gallery
				</button>
			</Fragment>
		{:else if navigator.destination.id === 'catalog-gallery'}
			<Fragment layout="fill" heading={`${tour}: photos`}>
				<div class="_pager">
					<div class="_slide">Photo {photo} / 6</div>
					<Pagination currentPage={photo} totalPages={6} onPageChange={(page) => (photo = page)} />
					<button type="button" onclick={() => navigator.navigate('all-tours')}>All tours</button>
				</div>
			</Fragment>
		{:else if navigator.destination.id === 'bookings'}
			<Fragment heading="Bookings" description="Paged list from the pager domain.">
				<ol class="_list" start={(bookingPage - 1) * 3 + 1}>
					{#each [1, 2, 3] as row (row)}
						<li>Booking #{(bookingPage - 1) * 3 + row}</li>
					{/each}
				</ol>
				<Pagination
					currentPage={bookingPage}
					totalPages={4}
					onPageChange={(page) => (bookingPage = page)}
				/>
				<p>
					<button type="button" onclick={() => navigator.navigate('traveler')}>
						Traveler details
					</button>
				</p>
			</Fragment>
		{:else if navigator.destination.id === 'settings'}
			<Fragment
				layout="wide"
				heading="Site map"
				description="Navigation graph of this activity; click a fragment to open it."
			>
				<NavigationGraph
					graph={args.graph}
					activeId={navigator.entry.id}
					onSelect={(id) => navigator.navigate(id)}
				/>
			</Fragment>
		{:else}
			<Fragment
				heading={navigator.destination.label}
				description="Any content can live in a fragment."
			/>
		{/if}
	{/snippet}
	{#snippet actions(navigator)}
		<button type="button" aria-label="Search">
			<Icon name="search" size={24} aria-hidden="true" />
		</button>
		{#if navigator.destination.id === 'catalog-detail'}
			<button type="button" aria-label="Share">
				<Icon name="share" size={24} aria-hidden="true" />
			</button>
		{/if}
	{/snippet}
	{#snippet fab(navigator)}
		{#if navigator.destination.id === 'catalog-detail'}
			<FloatingActionButton
				icon="calendar"
				label="Book"
				onclick={() => navigator.navigate('book-tour')}
			/>
		{:else}
			<FloatingActionButton aria-label="Add" />
		{/if}
	{/snippet}
</Activity>

<style>
	._hero {
		display: grid;
		gap: 1rem;
		justify-items: start;
		padding: 4rem 2rem;
		background: linear-gradient(
			135deg,
			var(--color-primary-100),
			var(--color-background-secondary)
		);
	}
	._hero h2,
	._hero p {
		margin: 0;
	}
	._list {
		display: grid;
		gap: 0.5rem;
		padding: 0;
		list-style-position: inside;
	}
	._list button {
		width: 100%;
		padding: 1rem;
		text-align: start;
	}
	._pager {
		display: grid;
		flex: 1;
		gap: 1rem;
		place-content: center;
		justify-items: center;
		padding: 1rem;
	}
	._slide {
		display: grid;
		place-items: center;
		width: min(28rem, 80vw);
		aspect-ratio: 4 / 3;
		border-radius: 1rem;
		background: var(--color-background-tertiary);
	}
</style>
