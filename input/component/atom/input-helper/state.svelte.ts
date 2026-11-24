import '$stylist/input/const/style/field/index.css';
import type { RecipeInputHelper as IInputHelperProps } from '$stylist/input/interface/recipe/input-helper';
import { createFieldClassState } from '$stylist/input/function/script/create-field-class-state';
/** Reactive behavior of input-helper; props are read lazily when needed. */
export function createInputHelperComponentState(getProps: () => IInputHelperProps) {
	const props = $derived(getProps());
	const state = $derived(
		createFieldClassState(
			{
				variant: props.variant,
				size: 'md',
				class: props.class
			},
			'input-field-helper-text'
		)
	);
	const restProps = $derived.by(() => {
		const { class: _class, children: _children, text: _text, variant: _variant, ...rest } = props;
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
export default createInputHelperComponentState;
