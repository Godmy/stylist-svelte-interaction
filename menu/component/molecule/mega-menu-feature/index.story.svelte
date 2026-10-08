<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import MegaMenuFeature from './index.svelte';

	const sunsetImage =
		"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23fbbf24'/><stop offset='0.55' stop-color='%23f97316'/><stop offset='1' stop-color='%230e7490'/></linearGradient></defs><rect width='400' height='300' fill='url(%23g)'/><circle cx='290' cy='120' r='46' fill='%23fde68a'/><path d='M0 220 Q100 170 200 215 T400 205 V300 H0Z' fill='%23155e75'/></svg>";

	const controls: SlotStory[] = [
		{
			name: 'eyebrow',
			type: 'text',
			defaultValue: 'Хит сезона',
			description: 'Small caption above the title'
		},
		{
			name: 'title',
			type: 'text',
			defaultValue: 'Сигирия на рассвете',
			description: 'Card heading'
		},
		{
			name: 'text',
			type: 'text',
			defaultValue: 'Подъём на Львиную скалу до жары и толп — с завтраком и трансфером из отеля.',
			description: 'Body text'
		},
		{
			name: 'ctaLabel',
			type: 'text',
			defaultValue: 'Смотреть программу',
			description: 'Call-to-action label'
		},
		{
			name: 'withImage',
			type: 'boolean',
			defaultValue: false,
			description: 'Use a background image instead of the gradient + icon'
		}
	];
</script>

<Story
	id="molecules-mega-menu-feature"
	title="MegaMenuFeature"
	category="Molecules/Interaction/Navigation"
	description="Promo card for the side of a mega menu panel: gradient with icon or background image with overlay."
	tags={['mega-menu', 'feature', 'promo', 'card']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<MegaMenuFeature
				eyebrow={values.eyebrow}
				title={values.title}
				text={values.text}
				ctaLabel={values.ctaLabel}
				href="#feature"
				icon="star"
				image={values.withImage ? sunsetImage : undefined}
				imageAlt="Закат над океаном"
				onNavigate={(event) => event.preventDefault()}
			/>
		</div>
	{/snippet}

	{#snippet variants()}
		<div class="_c2">
			<MegaMenuFeature
				eyebrow="Тур"
				title="Вся Шри-Ланка за 13 дней"
				text="От древних столиц до пляжей Тангалле."
				ctaLabel="Подробнее"
				href="#tour-13"
				image={sunsetImage}
				imageAlt="Закат над океаном"
				onNavigate={(event) => event.preventDefault()}
			/>
			<MegaMenuFeature
				eyebrow="Подарок"
				title="Подарочный сертификат"
				text="На любую групповую или индивидуальную экскурсию."
				ctaLabel="Оформить"
				href="#gift"
				icon="bookmark"
				onNavigate={(event) => event.preventDefault()}
			/>
			<MegaMenuFeature title="Только заголовок" href="#plain" icon="map" />
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		max-width: 18rem;
	}

	._c2 {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: 1rem;
	}
</style>
