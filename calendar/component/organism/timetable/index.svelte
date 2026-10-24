<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlSmall from '$stylist/html/component/atom/small/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlStrong from '$stylist/html/component/atom/strong/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlTable from '$stylist/html/component/molecule/table/index.svelte';
	import HtmlTbody from '$stylist/html/component/molecule/tbody/index.svelte';
	import HtmlThead from '$stylist/html/component/molecule/thead/index.svelte';
	import HtmlTr from '$stylist/html/component/molecule/tr/index.svelte';
	import HtmlCaption from '$stylist/html/component/organism/caption/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlTd from '$stylist/html/component/organism/td/index.svelte';
	import HtmlTh from '$stylist/html/component/organism/th/index.svelte';
	import { timetableCell } from '$stylist/calendar/function/resolve/timetable-cell';
	import type { RecipeTimetable } from '$stylist/calendar/interface/recipe/timetable';

	let {
		element = $bindable(null),
		days,
		periods,
		classes,
		lessons,
		classFilter = [],
		teacherFilter = [],
		onCellSelect,
		caption = 'Timetable',
		dayHeader = 'Day',
		periodHeader = 'Period',
		emptyLabel = 'No timetable data',
		emptyCellLabel = 'Empty period',
		class: className,
		...rest
	}: RecipeTimetable = $props();

	const visibleClasses = $derived(
		classes.filter((item) => !classFilter.length || classFilter.includes(item.id))
	);
</script>

<HtmlDiv bind:element {...rest} class={['c-timetable', className]}>
	{#if days.length && periods.length && visibleClasses.length}
		<HtmlTable class="c-timetable__table">
			<HtmlCaption class="c-timetable__caption">{caption}</HtmlCaption>
			<HtmlThead>
				<HtmlTr>
					<HtmlTh scope="col" class="c-timetable__head">{dayHeader}</HtmlTh>
					<HtmlTh scope="col" class="c-timetable__head">{periodHeader}</HtmlTh>
					{#each visibleClasses as schoolClass (schoolClass.id)}
						<HtmlTh scope="col" class="c-timetable__head">{schoolClass.label}</HtmlTh>
					{/each}
				</HtmlTr>
			</HtmlThead>
			<HtmlTbody>
				{#each days as day (day.id)}
					{#each periods as period, periodIndex (period.id)}
						<HtmlTr class="c-timetable__row">
							{#if periodIndex === 0}
								<HtmlTh scope="rowgroup" rowspan={periods.length} class="c-timetable__head">
									{day.label}
								</HtmlTh>
							{/if}
							<HtmlTh scope="row" class="c-timetable__head">
								{period.label}
								{#if period.start}
									<HtmlSmall class="c-timetable__note">
										{period.start}{period.end ? `–${period.end}` : ''}
									</HtmlSmall>
								{/if}
							</HtmlTh>
							{#each visibleClasses as schoolClass (schoolClass.id)}
								{@const cellLessons = timetableCell(
									lessons,
									day.id,
									period.id,
									schoolClass.id,
									teacherFilter
								)}
								{#snippet content()}
									{#each cellLessons as lesson (lesson.id)}
										<HtmlSpan
											class="c-timetable__lesson"
											style={lesson.color
												? `border-inline-start-color: ${lesson.color}`
												: undefined}
										>
											<HtmlStrong>{lesson.subject}</HtmlStrong>
											<HtmlSmall class="c-timetable__note">{lesson.teachers.join(', ')}</HtmlSmall>
											{#if lesson.marker}
												<HtmlSmall class="c-timetable__note">{lesson.marker}</HtmlSmall>
											{/if}
										</HtmlSpan>
									{:else}
										<HtmlSpan aria-hidden="true" class="c-timetable__empty">—</HtmlSpan>
									{/each}
								{/snippet}
								<HtmlTd class="c-timetable__cell">
									{#if onCellSelect}
										<HtmlButton
											type="button"
											class="c-timetable__select"
											aria-label={`${day.label}, ${period.label}, ${schoolClass.label}: ${cellLessons.map((lesson) => lesson.subject).join(', ') || emptyCellLabel}`}
											onclick={() =>
												onCellSelect?.({
													dayId: day.id,
													periodId: period.id,
													classId: schoolClass.id,
													lessons: cellLessons
												})}
										>
											{@render content()}
										</HtmlButton>
									{:else}
										{@render content()}
									{/if}
								</HtmlTd>
							{/each}
						</HtmlTr>
					{/each}
				{/each}
			</HtmlTbody>
		</HtmlTable>
	{:else}
		<HtmlP role="status" class="c-timetable__status">{emptyLabel}</HtmlP>
	{/if}
</HtmlDiv>

<style>
	:global {
		.c-timetable {
			overflow-x: auto;
			color: var(--color-text-primary);
		}
		.c-timetable__table {
			width: 100%;
			margin: 0;
			border-collapse: collapse;
			font: inherit;
			font-variant-numeric: tabular-nums;
		}
		.c-timetable__caption {
			caption-side: top;
			padding-block: calc(var(--layout-spacing-1rem, 1rem) * 0.75);
			text-align: start;
			font-size: var(--typography-font-size-5, 1.25rem);
			font-weight: var(--typography-font-weight-bold, 700);
			color: var(--color-text-primary);
		}
		.c-timetable__head,
		.c-timetable__cell {
			min-width: 6rem;
			padding: var(--density-block, 0.5rem) var(--density-inline, 0.75rem);
			border: var(--border-width-thin, 1px) solid var(--color-border-primary);
			text-align: start;
			vertical-align: top;
		}
		.c-timetable__head {
			font-weight: var(--typography-font-weight-semibold, 600);
			background: var(--color-background-secondary);
			color: var(--color-text-primary);
		}
		.c-timetable__note {
			display: block;
			font-size: var(--font-relative-small, 0.875em);
			font-weight: var(--typography-font-weight-normal, 400);
			color: var(--color-text-secondary);
		}
		.c-timetable__lesson {
			display: block;
			margin-block-end: calc(var(--layout-spacing-1rem, 1rem) / 4);
			padding-inline-start: calc(var(--layout-spacing-1rem, 1rem) / 2);
			border-inline-start: var(--border-width-medium, 2px) solid var(--color-primary-500);
		}
		.c-timetable__empty {
			color: var(--color-text-tertiary, var(--color-text-secondary));
		}
		.c-timetable__select {
			display: block;
			width: 100%;
			min-height: 3rem;
			margin: 0;
			padding: 0;
			border: 0;
			border-radius: var(--layout-border-radius-base, 0.25rem);
			background: transparent;
			color: inherit;
			font: inherit;
			text-align: start;
			cursor: pointer;
		}
		.c-timetable__select:hover {
			background: var(--color-background-container, var(--color-background-secondary));
		}
		.c-timetable__select:focus-visible {
			outline: var(--focus-width, 2px) solid var(--color-border-accent, var(--color-primary-500));
			outline-offset: var(--focus-offset, 0.125rem);
		}
		.c-timetable__status {
			margin: 0;
			color: var(--color-text-secondary);
		}
		@media print {
			.c-timetable {
				overflow: visible;
			}
			.c-timetable__head,
			.c-timetable__cell {
				min-width: 0;
			}
			.c-timetable__row {
				break-inside: avoid;
			}
		}
	}
</style>
