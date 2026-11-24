import type { RecipeInputAddon as IInputAddonProps } from '$stylist/input/interface/recipe/input-addon';
import { createFieldClassState } from '$stylist/input/function/script/create-field-class-state';
/** Reactive behavior of input-addon; props are read lazily when needed. */
export function createInputAddonComponentState(getProps: () => IInputAddonProps) {
	const props = $derived(getProps());
	const rest = $derived.by(() => {
		const {
			class: _class,
			variant: _variant,
			position: _position,
			children: _children,
			...native
		} = props;
		return native;
	});
	const state = $derived(
		createFieldClassState(
			{
				variant: props.variant,
				size: 'md',
				class: props.class
			},
			'input-addon'
		)
	);
	const classes = $derived(
		[
			state.classes,
			(props.position ?? 'left') === 'left' ? 'input-addon--left' : 'input-addon--right'
		]
			.filter(Boolean)
			.join(' ')
	);
	return {
		get rest(): typeof rest {
			return rest;
		},
		get classes(): typeof classes {
			return classes;
		}
	};
}
export default createInputAddonComponentState;
