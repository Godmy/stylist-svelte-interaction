<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import MegaMenuLink from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Сафари в Яле',
			description: 'Link text'
		},
		{
			name: 'description',
			type: 'text',
			defaultValue: 'Леопарды, слоны и крокодилы на джипе',
			description: 'Secondary line under the label'
		},
		{
			name: 'icon',
			type: 'select',
			defaultValue: 'star',
			options: ['none', 'star', 'map-pin', 'map', 'tree', 'globe', 'calendar', 'info'],
			description: 'Icon name from the svg set'
		},
		{
			name: 'badge',
			type: 'text',
			defaultValue: 'Новое',
			description: 'Short badge after the label (empty to hide)'
		},
		{
			name: 'active',
			type: 'boolean',
			defaultValue: false,
			description: 'Marks the link as the current page'
		},
		{
			name: 'compact',
			type: 'boolean',
			defaultValue: false,
			description: 'Single-line rendering without description'
		},
		{
			name: 'external',
			type: 'boolean',
			defaultValue: false,
			description: 'Open in a new tab'
		}
	];
</script>

<Story
	id="atoms-mega-menu-link"
	title="MegaMenuLink"
	category="Atoms/Interaction/Navigation"
	description="Rich link used inside mega menu panels: icon tile, label with badge and an optional description line."
	tags={['mega-menu', 'link', 'navigation']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<MegaMenuLink
				label={values.label}
				href="#yala"
				description={values.description}
				icon={values.icon === 'none' ? undefined : values.icon}
				badge={values.badge || undefined}
				active={values.active}
				compact={values.compact}
				external={values.external}
				onNavigate={(event) => event.preventDefault()}
			/>
		</div>
	{/snippet}

	{#snippet variants()}
		<div class="_c2">
			<MegaMenuLink
				label="Сигирия и Дамбулла"
				href="#sigiriya"
				description="Львиная скала и пещерный храм за один день"
				icon="map-pin"
				badge="ТОП"
			/>
			<MegaMenuLink
				label="Канди и чайные плантации"
				href="#kandy"
				description="Текущая страница"
				icon="tree"
				active
			/>
			<MegaMenuLink label="Без иконки и описания" href="#plain" />
			<MegaMenuLink label="Компактная ссылка" href="#compact" icon="calendar" compact />
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		max-width: 22rem;
	}

	._c2 {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: 0.5rem;
	}
</style>
