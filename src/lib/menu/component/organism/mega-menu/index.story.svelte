<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import type { SlotMegaMenuSection } from '$stylist/menu/interface/slot/mega-menu-section';
	import MegaMenu from './index.svelte';

	const sections: SlotMegaMenuSection[] = [
		{
			id: 'excursions',
			label: 'Экскурсии',
			active: true,
			intro:
				'Однодневные и двухдневные программы по Шри-Ланке с русскоговорящим гидом. Выезд из отелей западного и южного побережья.',
			columns: [
				{
					id: 'group',
					title: 'Групповые экскурсии',
					links: [
						{
							id: 'sigiriya',
							label: 'Сигирия и Дамбулла',
							href: '#excursions/sigiriya',
							description: 'Львиная скала и пещерный храм за один день',
							icon: 'map-pin',
							badge: 'ТОП'
						},
						{
							id: 'kandy',
							label: 'Канди и чайные плантации',
							href: '#excursions/kandy',
							description: 'Храм Зуба Будды, ботанический сад, чайная фабрика',
							icon: 'tree'
						},
						{
							id: 'galle',
							label: 'Галле и южное побережье',
							href: '#excursions/galle',
							description: 'Голландский форт, черепашья ферма, мангровые заросли',
							icon: 'map'
						}
					],
					moreLink: { id: 'group-all', label: 'Все групповые экскурсии', href: '#excursions/group' }
				},
				{
					id: 'private',
					title: 'Индивидуальные экскурсии',
					links: [
						{
							id: 'yala',
							label: 'Сафари в Яле',
							href: '#excursions/yala',
							description: 'Леопарды, слоны и крокодилы на джипе',
							icon: 'star',
							badge: 'Новое'
						},
						{
							id: 'whales',
							label: 'Киты в Мириссе',
							href: '#excursions/whales',
							description: 'Морская прогулка на рассвете, сезон ноябрь — апрель',
							icon: 'globe'
						},
						{
							id: 'ella',
							label: 'Элла и девятиарочный мост',
							href: '#excursions/ella',
							description: 'Поезд через горы, водопады и смотровые площадки',
							icon: 'calendar'
						}
					],
					moreLink: {
						id: 'private-all',
						label: 'Все индивидуальные экскурсии',
						href: '#excursions/private'
					}
				},
				{
					id: 'topics',
					title: 'По интересам',
					links: [
						{ id: 'nature', label: 'Природа и сафари', href: '#topics/nature', icon: 'tree' },
						{ id: 'culture', label: 'Храмы и история', href: '#topics/culture', icon: 'award' },
						{ id: 'kids', label: 'С детьми', href: '#topics/kids', icon: 'smile' },
						{ id: 'photo', label: 'Фототуры', href: '#topics/photo', icon: 'image' }
					]
				}
			],
			feature: {
				eyebrow: 'Хит сезона',
				title: 'Сигирия на рассвете',
				text: 'Подъём на Львиную скалу до жары и толп — с завтраком и трансфером из отеля.',
				href: '#excursions/sigiriya-sunrise',
				ctaLabel: 'Смотреть программу',
				icon: 'star'
			},
			footerLinks: [
				{ id: 'calendar', label: 'Календарь выездов', href: '#calendar', icon: 'calendar' },
				{ id: 'reviews', label: 'Отзывы туристов', href: '#reviews', icon: 'message-circle' },
				{ id: 'gift', label: 'Подарочный сертификат', href: '#gift', icon: 'bookmark' }
			]
		},
		{
			id: 'tours',
			label: 'Туры',
			intro: 'Многодневные маршруты по острову с проживанием, транспортом и сопровождением.',
			columns: [
				{
					id: 'duration',
					title: 'По длительности',
					links: [
						{
							id: 'tour-7',
							label: 'Тур на 7 дней',
							href: '#tours/7',
							description: 'Культурный треугольник и океан',
							icon: 'clock'
						},
						{
							id: 'tour-11',
							label: 'Тур на 11 дней',
							href: '#tours/11',
							description: 'Горы, чай, сафари и побережье',
							icon: 'clock',
							badge: 'ТОП'
						},
						{
							id: 'tour-13',
							label: 'Тур на 13 дней',
							href: '#tours/13',
							description: 'Весь остров без спешки',
							icon: 'clock'
						}
					]
				},
				{
					id: 'season',
					title: 'По сезону',
					links: [
						{ id: 'winter', label: 'Зима: юг и запад', href: '#tours/winter', icon: 'calendar' },
						{ id: 'summer', label: 'Лето: восток', href: '#tours/summer', icon: 'calendar' },
						{ id: 'new-year', label: 'Новогодние туры', href: '#tours/new-year', icon: 'star' }
					],
					moreLink: { id: 'tours-all', label: 'Все туры', href: '#tours' }
				}
			],
			feature: {
				eyebrow: 'Тур',
				title: 'Вся Шри-Ланка за 13 дней',
				text: 'От древних столиц до пляжей Тангалле — с проживанием и гидом на всём маршруте.',
				href: '#tours/13',
				ctaLabel: 'Подробнее о туре',
				image:
					"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23fbbf24'/><stop offset='0.55' stop-color='%23f97316'/><stop offset='1' stop-color='%230e7490'/></linearGradient></defs><rect width='400' height='300' fill='url(%23g)'/><circle cx='290' cy='120' r='46' fill='%23fde68a'/><path d='M0 220 Q100 170 200 215 T400 205 V300 H0Z' fill='%23155e75'/></svg>",
				imageAlt: 'Закат над океаном'
			}
		},
		{
			id: 'destinations',
			label: 'Направления',
			columns: [
				{
					id: 'south',
					title: 'Юг и побережье',
					links: [
						{ id: 'unawatuna', label: 'Унаватуна', href: '#dest/unawatuna' },
						{ id: 'mirissa', label: 'Мирисса', href: '#dest/mirissa' },
						{ id: 'hikkaduwa', label: 'Хиккадува', href: '#dest/hikkaduwa' },
						{ id: 'tangalle', label: 'Тангалле', href: '#dest/tangalle' }
					]
				},
				{
					id: 'triangle',
					title: 'Культурный треугольник',
					links: [
						{ id: 'anuradhapura', label: 'Анурадхапура', href: '#dest/anuradhapura' },
						{ id: 'polonnaruwa', label: 'Полоннарува', href: '#dest/polonnaruwa' },
						{ id: 'dambulla', label: 'Дамбулла', href: '#dest/dambulla' }
					]
				},
				{
					id: 'hills',
					title: 'Горы и чай',
					links: [
						{ id: 'nuwara', label: 'Нувара-Элия', href: '#dest/nuwara-eliya' },
						{ id: 'ella-dest', label: 'Элла', href: '#dest/ella' },
						{ id: 'horton', label: 'Плато Хортон', href: '#dest/horton' }
					]
				},
				{
					id: 'east',
					title: 'Восток',
					links: [
						{ id: 'trinco', label: 'Тринкомали', href: '#dest/trincomalee' },
						{ id: 'arugam', label: 'Аругам-Бэй', href: '#dest/arugam-bay', badge: 'Сёрф' }
					]
				}
			],
			footerLinks: [
				{ id: 'map', label: 'Карта острова', href: '#map', icon: 'map' },
				{ id: 'weather', label: 'Погода по месяцам', href: '#weather', icon: 'calendar' }
			]
		},
		{
			id: 'info',
			label: 'Туристам',
			columns: [
				{
					id: 'prepare',
					title: 'Подготовка к поездке',
					links: [
						{
							id: 'visa',
							label: 'Виза и въезд',
							href: '#info/visa',
							description: 'ETA онлайн, сроки и стоимость',
							icon: 'info'
						},
						{
							id: 'insurance',
							label: 'Страховка',
							href: '#info/insurance',
							description: 'Что важно для экскурсий и сафари',
							icon: 'security'
						}
					]
				},
				{
					id: 'booking',
					title: 'Бронирование',
					links: [
						{
							id: 'payment',
							label: 'Оплата и предоплата',
							href: '#info/payment',
							description: 'Карты РФ, рубли и доллары',
							icon: 'payment'
						},
						{
							id: 'extras',
							label: 'Дополнительные услуги',
							href: '#info/extras',
							description: 'Трансферы, обеды, входные билеты',
							icon: 'check-circle'
						}
					]
				}
			]
		},
		{ id: 'blog', label: 'Блог', href: '#blog' },
		{ id: 'contacts', label: 'Контакты', href: '#contacts' }
	];

	const sectionIds = ['none', ...sections.filter((s) => s.columns).map((s) => s.id)];

	const controls: SlotStory[] = [
		{
			name: 'defaultOpenId',
			type: 'select',
			defaultValue: 'excursions',
			options: sectionIds,
			description: 'Section open on first render (the menu remounts when changed)'
		},
		{
			name: 'openOnHover',
			type: 'boolean',
			defaultValue: true,
			description: 'Open panels on mouse hover with intent delay'
		},
		{
			name: 'compact',
			type: 'boolean',
			defaultValue: false,
			description: 'Hide link descriptions inside the panels'
		},
		{
			name: 'ariaLabel',
			type: 'text',
			defaultValue: 'Главное меню',
			description: 'Accessible name of the navigation landmark'
		}
	];

	let log = $state<string[]>([]);

	function pushLog(entry: string) {
		log = [entry, ...log].slice(0, 6);
	}

	function handleNavigate(event: MouseEvent) {
		event.preventDefault();
		const href = (event.currentTarget as HTMLAnchorElement | null)?.getAttribute('href');
		pushLog(`navigate → ${href}`);
	}
