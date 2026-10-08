import { ManagerMotionPreference } from '$stylist/animation/class/manager/motion-preference';

export function createMotionPreferenceState() {
	let prefersReducedMotion = $state(ManagerMotionPreference.getSnapshot());

	$effect(() => {
		prefersReducedMotion = ManagerMotionPreference.getSnapshot();
		return ManagerMotionPreference.subscribe(() => {
			prefersReducedMotion = ManagerMotionPreference.getSnapshot();
		});
	});

	return {
		get prefersReducedMotion() {
			return prefersReducedMotion;
		}
	};
}

export default createMotionPreferenceState;
