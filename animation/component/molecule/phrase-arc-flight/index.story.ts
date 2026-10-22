import PhraseArcFlight from '$stylist/animation/component/molecule/phrase-arc-flight/index.svelte';
import type { RecipePhraseArcFlight } from '$stylist/animation/interface/recipe/phrase-arc-flight';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Letters travelling as one line along an editable arc. */
export default {
	component: PhraseArcFlight,
	title: 'PhraseArcFlight',
	description:
		'Letters enter from the upper right, travel as one line along an editable arc, bounce lightly, and leave beyond the left edge.',
	args: {
		phrase: 'LANKA TOUR',
		pathText:
			'820,48 740,40 660,64 580,108 500,146 420,136 340,154 260,194 180,212 90,192 0,180 -150,190',
		progress: 0.5,
		amplitude: 7,
		stagger: 0.035,
		highlight: true,
		highlightIntensity: 1,
		showPath: false,
		still: true
	},
	controls: {
		phrase: { type: 'text' },
		pathText: { type: 'text', label: 'polyline' },
		progress: { type: 'range', min: 0, max: 1, step: 0.01 },
		amplitude: { type: 'range', min: 0, max: 24, step: 1 },
		stagger: { type: 'range', min: 0.015, max: 0.08, step: 0.005 },
		highlight: { type: 'boolean' },
		highlightIntensity: { type: 'range', label: 'glow', min: 0, max: 1, step: 0.05 },
		showPath: { type: 'boolean' },
		still: { type: 'boolean' }
	},
	presets: {
		'With path': { showPath: true }
	}
} satisfies ContractStory<RecipePhraseArcFlight>;
