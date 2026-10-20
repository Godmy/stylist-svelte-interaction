import AtomicTierCard from './index.svelte';
import type { RecipeAtomicTierCard } from '$stylist/animation/interface/recipe/atomic-tier-card';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';

/** One Atomic Design tier: floating icon, name, description and a highlighted count. */
export default {
	component: AtomicTierCard,
	title: 'AtomicTierCard',
	description:
		'One Atomic Design tier: floating icon, name, description and a highlighted count. Composed from FloatingIcon + typography atoms.',
	args: {
		name: 'Atoms',
		icon: 'atom',
		accent: 'info',
		description: 'Basic building blocks - buttons, inputs, labels, icons',
		count: 180,
		countLabel: 'components'
	},
	controls: {
		name: { type: 'text' },
		icon: { type: 'text' },
		accent: { type: 'select', options: TOKEN_COLOR_TONE },
		description: { type: 'text' },
		count: { type: 'number', min: 0, max: 2000, step: 1 },
		countLabel: { type: 'text' }
	},
	presets: {
		Molecules: { name: 'Molecules', icon: 'molecule', accent: 'primary', count: 90 },
		Organisms: { name: 'Organisms', icon: 'organism', accent: 'success', count: 50 }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'max-width: 22rem;' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeAtomicTierCard>;
