import type { Zoom } from '$stylist/control/type/struct/zoom/zoom';

export class ZoomManager {
	static getStep<TValue>(
		scale: Zoom<TValue>,
		stepId: number
	):
		| {
				id: number;
				value: TValue;
				label: string;
				preview?: string;
		  }
		| undefined {
		return scale.steps.find((step) => step.id === stepId);
	}

	static getValue<TValue>(scale: Zoom<TValue>, stepId: number, fallback: TValue): TValue {
		return ZoomManager.getStep(scale, stepId)?.value ?? fallback;
	}
}
