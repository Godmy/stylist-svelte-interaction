/** Atomic Design tiers rendered by the atomic-principles-showcase organism. */
export const ATOMIC_PRINCIPLES_TIER = [
	{
		key: 'atoms',
		name: 'Atoms',
		icon: 'atom',
		accent: 'info',
		description: 'Basic building blocks - buttons, inputs, labels, icons',
		delay: '0s'
	},
	{
		key: 'molecules',
		name: 'Molecules',
		icon: 'molecule',
		accent: 'primary',
		description: 'Combined atoms - search bars, cards, form fields',
		delay: '0.1s'
	},
	{
		key: 'organisms',
		name: 'Organisms',
		icon: 'organism',
		accent: 'success',
		description: 'Complex components - headers, forms, modals',
		delay: '0.2s'
	}
] as const;
