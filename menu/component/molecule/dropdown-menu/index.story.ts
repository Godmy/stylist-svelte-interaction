import DropdownMenu from '$stylist/menu/component/molecule/dropdown-menu/index.svelte';
import type { RecipeDropdownMenu } from '$stylist/menu/interface/recipe/dropdown-menu';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_ALIGNMENT } from '$stylist/layout/const/array/alignment';

/** A dropdown menu component for displaying action lists. */
export default {
	component: DropdownMenu,
	title: 'DropdownMenu',
	description: 'A dropdown menu component for displaying action lists',
	args: { label: 'Options', position: 'left', disabled: false },
	controls: {
		label: { type: 'text', description: 'Trigger label' },
		// The menu panel only aligns horizontally: left, right or center.
		position: {
			type: 'select',
			options: TOKEN_ALIGNMENT.filter(
				(alignment) => alignment === 'left' || alignment === 'right' || alignment === 'center'
			),
			description: 'Position of the dropdown menu'
		},
		disabled: { type: 'boolean', description: 'Whether the dropdown is disabled' }
	}
} satisfies ContractStory<RecipeDropdownMenu>;
