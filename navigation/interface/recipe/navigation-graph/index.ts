import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { ContractNavigationGraph } from '$stylist/navigation/interface/contract/navigation-graph';

/** Overview of a site navigation graph: fragments, transitions and their table. */
export interface RecipeNavigationGraph extends Omit<RecipeHtmlSection, 'children' | 'onselect'> {
	graph: ContractNavigationGraph;
	heading?: string;
	/** Highlighted fragment, e.g. the current one of an activity. */
	activeId?: string;
	/** Makes fragment boxes clickable. */
	onSelect?: (id: string) => void;
	/** Caption of the drawer pseudo node. */
	drawerLabel?: string;
	/** Shows the transitions table under the diagram; true by default. */
	table?: boolean;
}
