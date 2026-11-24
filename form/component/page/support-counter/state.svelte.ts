import { cooldownCounter } from '$stylist/form/function/resolve/cooldown-counter';

/** Reactive behavior of support-counter; props are read lazily when needed. */
export function createSupportCounterComponentState() {
	let count = $state(42);
	let amount = $state(1);
	let now = $state(0);
	let availableAt = $state(0);
	let notice = $state('');
	const remaining = $derived(Math.max(0, Math.ceil((availableAt - now) / 1000)));
	$effect(() => {
		now = Date.now();
		const timer = setInterval(() => (now = Date.now()), 200);
		return () => clearInterval(timer);
	});
	function add(event: SubmitEvent) {
		event.preventDefault();
		const result = cooldownCounter(count, amount, Date.now(), availableAt);
		count = result.count;
		availableAt = result.availableAt;
		now = Date.now();
		notice = result.accepted
			? 'Демо-действие учтено.'
			: 'Проверьте количество или дождитесь завершения паузы.';
	}
	return {
		get count(): typeof count {
			return count;
		},
		set count(__nextValue: typeof count) {
			count = __nextValue;
		},
		get amount(): typeof amount {
			return amount;
		},
		set amount(__nextValue: typeof amount) {
			amount = __nextValue;
		},
		get notice(): typeof notice {
			return notice;
		},
		set notice(__nextValue: typeof notice) {
			notice = __nextValue;
		},
		get remaining(): typeof remaining {
			return remaining;
		},
		get add(): typeof add {
			return add;
		}
	};
}
export default createSupportCounterComponentState;
