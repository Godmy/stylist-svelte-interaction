import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeScreenReader } from '$stylist/form/interface/recipe/screen-reader';
export function createScreenReaderState(getProps: () => RecipeScreenReader): {
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
