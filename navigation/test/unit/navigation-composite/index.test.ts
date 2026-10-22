import { describe, expect, it } from 'vitest';
import demoGraph from '$stylist/navigation/data/json/navigation-graph-demo/index.json';
import { NavigationComposite } from '$stylist/navigation/class/composite/navigation';
import { resolveNavigationGraphLayout } from '$stylist/navigation/function/resolve/navigation-graph-layout';
import type { ContractNavigationEntry } from '$stylist/navigation/interface/contract/navigation-entry';

const ids = (stack: readonly ContractNavigationEntry[] | null) => stack?.map((entry) => entry.id);

describe('NavigationComposite', () => {
	const graph = NavigationComposite.fromGraph(demoGraph);

	it('resolves nested graphs to their start fragment', () => {
		expect(graph.startLeaf().id).toBe('discover');
		expect(graph.resolve('catalog')?.id).toBe('catalog-list');
		expect(graph.resolve('account')?.id).toBe('profile');
		expect(graph.find('catalog')?.contains('catalog-gallery')).toBe(true);
		expect(graph.leaves().map((leaf) => leaf.id)).toEqual([
			'discover',
			'catalog-list',
			'catalog-detail',
			'catalog-gallery',
			'bookings',
			'profile',
			'settings'
		]);
	});

	it('uses flagged top-level destinations and inherits graph actions', () => {
		expect(graph.topLevel().map((node) => node.id)).toEqual([
			'discover',
			'catalog',
			'bookings',
			'profile',
			'settings'
		]);
		expect(graph.isTopLevel('catalog-list')).toBe(true);
		expect(graph.isTopLevel('catalog-detail')).toBe(false);
		expect(graph.actionsFrom('catalog-detail').map((action) => action.id)).toEqual([
			'open-gallery',
			'book-tour'
		]);
	});

	it('builds the back stack from actions, destinations and the drawer', () => {
		let stack = graph.initial();
		stack = graph.navigate(stack, 'explore') ?? stack;
		stack = graph.navigate(stack, 'open-tour', { tour: 'Yala' }) ?? stack;
		stack = graph.navigate(stack, 'open-gallery') ?? stack;
		expect(ids(stack)).toEqual(['discover', 'catalog-list', 'catalog-detail', 'catalog-gallery']);
		expect(stack[2].args).toEqual({ tour: 'Yala' });

		// popUpTo a fragment + singleTop reuses its entry.
		const list = graph.navigate(stack, 'all-tours');
		expect(ids(list)).toEqual(['discover', 'catalog-list']);
		expect(list?.[1]).toBe(stack[1]);

		// popUpTo an inclusive nested graph drops the whole flow.
		expect(ids(graph.navigate(stack, 'book-tour'))).toEqual(['discover', 'bookings']);

		expect(graph.navigate(stack, 'unknown')).toBeNull();
		expect(ids(graph.back(stack))).toEqual(['discover', 'catalog-list', 'catalog-detail']);
		expect(graph.back(graph.initial())).toBeNull();
		expect(ids(graph.select(stack, 'settings'))).toEqual(['discover', 'settings']);
		expect(ids(graph.select(stack, 'discover'))).toEqual(['discover']);
		expect(ids(graph.initial('catalog-detail'))).toEqual(['discover', 'catalog-detail']);
	});

	it('rejects duplicate ids', () => {
		expect(() =>
			NavigationComposite.fromGraph({
				id: 'root',
				label: 'Root',
				destinations: [
					{ id: 'a', label: 'A' },
					{ id: 'a', label: 'A again' }
				]
			})
		).toThrow(/Duplicate/);
	});
});

describe('resolveNavigationGraphLayout', () => {
	it('places the drawer first and every fragment once', () => {
		const layout = resolveNavigationGraphLayout(NavigationComposite.fromGraph(demoGraph));
		expect(layout.nodes[0]).toMatchObject({ id: '#drawer', kind: 'drawer', x: 16 });
		expect(layout.nodes.filter((node) => node.kind === 'fragment')).toHaveLength(7);
		const column = (id: string) => layout.nodes.find((node) => node.id === id)?.x;
		expect(column('catalog-detail')).toBeGreaterThan(column('catalog-list') ?? 0);
		expect(layout.edges.filter((edge) => edge.kind === 'drawer')).toHaveLength(5);
		// The graph-level `book-tour` action leaves from every catalog fragment.
		expect(layout.edges.filter((edge) => edge.label === 'Book')).toHaveLength(3);
	});
});
