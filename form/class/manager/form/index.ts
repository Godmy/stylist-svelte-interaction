import type { SlotFormSelectionState } from '$stylist/form/interface/slot/form-selection-state';

export class FormManager {
	static toggleCollapsed(state: SlotFormSelectionState, collapsible: boolean): void {
		if (collapsible) {
			state.isCollapsed = !state.isCollapsed;
		}
	}
}
