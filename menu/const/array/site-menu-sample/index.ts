import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';

/** Shared fictional destinations for navigation layouts. */
export const SITE_MENU_SAMPLE: SiteMenuItem[] = [
	{
		id: 'overview',
		label: 'Обзор',
		group: 'Студия',
		description: 'Сводка проектов и ближайших событий.'
	},
	{
		id: 'projects',
		label: 'Проекты',
		group: 'Студия',
		description: 'Активные проекты команды и этапы работы.'
	},
	{
		id: 'team',
		label: 'Команда',
		group: 'Студия',
		description: 'Люди, роли и направления работы.'
	},
	{
		id: 'catalog',
		label: 'Каталог',
		group: 'Материалы',
		description: 'Коллекции и готовые решения студии.'
	},
	{
		id: 'journal',
		label: 'Журнал',
		group: 'Материалы',
		description: 'Истории о процессе и заметки авторов.'
	},
	{
		id: 'guides',
		label: 'Руководства',
		group: 'Материалы',
		description: 'Подробные инструкции и ответы на вопросы.'
	},
	{
		id: 'events',
		label: 'События',
		group: 'Сообщество',
		description: 'Встречи, лекции и открытые обсуждения.'
	},
	{
		id: 'contacts',
		label: 'Контакты',
		group: 'Сообщество',
		description: 'Адрес студии и способы связи.'
	}
];
