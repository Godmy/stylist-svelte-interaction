import ToggleGroupItem from '$stylist/control/component/atom/toggle-group-item/index.svelte';
import type { RecipeToggleGroupItem } from '$stylist/control/interface/recipe/toggle-group-item';
import type { TokenSelectionType } from '$stylist/control/type/alias/selection-type';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SELECTION_TYPE } from '$stylist/control/const/array/selection-type';

/** Selectable item managed by ToggleGroupRoot context. */
export default {
	component: ToggleGroupItem,
	title: 'ToggleGroupItem',
	description: 'Selectable item managed by ToggleGroupRoot context.',
	args: { value: 'bold', disabled: false, groupType: 'single' },
	controls: {
		disabled: { type: 'boolean' },
		// `groupType` is a story knob: the selection type of the surrounding ToggleGroupRoot.
		groupType: { type: 'select', options: TOKEN_SELECTION_TYPE }
	}
} satisfies ContractStory<RecipeToggleGroupItem & { groupType?: TokenSelectionType }>;
