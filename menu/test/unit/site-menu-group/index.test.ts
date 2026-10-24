import { describe, expect, it } from 'vitest';
import { siteMenuGroup } from '$stylist/menu/function/transform/site-menu-group';
import { SITE_MENU_SAMPLE } from '$stylist/menu/const/array/site-menu-sample';

describe('siteMenuGroup', () => {
	it('keeps the order of sections and of destinations inside them', () => {
		expect(
			siteMenuGroup(SITE_MENU_SAMPLE).map(({ group, items }) => [group, items.map((i) => i.id)])
		).toEqual([
			['Студия', ['overview', 'projects', 'team']],
			['Материалы', ['catalog', 'journal', 'guides']],
			['Сообщество', ['events', 'contacts']]
		]);
	});

	it('joins a section that reappears later', () => {
		const [first, second, third] = SITE_MENU_SAMPLE;
		expect(siteMenuGroup([first, { ...third, group: 'Другое' }, second])).toEqual([
			{ group: 'Студия', items: [first, second] },
			{ group: 'Другое', items: [{ ...third, group: 'Другое' }] }
		]);
		expect(siteMenuGroup([])).toEqual([]);
	});
});
