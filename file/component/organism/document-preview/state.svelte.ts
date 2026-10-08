export function createDocumentPreviewState(props: { class?: string }) {
	return {
		variant: 'default',
		size: 'md',
		disabled: false,
		classes: [props.class || ''].filter(Boolean).join(' ')
	};
}

export default createDocumentPreviewState;
