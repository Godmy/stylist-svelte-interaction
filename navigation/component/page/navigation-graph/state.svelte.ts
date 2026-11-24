import { NavigationComposite } from '$stylist/navigation/class/composite/navigation';
import { resolveNavigationGraphLayout } from '$stylist/navigation/function/resolve/navigation-graph-layout';
import type { RecipeNavigationGraph } from '$stylist/navigation/interface/recipe/navigation-graph';
/** Reactive behavior of navigation-graph; props are read lazily when needed. */
export function createNavigationGraphComponentState(
	getProps: () => Pick<RecipeNavigationGraph, 'graph' | 'activeId' | 'drawerLabel'> & {
		drawerLabel: Exclude<RecipeNavigationGraph['drawerLabel'], undefined>;
	}
) {
	const props = $derived(getProps());
	const composite = $derived(NavigationComposite.fromGraph(props['graph']));
	const layout = $derived(
		resolveNavigationGraphLayout(composite, { drawerLabel: props['drawerLabel'] })
	);
	const labels = $derived(new Map(layout.nodes.map((node) => [node.id, node.label])));
	const activeLeaf = $derived(
		props['activeId'] ? composite.resolve(props['activeId'])?.id : undefined
	);
	return {
		get composite(): typeof composite {
			return composite;
		},
		get layout(): typeof layout {
			return layout;
		},
		get labels(): typeof labels {
			return labels;
		},
		get activeLeaf(): typeof activeLeaf {
			return activeLeaf;
		}
	};
}
export default createNavigationGraphComponentState;
