import type { HTMLAttributes } from 'svelte/elements';
import type { RecipeShortcutsPanel } from '$stylist/control/interface/recipe/shortcuts-panel';
const Keyboard = 'keyboard';
const Command = 'command';
const Search = 'search';
const Zap = 'zap';
const Eye = 'eye';
const SidebarIcon = 'sidebar';
const Layout = 'layout';
const Grid = 'grid';
const Moon = 'moon';
const Code = 'code';
const Copy = 'copy';

const shortcuts: {
	keys: string[];
	description: string;
	category: string;
	icon?: string;
}[] = [
	{
		keys: ['Ctrl', '/'],
		description: 'Toggle Sidebar',
		category: 'Navigation',
		icon: SidebarIcon
	},
	{
		keys: ['Ctrl', 'B'],
		description: 'Toggle Bottom Panel',
		category: 'Navigation',
		icon: Layout
	},
	{
		keys: ['Ctrl', 'K'],
		description: 'Open Command Palette',
		category: 'Navigation',
		icon: Command
	},
	{
		keys: ['Ctrl', 'P'],
		description: 'Quick Search Components',
		category: 'Navigation',
		icon: Search
	},
	{ keys: ['Ctrl', 'G'], description: 'Toggle Grid', category: 'View', icon: Grid },
	{ keys: ['Ctrl', 'D'], description: 'Toggle Dark Mode', category: 'View', icon: Moon },
	{ keys: ['Ctrl', '+'], description: 'Zoom In', category: 'View', icon: Eye },
	{ keys: ['Ctrl', '-'], description: 'Zoom Out', category: 'View', icon: Eye },
	{ keys: ['Ctrl', '0'], description: 'Reset Zoom', category: 'View', icon: Eye },
	{ keys: ['Ctrl', 'C'], description: 'Copy Code', category: 'Actions', icon: Copy },
	{ keys: ['Ctrl', 'E'], description: 'Export Component', category: 'Actions', icon: Code },
	{
		keys: ['Ctrl', 'R'],
		description: 'Reset Workspace',
		category: 'Actions',
		icon: Zap
	},
	{ keys: ['Ctrl', 'S'], description: 'Save Variant', category: 'Actions', icon: Zap },
	{ keys: ['Alt', '1'], description: 'Mobile Viewport', category: 'Viewport', icon: Layout },
	{ keys: ['Alt', '2'], description: 'Tablet Viewport', category: 'Viewport', icon: Layout },
	{ keys: ['Alt', '3'], description: 'Desktop Viewport', category: 'Viewport', icon: Layout },
	{ keys: ['Alt', '4'], description: 'Fullscreen Viewport', category: 'Viewport', icon: Layout },
	{ keys: ['Ctrl', '1'], description: 'Go to Controls Tab', category: 'Tabs', icon: Layout },
	{ keys: ['Ctrl', '2'], description: 'Go to Code Tab', category: 'Tabs', icon: Layout },
	{ keys: ['Ctrl', '3'], description: 'Go to Actions Tab', category: 'Tabs', icon: Layout },
	{ keys: ['Ctrl', '4'], description: 'Go to Variants Tab', category: 'Tabs', icon: Layout },
	{ keys: ['?'], description: 'Show Shortcuts Panel', category: 'Misc', icon: Keyboard },
	{ keys: ['Esc'], description: 'Close Modals/Panels', category: 'Misc', icon: Keyboard }
];

export function createShortcutsPanelState(
	_getProps: () => RecipeShortcutsPanel & HTMLAttributes<HTMLDivElement>
) {
	const groupedShortcuts = $derived.by(() => {
		const groups = new Map<
			string,
			{
				keys: string[];
				description: string;
				category: string;
				icon?: string;
			}[]
		>();
		shortcuts.forEach((shortcut) => {
			if (!groups.has(shortcut.category)) {
				groups.set(shortcut.category, []);
			}
			groups.get(shortcut.category)!.push(shortcut);
		});
		return groups;
	});

	const categoryOrder = ['Navigation', 'View', 'Actions', 'Viewport', 'Tabs', 'Misc'];

	function getCategoryIcon(category: string) {
		switch (category) {
			case 'Navigation':
				return SidebarIcon;
			case 'View':
				return Eye;
			case 'Actions':
				return Zap;
			case 'Viewport':
				return Layout;
			case 'Tabs':
				return Layout;
			case 'Misc':
				return Keyboard;
			default:
				return Keyboard;
		}
	}

	function getCategoryColor(category: string) {
		switch (category) {
			case 'Navigation':
				return 'sp-cat--navigation';
			case 'View':
				return 'sp-cat--view';
			case 'Actions':
				return 'sp-cat--actions';
			case 'Viewport':
				return 'sp-cat--viewport';
			case 'Tabs':
				return 'sp-cat--tabs';
			case 'Misc':
			default:
				return 'sp-cat--misc';
		}
	}

	function getKeyColor(key: string) {
		if (key === 'Ctrl' || key === 'Alt' || key === 'Shift') {
			return 'sp-kbd--modifier';
		}
		return 'sp-kbd--default';
	}

	return {
		get shortcuts() {
			return shortcuts;
		},
		get groupedShortcuts() {
			return groupedShortcuts;
		},
		get categoryOrder() {
			return categoryOrder;
		},
		getCategoryIcon,
		getCategoryColor,
		getKeyColor
	};
}
