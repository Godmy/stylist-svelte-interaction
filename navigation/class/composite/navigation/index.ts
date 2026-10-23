import type { ContractNavigationAction } from '$stylist/navigation/interface/contract/navigation-action';
import type { ContractNavigationDestination } from '$stylist/navigation/interface/contract/navigation-destination';
import type { ContractNavigationEntry } from '$stylist/navigation/interface/contract/navigation-entry';
import type { ContractNavigationGraph } from '$stylist/navigation/interface/contract/navigation-graph';

/**
 * Composite of a navigation graph: a leaf is a fragment, a node with children is a
 * nested graph. The root owns the declared actions and resolves back stack
 * transitions as pure functions; reactive state lives in `createNavigationState`.
 */
export class NavigationComposite {
	static #sequence = 0;

	readonly destination: ContractNavigationDestination;
	readonly parent: NavigationComposite | null;
	readonly children: NavigationComposite[];
	readonly #actions: readonly ContractNavigationAction[];
	readonly #index = new Map<string, NavigationComposite>();

	constructor(
		destination: ContractNavigationDestination,
		parent: NavigationComposite | null = null,
		actions: readonly ContractNavigationAction[] = []
	) {
		this.destination = destination;
		this.parent = parent;
		this.#actions = actions;
		this.children = (destination.destinations ?? []).map(
			(child) => new NavigationComposite(child, this)
		);
		if (!parent) {
			for (const node of this.walk()) {
				if (this.#index.has(node.id)) {
					throw new Error(`Duplicate navigation destination id "${node.id}"`);
				}
				this.#index.set(node.id, node);
			}
		}
	}

	static fromGraph(graph: ContractNavigationGraph): NavigationComposite {
		return new NavigationComposite(graph, null, graph.actions ?? []);
	}

	get id(): string {
		return this.destination.id;
	}

	get label(): string {
		return this.destination.label;
	}

	get isGraph(): boolean {
		return this.children.length > 0;
	}

	get root(): NavigationComposite {
		return this.parent ? this.parent.root : this;
	}

	get depth(): number {
		return this.parent ? this.parent.depth + 1 : 0;
	}

	get actions(): readonly ContractNavigationAction[] {
		return this.root.#actions;
	}

	/** Self and every descendant, depth-first. */
	*walk(): Generator<NavigationComposite> {
		yield this;
		for (const child of this.children) yield* child.walk();
	}

	find(id: string): NavigationComposite | undefined {
		return this.root.#index.get(id);
	}

	/** The id is this node or lies inside it. */
	contains(id: string): boolean {
		for (let node = this.find(id); node; node = node.parent ?? undefined) {
			if (node === this) return true;
		}
		return false;
	}

	/** Fragments (leaves) of this subtree. */
	leaves(): NavigationComposite[] {
		return [...this.walk()].filter((node) => !node.isGraph);
	}

	/** Entry fragment: the node itself or the start child of each nested graph. */
	startLeaf(): NavigationComposite {
		if (!this.isGraph) return this;
		const start = this.children.find((child) => child.id === this.destination.start);
		return (start ?? this.children[0]).startLeaf();
	}

	/** Fragment a destination id opens; undefined for unknown ids. */
	resolve(id: string): NavigationComposite | undefined {
		return this.find(id)?.startLeaf();
	}

	/** Drawer destinations: flagged nodes, or the root children when none is flagged. */
	topLevel(): NavigationComposite[] {
		const root = this.root;
		const flagged = [...root.walk()].filter((node) => node.destination.topLevel);
		return flagged.length ? flagged : root.children;
	}

	isTopLevel(id: string): boolean {
		const leaf = this.resolve(id);
		return !!leaf && this.topLevel().some((node) => node.startLeaf() === leaf);
	}

	/** Actions declared from the destination or one of its parent graphs. */
	actionsFrom(id: string): ContractNavigationAction[] {
		return this.actions.filter((action) => this.find(action.from)?.contains(id));
	}

	/** Declared actions with their resolved ends; unknown ids are skipped. */
	transitions(): {
		action: ContractNavigationAction;
		from: NavigationComposite;
		to: NavigationComposite;
	}[] {
		return this.actions.flatMap((action) => {
			const from = this.find(action.from);
			const to = this.find(action.to);
			return from && to ? [{ action, from, to }] : [];
		});
	}

	entry(id: string, args?: Record<string, unknown>): ContractNavigationEntry {
		NavigationComposite.#sequence += 1;
		return { id, key: `${id}:${NavigationComposite.#sequence}`, args };
	}

