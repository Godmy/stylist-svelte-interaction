import type { RecipeDocumentPreview } from '$stylist/file/interface/recipe/document-preview';
/** Reactive behavior of document-preview; props are read lazily when needed. */
export function createDocumentPreviewState(getProps: () => RecipeDocumentPreview) {
	function createDocumentPreviewState(props: RecipeDocumentPreview) {
		return {
			variant: 'default',
			size: 'md',
			disabled: false,
			classes: [props.class || ''].filter(Boolean).join(' ')
		};
	}
	const props = $derived(getProps());
	const state = $derived(createDocumentPreviewState(props));
	const restProps = $derived.by(() => {
		const { title: _title, content: _content, format: _format, class: _class, ...rest } = props;
		return rest;
	});
	return {
		get viewState(): typeof state {
			return state;
		},
		get restProps(): typeof restProps {
			return restProps;
		}
	};
}
export default createDocumentPreviewState;
