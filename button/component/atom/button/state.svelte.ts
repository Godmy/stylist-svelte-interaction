import type { HTMLButtonAttributes } from 'svelte/elements';
import type { RecipeButtonElement as ButtonElementProps } from '$stylist/button/interface/recipe/button-element';
import { createButtonFactoryInput } from '$stylist/button/function/transform/button-factory-input';
import { createButtonState as createOriginalButtonState } from '$stylist/button/function/state/button/index.svelte';

export function createButtonState(getProps: () => ButtonElementProps & HTMLButtonAttributes) {
	const props = $derived(getProps());
	const factoryInput = $derived(createButtonFactoryInput(props));
	const state = $derived.by(() => createOriginalButtonState(factoryInput));

	return {
		get factoryInput() {
			return factoryInput;
		},
		get state() {
			return state;
		},
		get classes() {
			return state.classes;
		},
		get attrs() {
			return state.attrs;
		},
		get loading() {
			return state.loading;
		},
		get loaderClasses() {
			return state.loaderClasses;
		},
		get variant() {
			return state.variant;
		},
		get size() {
			return state.size;
		},
		get isDisabled() {
			return state.isDisabled;
		},
		get block() {
			return state.block;
		}
	};
}

export default createButtonState;
