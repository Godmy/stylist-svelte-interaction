import FormSection from '$stylist/form/component/molecule/form-selection/index.svelte';
import type { RecipeFormSelection } from '$stylist/form/interface/recipe/form-selection';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import type { HtmlElementNode } from '$stylist/html/type/struct/html-element-node';

const field = (id: string, label: string, type: string): HtmlElementNode => ({
	kind: 'element',
	tag: 'label',
	attrs: { for: id, style: 'display: grid; gap: 0.25rem; margin-bottom: 1rem;' },
	children: [
		{ kind: 'text', value: label },
		{ kind: 'element', tag: 'input', attrs: { id, type, name: id } }
	]
});

/** Titled, optionally collapsible group of form fields. */
export default {
	component: FormSection,
	title: 'FormSection',
	description: 'Form section component with optional collapsible functionality',
	args: {
		title: 'Personal Information',
		description: 'Please provide your personal details.',
		collapsible: true,
		initiallyCollapsed: false
	},
	controls: {
		title: { type: 'text', description: 'Title of the form section' },
		description: { type: 'text', description: 'Description of the form section' },
		collapsible: { type: 'boolean', description: 'Whether the section is collapsible' }
	},
	presets: { Static: { collapsible: false } },
	content: [
		field('form-name', 'Name', 'text'),
		field('form-email', 'Email', 'email'),
		field('form-phone', 'Phone', 'tel')
	],
	layout: 'padded'
} satisfies ContractStory<RecipeFormSelection>;
