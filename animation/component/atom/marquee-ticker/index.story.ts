import MarqueeTicker from '$stylist/animation/component/atom/marquee-ticker/index.svelte';
import type { RecipeMarqueeTicker } from '$stylist/animation/interface/recipe/marquee-ticker';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Story-only knob: the render passes it as `items={[text]}`, so editing it replays the text change. */
type Knobs = { text?: string };

// Letter effects of the recipe union; no token lists them.
const effects = ['none', 'fade', 'soft'];

/** Infinite horizontal scrolling text strip. */
export default {
	component: MarqueeTicker,
	title: 'MarqueeTicker',
	description:
		'Infinite horizontal scrolling text strip. On text change, letters disappear into the strip background and the new line appears from it.',
	args: {
		text: 'LANKA TOUR',
		separator: '•',
		speedSeconds: 18,
		startPosition: 0,
		height: '48px',
		fontSize: '18px',
		backgroundColor: '#0e1714',
		textColor: '#ffffff',
		letterTransitionColor: '#0e1714',
		letterTransitionMs: 760,
		appearEffect: 'fade',
		disappearEffect: 'fade',
		upsideDown: true,
		still: false
	},
	controls: {
		text: { type: 'text' },
		separator: { type: 'text' },
		speedSeconds: { type: 'range', min: 6, max: 48, step: 1 },
		startPosition: {
			type: 'range',
			label: 'start position',
			description: '0 starts at the right edge; 100 starts one full loop ahead.',
			min: 0,
			max: 100,
			step: 1
		},
		height: { type: 'text' },
		fontSize: { type: 'text' },
		backgroundColor: { type: 'color' },
		textColor: { type: 'color' },
		letterTransitionColor: { type: 'color' },
		letterTransitionMs: { type: 'range', min: 120, max: 1600, step: 20 },
		appearEffect: { type: 'select', options: effects },
		disappearEffect: { type: 'select', options: effects },
		upsideDown: { type: 'boolean' },
		still: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeMarqueeTicker & Knobs>;
