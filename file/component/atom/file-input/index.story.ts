import FileInput from '$stylist/file/component/atom/file-input/index.svelte';
import type { RecipeFileInput } from '$stylist/file/interface/recipe/file-input';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** File picker with single or multiple upload mode. */
export default {
	component: FileInput,
	title: 'FileInput',
	description: 'File picker with single or multiple upload mode.',
	args: { placeholder: 'Attach files', accept: '.png,.jpg,.pdf', multiple: false, disabled: false },
	controls: {
		placeholder: { type: 'text' },
		accept: { type: 'text' },
		multiple: { type: 'boolean' },
		disabled: { type: 'boolean' }
	},
	presets: { Multiple: { multiple: true, placeholder: 'Attach several files' } }
} satisfies ContractStory<RecipeFileInput>;
