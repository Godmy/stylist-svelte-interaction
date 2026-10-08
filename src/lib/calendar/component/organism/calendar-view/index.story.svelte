<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import RecipeCalendarView from './index.svelte';

	let {
		id = '',
		title = '',
		description = '',
		controls = [
			{
				name: 'viewMode',
				type: 'select',
				options: ['day', 'week', 'month'],
				defaultValue: 'month'
			},
			{ name: 'showWeekNumbers', type: 'boolean', defaultValue: false }
		]
	} = $props<{
		id?: string;
		title?: string;
		description?: string;
		controls?: SlotStory[];
	}>();

	// Sample events data for the RecipeCalendarView component
	const sampleEvents = [
		{
			id: '1',
			title: 'Meeting',
			start: new Date(2023, 5, 15, 10, 0),
			end: new Date(2023, 5, 15, 11, 0)
		},
		{
			id: '2',
			title: 'Lunch',
			start: new Date(2023, 5, 16, 12, 30),
			end: new Date(2023, 5, 16, 13, 30)
		},
		{
			id: '3',
			title: 'Conference',
			start: new Date(2023, 5, 18, 9, 0),
			end: new Date(2023, 5, 20, 17, 0)
		}
	];

	function handleEventClick(event: any) {
		console.log('Event clicked:', event);
	}

	function handleDayClick(date: Date) {
		console.log('Day clicked:', date);
	}
</script>

<Story {id} {title} {description} component={RecipeCalendarView} category="Organisms" {controls}>
	{#snippet children(values: any)}
		<section class="sb-organisms-calendar-view _c1">
			<div class="_c2">
				<p class="_c3">Primary Calendar View Example</p>
				<p class="_c4">Interactive calendar view with customizable options.</p>

				<div class="_c5">
					<RecipeCalendarView
						events={sampleEvents as any}
						viewMode={values.viewMode}
						showWeekNumbers={values.showWeekNumbers}
						onEventClick={handleEventClick}
						onDayClick={handleDayClick}
					/>
				</div>
			</div>

			<div class="_c6">
				<h3 class="_c7">Calendar View Variations</h3>
				<p class="_c8">Different calendar view configurations with various options.</p>

				<div class="_c9">
					<article class="_c10">
						<p class="_c11">Week View</p>
						<div>
							<RecipeCalendarView
								events={sampleEvents as any}
								viewMode="week"
								showWeekNumbers={true}
								onEventClick={handleEventClick}
								onDayClick={handleDayClick}
							/>
						</div>
					</article>

					<article class="_c10">
						<p class="_c11">Day View</p>
						<div>
							<RecipeCalendarView
								events={sampleEvents.slice(0, 1) as any}
								viewMode="day"
								showWeekNumbers={false}
								onEventClick={handleEventClick}
								onDayClick={handleDayClick}
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
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 2rem;
	}
	._c10 {
		border-radius: 0.5rem;
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
		border-radius: 0.5rem;
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
		border-radius: 0.5rem;
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
