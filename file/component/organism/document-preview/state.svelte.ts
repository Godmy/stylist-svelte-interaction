import type { RecipeDocumentPreview } from '$stylist/file/interface/recipe/document-preview';

export function createDocumentPreviewState(props: RecipeDocumentPreview) {
	return {
		variant: 'default',
		size: 'md',
		disabled: false,
		classes: [props.class || ''].filter(Boolean).join(' ')
	};
}

export default createDocumentPreviewState;