</script>

<Story
	id="organisms-mega-menu"
	title="MegaMenu"
	category="Organisms/Interaction/Navigation"
	description="Top navigation with full-width panels: link columns, promo card and footer links. Hover with intent delay, click/tap toggling, ←/→ between triggers, ↓ into the panel, Esc to close."
	tags={['mega-menu', 'menu', 'navigation', 'header', 'dropdown']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			{#key values.defaultOpenId}
				<MegaMenu
					{sections}
					defaultOpenId={values.defaultOpenId === 'none' ? undefined : values.defaultOpenId}
					openOnHover={values.openOnHover}
					compact={values.compact}
					ariaLabel={values.ariaLabel}
					onOpenChange={(id) => pushLog(`open → ${id ?? 'closed'}`)}
					onNavigate={handleNavigate}
				>
					{#snippet leading()}
						<a class="_c2" href="#home" onclick={(event) => event.preventDefault()}>
							<span class="_c3">LT</span>
							Lanka Tour
						</a>
					{/snippet}
					{#snippet trailing()}
						<a class="_c4" href="#booking" onclick={(event) => event.preventDefault()}>
							Подобрать экскурсию
						</a>
					{/snippet}
				</MegaMenu>
			{/key}
			<div class="_c5">
				<p class="_c6">Event log</p>
				{#each log as entry}
					<code class="_c7">{entry}</code>
				{:else}
					<span class="_c7">Hover, click or use the keyboard…</span>
				{/each}
			</div>
		</div>
	{/snippet}

	{#snippet variants()}
		<div class="_c8">
			<p class="_c6">Compact, click-only, two sections</p>
			<MegaMenu
				sections={[sections[1], sections[3], sections[5]]}
				compact
				openOnHover={false}
				ariaLabel="Компактное меню"
				onNavigate={(event) => event.preventDefault()}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 36rem;
	}

	._c2 {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 800;
		font-size: 1.0625rem;
		color: var(--color-text-primary, #0f172a);
		text-decoration: none;
	}

	._c3 {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		background: var(--color-primary-600, #0e7490);
		color: #fff;
		font-size: 0.8125rem;
	}

	._c4 {
		padding: 0.5rem 1rem;
		border-radius: 999px;
		background: var(--color-primary-600, #0e7490);
		color: #fff;
		font-size: 0.875rem;
		font-weight: 700;
		text-decoration: none;
		white-space: nowrap;
	}

	._c5 {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-top: auto;
		padding: 0.75rem 1rem;
		border-radius: 0.75rem;
		background: var(--color-background-secondary, #f1f5f9);
	}

	._c6 {
		margin: 0 0 0.25rem;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-text-secondary, #64748b);
	}

	._c7 {
		font-size: 0.8125rem;
		color: var(--color-text-primary, #0f172a);
	}

	._c8 {
		min-height: 26rem;
		padding: 1rem 0;
	}
</style>
