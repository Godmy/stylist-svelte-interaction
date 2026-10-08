import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { HTMLAttributes } from 'svelte/elements';
export function createScreenReaderState(
	getProps: () => HTMLAttributes<HTMLDivElement> & {
		title?: string;
		content?: string;
		class?: string;
	}
): {
	rootClass: string;
	titleClass: string;
	contentClass: string;
	actionButtonClass: string;
} {
	const props = $derived(getProps());
	const rootClass = $derived(ClassNamesManager.merge('c-screen-reader', props.class ?? ''));
	const titleClass = $derived('c-screen-reader__title');
	const contentClass = $derived('c-screen-reader__content');
	const actionButtonClass = $derived('c-screen-reader__action');

	return {
		get rootClass() {
			return rootClass;
		},
		get titleClass() {
			return titleClass;
		},
		get contentClass() {
			return contentClass;
		},
		get actionButtonClass() {
			return actionButtonClass;
		}
	};
}

export default createScreenReaderState;
