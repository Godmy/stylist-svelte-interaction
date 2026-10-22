import SchemaFormDialog from '$stylist/form/component/organism/schema-form-dialog/index.svelte';
import type { RecipeSchemaFormDialog } from '$stylist/form/interface/recipe/schema-form-dialog';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Dialog form built from schema fields; index.story.svelte keeps the open state and the saved data. */
export default {
	component: SchemaFormDialog,
	title: 'SchemaFormDialog',
	description: 'Dialog form generated from schema field metadata.',
	args: {
		title: 'Create profile',
		subtitle: 'Fill in the schema-backed fields.',
		mode: 'create',
		fields: [
			{ name: 'id', type: 'integer', nullable: false, primaryKey: true, default: null },
			{ name: 'name', type: 'text', nullable: false, primaryKey: false, default: null },
			{ name: 'email', type: 'text', nullable: false, primaryKey: false, default: null },
			{ name: 'active', type: 'boolean', nullable: false, primaryKey: false, default: 'true' },
			{ name: 'notes', type: 'text', nullable: true, primaryKey: false, default: null }
		],
		initialData: {
			id: 42,
			name: 'Dmitrii',
			email: 'dmitrii@example.com',
			active: true,
			notes: 'Existing record'
		}
	},
	controls: {
		title: { type: 'text' },
		subtitle: { type: 'text' },
		mode: { type: 'select', options: ['create', 'edit'] }
	},
	presets: { Edit: { mode: 'edit', title: 'Edit profile' } },
	layout: 'padded'
} satisfies ContractStory<RecipeSchemaFormDialog>;
