<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import AnimatedButton from '../animated-button/index.svelte';
	let {
		selected = $bindable(false),
		onclick,
		...rest
	}: Omit<ComponentProps<typeof AnimatedButton>, 'effect' | 'href' | 'target' | 'rel'> = $props();
</script>

<AnimatedButton
	{...rest}
	effect="selection"
	{selected}
	aria-pressed={selected}
	onclick={(event) => {
		onclick?.(event);
		if (!event.defaultPrevented) selected = !selected;
	}}
/>