	/** Initial back stack: the start fragment, plus a deep-linked fragment above it. */
	initial(id?: string, args?: Record<string, unknown>): ContractNavigationEntry[] {
		const start = this.root.startLeaf();
		const target = id ? this.resolve(id) : undefined;
		if (!target || target === start) return [this.entry(start.id, args)];
		return [this.entry(start.id), this.entry(target.id, args)];
	}

	/** Back stack after an action id or a destination id; null when it is not reachable. */
	navigate(
		stack: readonly ContractNavigationEntry[],
		target: string,
		args?: Record<string, unknown>
	): ContractNavigationEntry[] | null {
		const current = stack.at(-1);
		if (!current) return null;
		const action = this.actionsFrom(current.id).find((item) => item.id === target);
		const to = this.resolve(action ? action.to : target);
		if (!to || to.destination.disabled) return null;

		let next = [...stack];
		const popUpTo = action?.popUpTo ? this.find(action.popUpTo) : undefined;
		if (popUpTo) {
			// A nested graph is popped from its lowest entry, a fragment from its topmost one.
			const index = popUpTo.isGraph
				? next.findIndex((entry) => popUpTo.contains(entry.id))
				: next.findLastIndex((entry) => entry.id === popUpTo.id);
			if (index >= 0) next = next.slice(0, action?.popUpToInclusive ? index : index + 1);
		}
		const top = next.at(-1);
		if (top?.id === to.id && (action?.singleTop || (!action && !args))) {
			next[next.length - 1] = args ? { ...top, args } : top;
			return next;
		}
		next.push(this.entry(to.id, args));
		return next;
	}

	/** Drawer selection: the start fragment, then the chosen top-level fragment. */
	select(stack: readonly ContractNavigationEntry[], id: string): ContractNavigationEntry[] | null {
		const to = this.resolve(id);
		if (!to || to.destination.disabled) return null;
		const start = this.root.startLeaf();
		const base = stack[0]?.id === start.id ? stack[0] : this.entry(start.id);
		if (to === start) return [base];
		const top = stack.at(-1);
		return [base, top?.id === to.id ? top : this.entry(to.id)];
	}

	/**
	 * Back stack for a destination opened from outside (a router URL, a reload, the
	 * browser Back button); null when unknown or already on top with the same args.
	 * An entry already in the stack is popped to, a top-level destination is selected,
	 * an action target of the top is pushed; any other deep link gets a synthetic stack:
	 * the start, the top-level source of an action leading to it, then the destination.
	 */
	sync(
		stack: readonly ContractNavigationEntry[],
		id: string,
		args?: Record<string, unknown>
	): ContractNavigationEntry[] | null {
		const to = this.resolve(id);
		if (!to) return null;
		const sameArgs = (entry: ContractNavigationEntry) => {
			const a = entry.args ?? {};
			const b = args ?? {};
			const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
			return [...keys].every((key) => String(a[key] ?? '') === String(b[key] ?? ''));
		};
		const index = stack.findLastIndex((entry) => entry.id === to.id && sameArgs(entry));
		if (index === stack.length - 1) return null;
		if (index >= 0) return stack.slice(0, index + 1);

		const top = stack.at(-1);
		if (top?.id === to.id) return [...stack.slice(0, -1), { ...top, args }];
		if (this.isTopLevel(to.id)) {
			const next = this.select(stack, to.id);
			return next && args ? [...next.slice(0, -1), this.entry(to.id, args)] : next;
		}
		if (top && this.actionsFrom(top.id).some((action) => this.resolve(action.to) === to)) {
			return [...stack, this.entry(to.id, args)];
		}

		const start = this.root.startLeaf();
		const base = stack[0]?.id === start.id ? stack[0] : this.entry(start.id);
		const source = this.transitions().find(
			(item) => this.resolve(item.to.id) === to && this.isTopLevel(item.from.id)
		)?.from;
		const sourceLeaf = source?.startLeaf();
		const middle =
			sourceLeaf && sourceLeaf !== start && sourceLeaf !== to
				? [stack.find((entry) => entry.id === sourceLeaf.id) ?? this.entry(sourceLeaf.id)]
				: [];
		return to === start ? [this.entry(to.id, args)] : [base, ...middle, this.entry(to.id, args)];
	}

	back(stack: readonly ContractNavigationEntry[]): ContractNavigationEntry[] | null {
		return stack.length > 1 ? stack.slice(0, -1) : null;
	}
}
