import AccessibilityToolbar from './index.svelte';
import type { RecipeAccessibilityToolbar } from '$stylist/control/interface/recipe/accessibility-toolbar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Accessibility toolbar component for improving web accessibility. */
export default {
	component: AccessibilityToolbar,
	title: 'AccessibilityToolbar',
	description: 'Accessibility toolbar component for improving web accessibility.',
	args: {
		showFontSizeControls: true,
		showScreenReaderTester: true,
		showFocusIndicator: true,
		showTokenAnimationToggle: true
	},
	controls: {
		showFontSizeControls: { type: 'boolean' },
		showScreenReaderTester: { type: 'boolean' },
		showFocusIndicator: { type: 'boolean' },
		showTokenAnimationToggle: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeAccessibilityToolbar>;
