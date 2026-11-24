import '$stylist/input/const/style/field/index.css';
import type { RecipeInputError } from '$stylist/input/interface/recipe/input-error';
import { createFieldClassState } from '$stylist/input/function/script/create-field-class-state';
/** Reactive behavior of input-error; props are read lazily when needed. */
export function createInputErrorComponentState(getProps: () => RecipeInputError) {
	const props = $derived(getProps());
	const state = $derived(
		createFieldClassState(
			{
				variant: 'error',
				size: 'md',
				class: props.class
			},
			'input-field-error-text'
		)
	);
	const restProps = $derived.by(() => {
		const {
			class: _class,
			children: _children,
			variant: _variant,
			text: _text,
			visible: _visible,
			...rest
		} = props;
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
export default createInputErrorComponentState;
