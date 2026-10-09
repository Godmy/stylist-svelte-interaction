import { PresetMegaMenu } from '$stylist/menu/const/preset/mega-menu';
import type { RecipeMegaMenu } from '$stylist/menu/interface/recipe/mega-menu';

export function createMegaMenuState(getProps: () => RecipeMegaMenu) {
	const props = $derived(getProps());
	let openId = $state<string | null>(getProps().defaultOpenId ?? null);
	let root = $state<HTMLElement | null>(null);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const openOnHover = $derived(props.openOnHover ?? true);
	const classes = $derived(['c-mega-menu', props.class].filter(Boolean).join(' '));

	function hasPanel(sectionId: string) {
		const section = props.sections.find((item) => item.id === sectionId);
		return Boolean(section?.columns?.length || section?.feature);
	}

	function clearTimer() {
		if (timer) {
			clearTimeout(timer);
			timer = undefined;
		}
	}

	function setOpen(next: string | null) {
		clearTimer();
		if (openId === next) return;
		openId = next;
		props.onOpenChange?.(next);
	}

	function toggle(sectionId: string) {
		setOpen(openId === sectionId ? null : sectionId);
	}

	function close() {
		setOpen(null);
	}

	function isOpen(sectionId: string) {
		return openId === sectionId;
	}

	function handlePointerEnter(event: PointerEvent, sectionId: string) {
		if (!openOnHover || event.pointerType !== 'mouse' || !hasPanel(sectionId)) return;
		clearTimer();
		// An already open menu switches sections after `switchDelayMs` (instant
		// by default), so a pointer only passing over a neighbour trigger on
		// its way to the open panel doesn't switch it; a closed one waits for
		// hover intent.
		if (openId) {
			const switchDelay = openId === sectionId ? 0 : (props.switchDelayMs ?? 0);
			if (switchDelay > 0) {
				timer = setTimeout(() => setOpen(sectionId), switchDelay);
			} else {
				setOpen(sectionId);
			}
			return;
		}
		timer = setTimeout(() => setOpen(sectionId), PresetMegaMenu.OpenDelayMs);
	}

	function handlePointerLeave(event: PointerEvent) {
		if (!openOnHover || event.pointerType !== 'mouse') return;
		clearTimer();
		timer = setTimeout(() => setOpen(null), props.closeDelayMs ?? PresetMegaMenu.CloseDelayMs);
	}

	function focusTrigger(sectionId: string) {
		root?.querySelector<HTMLElement>(`[data-mega-trigger="${sectionId}"]`)?.focus();
	}

	function handleTriggerKeydown(event: KeyboardEvent, sectionId: string) {
		const triggers = Array.from(root?.querySelectorAll<HTMLElement>('[data-mega-trigger]') ?? []);
		const index = triggers.indexOf(event.currentTarget as HTMLElement);

		if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
			event.preventDefault();
			const step = event.key === 'ArrowRight' ? 1 : -1;
			const next = triggers[(index + step + triggers.length) % triggers.length];
			next?.focus();
			if (openId && next?.dataset.megaTrigger && hasPanel(next.dataset.megaTrigger)) {
				setOpen(next.dataset.megaTrigger);
			}
		} else if (event.key === 'ArrowDown' && hasPanel(sectionId)) {
			event.preventDefault();
			setOpen(sectionId);
			queueMicrotask(() => {
				root?.querySelector<HTMLElement>(`[data-mega-panel="${sectionId}"] a`)?.focus();
			});
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && openId) {
			const current = openId;
			event.preventDefault();
			setOpen(null);
			focusTrigger(current);
		}
	}

	function handleFocusOut(event: FocusEvent) {
		const next = event.relatedTarget as Node | null;
		if (openId && next && !root?.contains(next)) {
			setOpen(null);
		}
	}

	function handleNavigate(event: MouseEvent) {
		props.onNavigate?.(event);
		setOpen(null);
	}

	$effect(() => {
		const handleDocumentClick = (event: Event) => {
			if (openId && root && !event.composedPath().includes(root)) {
				setOpen(null);
			}
		};
		document.addEventListener('click', handleDocumentClick);
		return () => {
			document.removeEventListener('click', handleDocumentClick);
			clearTimer();
		};
	});

	return {
		get openId() {
			return openId;
		},
		get classes() {
			return classes;
		},
		get root() {
			return root;
		},
		set root(element: HTMLElement | null) {
			root = element;
		},
		hasPanel,
		isOpen,
		toggle,
		close,
		handlePointerEnter,
		handlePointerLeave,
		handleTriggerKeydown,
		handleKeydown,
		handleFocusOut,
		handleNavigate
	};
}
