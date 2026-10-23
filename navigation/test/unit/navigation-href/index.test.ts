import { describe, expect, it } from 'vitest';
import demoGraph from '$stylist/navigation/data/json/navigation-graph-demo/index.json';
import { resolveNavigationDestination } from '$stylist/navigation/function/resolve/navigation-destination';
import { resolveNavigationHref } from '$stylist/navigation/function/resolve/navigation-href';
import type { ContractNavigationGraph } from '$stylist/navigation/interface/contract/navigation-graph';

describe('resolveNavigationHref', () => {
	it('substitutes encoded args into the template', () => {
		expect(resolveNavigationHref({ href: '/admin/orders/:number' }, { number: 42 })).toBe(
			'/admin/orders/42'
		);
		expect(resolveNavigationHref({ href: '/tours/:tour/photos' }, { tour: 'Yala safari' })).toBe(
			'/tours/Yala%20safari/photos'
		);
		expect(resolveNavigationHref({ href: '/admin' })).toBe('/admin');
	});

	it('is undefined without a href or with a missing arg', () => {
		expect(resolveNavigationHref({})).toBeUndefined();
		expect(resolveNavigationHref({ href: '/orders/:number' })).toBeUndefined();
		expect(resolveNavigationHref({ href: '/orders/:number' }, { number: '' })).toBeUndefined();
	});
});

describe('resolveNavigationDestination', () => {
	it('matches a path and decodes its args', () => {
		const match = resolveNavigationDestination(demoGraph, '/tours/Yala%20safari/photos?x=1#top');
		expect(match?.destination.id).toBe('catalog-gallery');
		expect(match?.args).toEqual({ tour: 'Yala safari' });
		expect(resolveNavigationDestination(demoGraph, '/')?.destination.id).toBe('discover');
		expect(resolveNavigationDestination(demoGraph, '/account/settings/')?.destination.id).toBe(
			'settings'
		);
		expect(resolveNavigationDestination(demoGraph, '/nowhere')).toBeUndefined();
	});

	it('prefers the template with fewer args and round-trips the href', () => {
		const graph: ContractNavigationGraph = {
			id: 'root',
			label: 'Root',
			destinations: [
				{ id: 'tour', label: 'Tour', href: '/tours/:slug' },
				{ id: 'new', label: 'New', href: '/tours/new' }
			]
		};
		expect(resolveNavigationDestination(graph, '/tours/new')?.destination.id).toBe('new');
		const match = resolveNavigationDestination(graph, '/tours/ella');
		expect(match && resolveNavigationHref(match.destination, match.args)).toBe('/tours/ella');
	});
});
