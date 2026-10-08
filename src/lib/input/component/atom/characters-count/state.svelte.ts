import createCharacterCountScriptState from '$stylist/input/function/state/character-count/index.svelte';
import type { RecipeCharactersCount as ICharacterCountProps } from '$stylist/input/interface/recipe/characters-count';

export const createCharactersCountState = (getProps: () => ICharacterCountProps) => {
	const props = $derived(getProps());
	const percentage = $derived(
		props.max && props.max > 0 ? Math.min(100, ((props.current ?? 0) / props.max) * 100) : 0
	);
	const ratio = $derived(props.max ? (props.current ?? 0) / props.max : 0);
	const message = $derived(
		props.showPercentage
			? `${Math.round(percentage)}% (${props.current ?? 0}/${props.max ?? 0})`
			: `${props.current ?? 0}/${props.max ?? 0}`
	);
	const state = $derived(
		createCharacterCountScriptState(ratio, {
			variant: 'default',
			size: 'md',
			class: props.class
		})
	);

	return {
		get message() {
			return message;
		},
		get classes() {
			return [
				'characters-count',
				state.colorClass,
				typeof props.class === 'string' ? props.class : ''
			]
				.filter(Boolean)
				.join(' ');
		}
	};
};

export default createCharactersCountState;
