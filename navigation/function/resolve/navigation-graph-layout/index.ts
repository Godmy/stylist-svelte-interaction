import type { NavigationComposite } from '$stylist/navigation/class/composite/navigation';
import type { ContractNavigationGraphLayout } from '$stylist/navigation/interface/contract/navigation-graph-layout';

/**
 * Lays fragments out in columns by their distance from the drawer: top-level fragments
 * first, then targets of declared actions. Backward transitions loop under the boxes.
 */
export function resolveNavigationGraphLayout(
	composite: NavigationComposite,
	options: {
		drawerLabel?: string;
		nodeWidth?: number;
		nodeHeight?: number;
		gapX?: number;
		gapY?: number;
		padding?: number;
	} = {}
): ContractNavigationGraphLayout {
	const {
		drawerLabel = 'Drawer',
		nodeWidth = 176,
		nodeHeight = 56,
		gapX = 72,
		gapY = 24,
		padding = 16
	} = options;
	const drawerId = '#drawer';
	const root = composite.root;
	const start = root.startLeaf();
	const leaves = root.leaves();
	const topLevel = root.topLevel().map((node) => node.startLeaf());

	const edges: { from: string; to: string; label?: string; kind: 'action' | 'drawer' }[] = [];
	const seen = new Set<string>();
	const addEdge = (edge: (typeof edges)[number]) => {
		const id = `${edge.kind}:${edge.from}>${edge.to}:${edge.label ?? ''}`;
		if (seen.has(id) || edge.from === edge.to) return;
		seen.add(id);
		edges.push(edge);
	};
	for (const leaf of topLevel) addEdge({ from: drawerId, to: leaf.id, kind: 'drawer' });
	for (const { action, from, to } of root.transitions()) {
		const target = to.startLeaf();
		for (const source of from.leaves()) {
			addEdge({ from: source.id, to: target.id, label: action.label ?? action.id, kind: 'action' });
		}
	}

	// Breadth-first column index: drawer 0, top-level (and start) 1, action targets further.
	const column = new Map<string, number>([[drawerId, 0]]);
	const queue = [start.id, ...topLevel.map((leaf) => leaf.id)];
	for (const id of queue) if (!column.has(id)) column.set(id, 1);
	while (queue.length) {
		const id = queue.shift() as string;
		for (const edge of edges) {
			if (edge.from !== id || column.has(edge.to)) continue;
			column.set(edge.to, (column.get(id) ?? 0) + 1);
			queue.push(edge.to);
		}
	}
	const lastColumn = Math.max(...column.values()) + 1;
	for (const leaf of leaves) if (!column.has(leaf.id)) column.set(leaf.id, lastColumn);

	const rows = new Map<number, number>();
	const nodes: ContractNavigationGraphLayout['nodes'] = [];
	const place = (node: Omit<ContractNavigationGraphLayout['nodes'][number], 'x' | 'y'>) => {
		const col = column.get(node.id) ?? lastColumn;
		const row = rows.get(col) ?? 0;
		rows.set(col, row + 1);
		nodes.push({
			...node,
			x: padding + col * (nodeWidth + gapX),
			y: padding + row * (nodeHeight + gapY)
		});
	};
	const size = { width: nodeWidth, height: nodeHeight };
	place({
		id: drawerId,
		label: drawerLabel,
		kind: 'drawer',
		start: false,
		topLevel: false,
		...size
	});
	for (const leaf of [...leaves].sort(
		(a, b) => (column.get(a.id) ?? 0) - (column.get(b.id) ?? 0)
	)) {
		place({
			id: leaf.id,
			label: leaf.label,
			description: leaf.destination.description,
			group: leaf.parent && leaf.parent !== root ? leaf.parent.label : undefined,
			kind: 'fragment',
			start: leaf === start,
			topLevel: topLevel.includes(leaf),
			...size
		});
	}

	const byId = new Map(nodes.map((node) => [node.id, node]));
	const width = Math.max(...nodes.map((node) => node.x + node.width)) + padding;
	const height = Math.max(...nodes.map((node) => node.y + node.height)) + padding;
	return {
		width,
		height: height + gapY * 2,
		nodes,
		edges: edges.flatMap((edge, index) => {
			const a = byId.get(edge.from);
			const b = byId.get(edge.to);
			if (!a || !b) return [];
			const key = `${edge.kind}-${index}`;
			if (b.x > a.x) {
				const x1 = a.x + a.width;
				const y1 = a.y + a.height / 2;
				const x2 = b.x;
				const y2 = b.y + b.height / 2;
				const bend = (x2 - x1) / 2;
				return [
					{
						...edge,
						key,
						path: `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`,
						labelX: (x1 + x2) / 2,
						labelY: (y1 + y2) / 2 - 6
					}
				];
			}
			// Same or earlier column: a loop under both boxes.
			const x1 = a.x + a.width / 2;
			const y1 = a.y + a.height;
			const x2 = b.x + b.width / 2;
			const y2 = b.y + b.height;
			const low = Math.max(y1, y2) + gapY * 1.5;
			return [
				{
					...edge,
					key,
					path: `M ${x1} ${y1} C ${x1} ${low}, ${x2} ${low}, ${x2} ${y2}`,
					labelX: (x1 + x2) / 2,
					labelY: low - 2
				}
			];
		})
	};
}
