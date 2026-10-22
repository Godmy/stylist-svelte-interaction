import TurtleLogoMark from '$stylist/animation/component/atom/turtle-logo-mark/index.svelte';
import type { RecipeTurtleLogoMark } from '$stylist/animation/interface/recipe/turtle-logo-mark';
import type { ContractStory } from '$stylist/html/interface/contract/story';

const opacity = { type: 'range', min: 0, max: 1, step: 0.05 } as const;

/** The brand mark: a swimming turtle with a spiral shell split into named parts. */
export default {
	component: TurtleLogoMark,
	title: 'TurtleLogoMark',
	description:
		'The ЛанкаТур brand mark: a swimming turtle with a spiral shell, split into named parts (shell/spiral/head/flippers) with individual opacity so turtle-photo-to-mark can stagger their reveal. Used as the morph target for the turtle-hero-morph organism.',
	args: {
		tone: '#0e7c7b',
		accent: '#2ec4b6',
		shellOpacity: 1,
		spiralOpacity: 1,
		headOpacity: 1,
		frontLeftFlipperOpacity: 1,
		frontRightFlipperOpacity: 1,
		rearFlippersOpacity: 1
	},
	controls: {
		tone: { type: 'color' },
		accent: { type: 'color' },
		shellOpacity: opacity,
		spiralOpacity: opacity,
		headOpacity: opacity,
		frontLeftFlipperOpacity: opacity,
		frontRightFlipperOpacity: opacity,
		rearFlippersOpacity: opacity
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'display: grid; align-content: center; min-height: 12rem; max-width: 22rem; margin: 0 auto; padding: 2rem; overflow: hidden; border: 1px solid var(--color-border-primary); border-radius: 0.5rem; background: linear-gradient(180deg, #f7f3ec, #cdeef0);'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeTurtleLogoMark>;
