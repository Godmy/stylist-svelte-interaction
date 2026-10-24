import { describe, expect, it } from 'vitest';
import { siteMenuSearch } from '$stylist/menu/function/transform/site-menu-search';
import { SITE_MENU_SAMPLE } from '$stylist/menu/const/array/site-menu-sample';

describe('siteMenuSearch', () => {
	it('matches labels case-insensitively after trimming', () => {
		expect(siteMenuSearch(SITE_MENU_SAMPLE, '  ПРО ').map((item) => item.id)).toEqual(['projects']);
		expect(siteMenuSearch(SITE_MENU_SAMPLE, 'нет такого')).toEqual([]);
	});

	it('keeps every destination for an empty query and does not search descriptions', () => {
		expect(siteMenuSearch(SITE_MENU_SAMPLE, ' ')).toHaveLength(SITE_MENU_SAMPLE.length);
		expect(siteMenuSearch(SITE_MENU_SAMPLE, 'сводка')).toEqual([]);
	});
});
