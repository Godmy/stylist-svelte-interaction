<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import type { SlotMegaMenuSection } from '$stylist/menu/interface/slot/mega-menu-section';
	import MegaMenuPanel from './index.svelte';

	const section: SlotMegaMenuSection = {
		id: 'excursions',
		label: 'Экскурсии',
		intro: 'Однодневные программы по Шри-Ланке с русскоговорящим гидом и трансфером из отеля.',
		columns: [
			{
				id: 'group',
				title: 'Групповые экскурсии',
				links: [
					{
						id: 'sigiriya',
						label: 'Сигирия и Дамбулла',
						href: '#sigiriya',
						description: 'Львиная скала и пещерный храм',
						icon: 'map-pin',
						badge: 'ТОП'
					},
					{
						id: 'kandy',
						label: 'Канди и чайные плантации',
						href: '#kandy',
						description: 'Храм Зуба Будды и чайная фабрика',
						icon: 'tree'
					}
				],
				moreLink: { id: 'group-all', label: 'Все групповые', href: '#group' }
			},
			{
				id: 'private',
				title: 'Индивидуальные экскурсии',
				links: [
					{
						id: 'yala',
						label: 'Сафари в Яле',
						href: '#yala',
						description: 'Леопарды и слоны на джипе',
						icon: 'star',
						badge: 'Новое'
					},
					{
						id: 'whales',
						label: 'Киты в Мириссе',
						href: '#whales',
						description: 'Морская прогулка на рассвете',
						icon: 'globe'
					}
				],
				moreLink: { id: 'private-all', label: 'Все индивидуальные', href: '#private' }
			},
			{
				id: 'topics',
				title: 'По интересам',
				links: [
					{ id: 'nature', label: 'Природа и сафари', href: '#nature', icon: 'tree' },
					{ id: 'culture', label: 'Храмы и история', href: '#culture', icon: 'award' },
					{ id: 'kids', label: 'С детьми', href: '#kids', icon: 'smile' }
				]
			}
		],
		feature: {
			eyebrow: 'Хит сезона',
			title: 'Сигирия на рассвете',
			text: 'Подъём на скалу до жары и толп — с завтраком и трансфером.',
			href: '#sunrise',
			ctaLabel: 'Смотреть программу',
			icon: 'star'
		},
		footerLinks: [
			{ id: 'calendar', label: 'Календарь выездов', href: '#calendar', icon: 'calendar' },
			{ id: 'reviews', label: 'Отзывы туристов', href: '#reviews', icon: 'message-circle' }
		]
	};

	const controls: SlotStory[] = [
		{
			name: 'showIntro',
			type: 'boolean',
			defaultValue: true,
			description: 'Show the lead text at the top of the panel'
		},
		{
			name: 'showFeature',
			type: 'boolean',
			defaultValue: true,
			description: 'Show the promo card column'
		},
		{
			name: 'showFooter',
			type: 'boolean',
			defaultValue: true,
			description: 'Show the footer links row'
		},
		{
			name: 'columns',
			type: 'range',
			defaultValue: 3,
			min: 1,
			max: 3,
			step: 1,
			description: 'Number of link columns'
		},
		{
			name: 'compact',
			type: 'boolean',
			defaultValue: false,
			description: 'Hide link descriptions'
		}
	];

	function buildSection(values: any): SlotMegaMenuSection {
		return {
			...section,
			intro: values.showIntro ? section.intro : undefined,
			feature: values.showFeature ? section.feature : undefined,
			footerLinks: values.showFooter ? section.footerLinks : undefined,
			columns: section.columns?.slice(0, Number(values.columns))
		};
	}
</script>

<Story
	id="molecules-mega-menu-panel"
	title="MegaMenuPanel"
	category="Molecules/Interaction/Navigation"
	description="Content of one mega menu section: intro, grid of link columns, optional promo card and footer links."
	tags={['mega-menu', 'panel', 'navigation']}
	{controls}
>
	{#snippet children(values: any)}
		<MegaMenuPanel
			section={buildSection(values)}
			compact={values.compact}
			onNavigate={(event) => event.preventDefault()}
		/>
	{/snippet}

	{#snippet variants()}
		<div class="_c1">
			<p class="_c2">Columns only, compact</p>
			<MegaMenuPanel
				section={{ id: 'only-columns', label: 'Направления', columns: section.columns }}
				compact
				onNavigate={(event) => event.preventDefault()}
			/>
			<p class="_c2">Feature only</p>
			<MegaMenuPanel
				section={{ id: 'only-feature', label: 'Акция', feature: section.feature }}
				onNavigate={(event) => event.preventDefault()}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	._c2 {
		margin: 0.5rem 0 0;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-text-secondary, #64748b);
	}
</style>
