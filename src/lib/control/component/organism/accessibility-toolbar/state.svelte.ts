import type { RecipeAccessibilityToolbar } from '$stylist/control/interface/recipe/accessibility-toolbar';

export function createAccessibilityToolbarState(getProps: () => RecipeAccessibilityToolbar) {
	const props = $derived(getProps());
	const showFontSizeControls = $derived(props.showFontSizeControls ?? true);
	const showScreenReaderTester = $derived(props.showScreenReaderTester ?? true);
	const showFocusIndicatorToggle = $derived(
		props.showFocusIndicatorToggle ?? props.showFocusIndicator ?? true
	);
	const showAnimationToggle = $derived(
		props.showAnimationToggle ?? props.showTokenAnimationToggle ?? true
	);
	const variant = $derived((props.variant ?? 'default') as 'default' | 'minimal' | 'compact');
	const size = $derived((props.size ?? 'md') as 'sm' | 'md' | 'lg');

	const containerClass = $derived(['c-a11y-toolbar', props.class].filter(Boolean).join(' '));
	const toolbarClass = $derived(
		['c-a11y-toolbar__bar', props.toolbarClass].filter(Boolean).join(' ')
	);
	const buttonClass = $derived(
		['c-a11y-toolbar__btn', props.buttonClass].filter(Boolean).join(' ')
	);
	const activeButtonClass = 'c-a11y-toolbar__btn--active';
	const fontSizeDisplayClass = 'c-a11y-toolbar__font-size';
	let fontSizeScale = $state(1);
	let screenReaderMode = $state(false);
	let focusIndicator = $state(true);
	let disableTokenAnimation = $state(false);

	const restProps = $derived.by(() => {
		const {
			class: className,
			toolbarClass: toolbarClassName,
			buttonClass: buttonClassName,
			showFontSizeControls: fontSizeControls,
			showScreenReaderTester: screenReaderTester,
			showFocusIndicator,
			showTokenAnimationToggle,
			showFocusIndicatorToggle: focusIndicatorToggle,
			showAnimationToggle: animationToggle,
			variant: variantName,
			size: sizeName,
			children,
			...rest
		} = props;
		return rest;
	});

	function increaseFontSize() {
		if (fontSizeScale < 1.5) {
			fontSizeScale = Math.round((fontSizeScale + 0.1) * 10) / 10;
			document.documentElement.style.fontSize = `${fontSizeScale * 16}px`;
		}
	}

	function decreaseFontSize() {
		if (fontSizeScale > 0.8) {
			fontSizeScale = Math.round((fontSizeScale - 0.1) * 10) / 10;
			document.documentElement.style.fontSize = `${fontSizeScale * 16}px`;
		}
	}

	function toggleScreenReaderMode() {
		screenReaderMode = !screenReaderMode;
		alert(
			screenReaderMode
				? 'Screen reader mode activated. All visual elements will be described.'
				: 'Screen reader mode deactivated.'
		);
	}

	function toggleFocusIndicator() {
		focusIndicator = !focusIndicator;
		document.body.classList.toggle('no-focus-outline', !focusIndicator);
	}

	function toggleTokenAnimation() {
		disableTokenAnimation = !disableTokenAnimation;

		if (disableTokenAnimation) {
			document.body.classList.add('reduce-motion');
			document.documentElement.style.setProperty('--animation-duration', '0.01ms');
			document.documentElement.style.setProperty('--animation-iteration-count', '1');
			return;
		}

		document.body.classList.remove('reduce-motion');
		document.documentElement.style.removeProperty('--animation-duration');
		document.documentElement.style.removeProperty('--animation-iteration-count');
	}

	return {
		get showFontSizeControls() {
			return showFontSizeControls;
		},
		get showScreenReaderTester() {
			return showScreenReaderTester;
		},
		get showFocusIndicatorToggle() {
			return showFocusIndicatorToggle;
		},
		get showAnimationToggle() {
			return showAnimationToggle;
		},
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get restProps() {
			return restProps;
		},
		get fontSizeScale() {
			return fontSizeScale;
		},
		get screenReaderMode() {
			return screenReaderMode;
		},
		get focusIndicator() {
			return focusIndicator;
		},
		get disableTokenAnimation() {
			return disableTokenAnimation;
		},
		get containerClass() {
			return containerClass;
		},
		get toolbarClass() {
			return toolbarClass;
		},
		get buttonClass() {
			return buttonClass;
		},
		activeButtonClass,
		fontSizeDisplayClass,
		increaseFontSize,
		decreaseFontSize,
		toggleScreenReaderMode,
		toggleFocusIndicator,
		toggleTokenAnimation
	};
}
