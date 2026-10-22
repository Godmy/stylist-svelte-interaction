import { untrack } from 'svelte';
import { NavigationComposite } from '$stylist/navigation/class/composite/navigation';
import type { ContractNavigationEntry } from '$stylist/navigation/interface/contract/navigation-entry';
import type { ContractNavigationGraph } from '$stylist/navigation/interface/contract/navigation-graph';
import type { ContractNavigator } from '$stylist/navigation/interface/contract/navigator';

/** Reactive back stack over a navigation graph; the graph rules live in `NavigationComposite`. */
export function createNavigationState(
	getOptions: () => {
		graph: ContractNavigationGraph;
		/** Deep-linked destination id; the back stack starts as [start, initial]. */
		initial?: string;
		onNavigate?: (entry: ContractNavigationEntry) => void;
	}
): ContractNavigator & { readonly composite: NavigationComposite } {
	const options = $derived(getOptions());
	const composite = $derived(NavigationComposite.fromGraph(options.graph));
	let stack = $state.raw<ContractNavigationEntry[]>(
		untrack(() => composite.initial(options.initial))
	);
	let direction = $state<ContractNavigator['direction']>('replace');

	// A replaced graph may drop destinations of the current stack: restart from its start.
	const validStack = $derived(
		stack.every((item) => composite.find(item.id)) ? stack : composite.initial()
	);
	const entry = $derived(validStack[validStack.length - 1]);
	const destination = $derived(composite.find(entry.id)?.destination ?? options.graph);
	const actions = $derived(composite.actionsFrom(entry.id));
	const isTopLevel = $derived(composite.isTopLevel(entry.id));

	function commit(next: ContractNavigationEntry[] | null, nextDirection: typeof direction) {
		const unchanged =
			next?.length === validStack.length && next.every((item, i) => item === validStack[i]);
		if (!next || unchanged) return false;
		direction = nextDirection;
		stack = next;
		options.onNavigate?.(next[next.length - 1]);
		return true;
	}

	return {
		get composite() {
			return composite;
		},
		get entry() {
			return entry;
		},
		get destination() {
			return destination;
		},
		get stack() {
			return validStack;
		},
		get canGoBack() {
			return validStack.length > 1;
		},
		get isTopLevel() {
			return isTopLevel;
		},
		get direction() {
			return direction;
		},
		get actions() {
			return actions;
		},
		navigate(target, args) {
			const next = composite.navigate(validStack, target, args);
			return commit(next, next && next.length < validStack.length ? 'back' : 'forward');
		},
		back() {
			return commit(composite.back(validStack), 'back');
		},
		select(id) {
			commit(composite.select(validStack, id), 'replace');
		},
		isActive(id) {
			return composite.find(id)?.contains(entry.id) ?? false;
		}
	};
}
