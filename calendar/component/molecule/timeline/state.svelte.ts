import type { RecipeTimeline } from '$stylist/calendar/interface/recipe/timeline';

export function createTimelineState(getProps: () => RecipeTimeline) {
	const props = $derived(getProps());
	const items = $derived(props.items ?? []);
	const orientation = $derived(props.orientation ?? 'vertical');
	const className = $derived(props.class ?? '');
	const itemClass = $derived(props.itemClass ?? '');
	const connectorClass = $derived(props.connectorClass ?? '');
	const iconClass = $derived(props.iconClass ?? '');

	const restProps = $derived.by(() => {
		const {
			items: _items,
			orientation: _orientation,
			class: _class,
			itemClass: _itemClass,
			connectorClass: _connectorClass,
			iconClass: _iconClass,
			...rest
		} = props;

		return rest;
	});

	return {
		get items() {
			return items;
		},
		get orientation() {
			return orientation;
		},
		get className() {
			return className;
		},
		get itemClass() {
			return itemClass;
		},
		get connectorClass() {
			return connectorClass;
		},
		get iconClass() {
			return iconClass;
		},
		get restProps() {
			return restProps;
		}
	};
}

export default createTimelineState;
