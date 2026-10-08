<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import MiniCalendar from './index.svelte';
	import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';

	export let id: string;
	export let title: string;
	export let description: string;
	export let controls: SlotStory[] = [
		{ name: 'compact', type: 'boolean', defaultValue: false },
		{ name: 'showToday', type: 'boolean', defaultValue: true }
	];

	// Sample events data
	const sampleEvents: SlotCalendarEvent[] = [
		{
			id: '1',
			title: 'Meeting',
			start: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 10, 0),
			end: new Date(new Date().getFullYear(), new Date().getMonth(), 10, 11, 0),
			color: '#3b82f6'
		},
		{
			id: '2',
			title: 'Lunch',
			start: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 12, 0),
			end: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 13, 0),
			color: '#10b981'
		},
		{
			id: '3',
			title: 'Deadline',
			start: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 17, 0),
			end: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 18, 0),
			color: '#ef4444'
		},
		{
			id: '4',
			title: 'Conference',
			start: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 14, 0),
			end: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 15, 30),
			color: '#8b5cf6'
		}
	];

	// Event handlers
	function handleDateSelect(date: Date) {
		console.log('Date selected:', date);
	}

	function handleEventClick(event: SlotCalendarEvent) {
		console.log('Event clicked:', event.title);
	}
</script>

<Story
	{id}
	{title}
	{description}
	component={MiniCalendar}
	category="Organisms/Interaction/Controls/Calendar"
	{controls}
>
	{#snippet children(values: any)}
		<section class="sb-organisms-mini-calendar _c1">
			<div class="_c2">
				<p class="_c3">Primary Mini Calendar Example</p>
				<p class="_c4">Compact calendar with event indicators and date selection.</p>

				<div class="_c5">
					<MiniCalendar
						events={sampleEvents as any}
						initialDate={new Date()}
						compact={values.compact}
						showToday={values.showToday}
						onDateSelect={handleDateSelect}
						onEventClick={handleEventClick}
					/>
				</div>
			</div>

			<div class="_c6">
				<h3 class="_c7">Calendar Variations</h3>
				<p class="_c8">Different mini calendar configurations with various options.</p>

				<div class="_c9">
					<article class="_c10">
						<p class="_c11">Compact View</p>
						<div class="_c12">
							<MiniCalendar
								events={sampleEvents as any}
								initialDate={new Date()}
								compact={true}
								showToday={true}
								onDateSelect={handleDateSelect}
							/>
						</div>
					</article>

					<article class="_c10">
						<p class="_c11">Without Today Button</p>
						<div class="_c12">
							<MiniCalendar
								events={sampleEvents as any}
								initialDate={new Date()}
								compact={false}
								showToday={false}
								onDateSelect={handleDateSelect}
							/>
						</div>
					</article>

					<article class="_c10">
						<p class="_c11">Without Events</p>
						<div class="_c12">
							<MiniCalendar
								events={[] as any}
								initialDate={new Date()}
								compact={false}
								showToday={true}
								onDateSelect={handleDateSelect}
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
	._c12 {
		display: flex;
		justify-content: center;
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
		display: flex;
		justify-content: center;
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
