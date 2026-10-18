<script lang="ts">
	import DatePicker from './index.svelte';
	import type { RecipeDatePicker } from '$stylist/calendar/interface/recipe/date-picker';
	import type { DatePickerValue } from '$stylist/calendar/interface/slot/date-picker';

	// Render of index.story.ts: the picker is bound to a local Date with a Date min/max range.
	let args: RecipeDatePicker = $props();

	const minDate = new Date();
	const maxDate = new Date();
	let selectedDate = $state<Date | undefined>(new Date());

	minDate.setDate(minDate.getDate() - 14);
	maxDate.setDate(maxDate.getDate() + 45);

	const milestones = [
		{
			id: 'launch',
			label: 'Product release',
			date: new Date().toISOString().split('T')[0]
		},
		{
			id: 'retro',
			label: 'Team retrospective',
			date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0]
		},
		{
			id: 'marketing',
			label: 'Marketing campaign',
			date: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString().split('T')[0]
		}
	];

	function handleManualSelection(value: string) {
		selectedDate = value ? new Date(`${value}T00:00:00`) : undefined;
	}

	function handleDatePickerChange(value: DatePickerValue) {
		selectedDate = value instanceof Date ? value : undefined;
	}
</script>

<div class="_c2">
	<div class="_c3">
		<label for="manual-date" class="_c4">Set selected date</label>
		<input
			id="manual-date"
			type="date"
			class="_c5"
			value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
			onchange={(event) => handleManualSelection((event.target as HTMLInputElement).value)}
		/>
	</div>

	<div class="_c6">
		<div class="_c7">
			<DatePicker
				{...args}
				value={selectedDate}
				{minDate}
				{maxDate}
				onChange={handleDatePickerChange}
			/>
			<p class="_c8">
				Selected: {selectedDate
					? selectedDate.toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric'
						})
					: 'None'}
			</p>
			<div class="_c9">
				{#each milestones as milestone (milestone.id)}
					<button type="button" class="_c10" onclick={() => handleManualSelection(milestone.date)}>
						<span>{milestone.label}</span>
						<time datetime={milestone.date}>{milestone.date}</time>
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	._c2 {
		display: grid;
		gap: 1.5rem;
	}
	@media (min-width: 1024px) {
		._c2 {
			grid-template-columns: 280px minmax(0, 1fr);
		}
	}
	._c3 {
		min-width: 0;
	}
	._c4 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 500;
		color: var(--color-text-secondary);
	}
	._c5 {
		box-sizing: border-box;
		margin-top: 0.25rem;
		width: 100%;
		border-radius: 0.5rem;
		border: 1px solid var(--color-border-primary);
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c6 {
		border-radius: 0.5rem;
		border: 1px dashed var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 1rem;
		min-width: 0;
	}
	._c7 {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 24rem;
	}
	._c8 {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
	._c9 {
		display: grid;
		gap: 0.5rem;
	}
	._c10 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		padding: 0.5rem 0.75rem;
		text-align: left;
		cursor: pointer;
	}
	._c10 time {
		color: var(--color-text-secondary);
		font-size: 0.75rem;
		white-space: nowrap;
	}
</style>
