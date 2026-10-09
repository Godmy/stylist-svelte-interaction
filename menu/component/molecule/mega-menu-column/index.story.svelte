<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import type { SlotMegaMenuLink } from '$stylist/menu/interface/slot/mega-menu-link';
	import MegaMenuColumn from './index.svelte';

	const links: SlotMegaMenuLink[] = [
		{
			id: 'sigiriya',
			label: 'Сигирия и Дамбулла',
			href: '#sigiriya',
			description: 'Львиная скала и пещерный храм за один день',
			icon: 'map-pin',
			badge: 'ТОП'
		},
		{
			id: 'kandy',
			label: 'Канди и чайные плантации',
			href: '#kandy',
			description: 'Храм Зуба Будды, ботанический сад, чайная фабрика',
			icon: 'tree',
			active: true
		},
		{
			id: 'galle',
			label: 'Галле и южное побережье',
			href: '#galle',
			description: 'Голландский форт и черепашья ферма',
			icon: 'map'
		},
		{
			id: 'ella',
			label: 'Элла и девятиарочный мост',
			href: '#ella',
			description: 'Поезд через горы и водопады',
			icon: 'calendar'
		}
	];

	const destinations: SlotMegaMenuLink[] = [
		{ id: 'unawatuna', label: 'Унаватуна', href: '#unawatuna' },
		{ id: 'mirissa', label: 'Мирисса', href: '#mirissa' },
		{ id: 'hikkaduwa', label: 'Хиккадува', href: '#hikkaduwa' },
		{ id: 'tangalle', label: 'Тангалле', href: '#tangalle', badge: 'Тихо' }
	];

	const controls: SlotStory[] = [
		{
			name: 'title',
			type: 'text',
			defaultValue: 'Групповые экскурсии',
			description: 'Column heading'
		},
		{
			name: 'count',
			type: 'range',
			defaultValue: 4,
			min: 1,
			max: 4,
			step: 1,
			description: 'Number of links'
		},
		{
			name: 'compact',
			type: 'boolean',
			defaultValue: false,
			description: 'Hide link descriptions'
		},
		{
			name: 'showMore',
			type: 'boolean',
			defaultValue: true,
			description: 'Show the trailing "see all" link'
		}
	];
</script>

<Story
	id="molecules-mega-menu-column"
	title="MegaMenuColumn"
	category="Molecules/Interaction/Navigation"
	description="Titled list of mega menu links with an optional trailing «see all» link."
	tags={['mega-menu', 'column', 'navigation', 'list']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<MegaMenuColumn
				title={values.title}
				links={links.slice(0, Number(values.count))}
				compact={values.compact}
				moreLink={values.showMore ? { id: 'all', label: 'Все экскурсии', href: '#all' } : undefined}
				onNavigate={(event) => event.preventDefault()}
			/>
		</div>
	{/snippet}

	{#snippet variants()}
		<div class="_c2">
			<MegaMenuColumn
				title="Юг и побережье"
				links={destinations}
				onNavigate={(event) => event.preventDefault()}
			/>
			<MegaMenuColumn
				title="Подготовка к поездке"
				links={[
					{ id: 'visa', label: 'Виза и въезд', href: '#visa', icon: 'info' },
					{ id: 'insurance', label: 'Страховка', href: '#insurance', icon: 'security' },
					{ id: 'payment', label: 'Оплата', href: '#payment', icon: 'payment' }
				]}
				compact
				onNavigate={(event) => event.preventDefault()}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		max-width: 22rem;
	}

	._c2 {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: 1.5rem;
	}
</style>
