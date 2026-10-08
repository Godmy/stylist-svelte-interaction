<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import AnimatedButton from '../animated-button/index.svelte';
	let {
		attention = true,
		animatedBorder = true,
		...props
	}: Omit<ComponentProps<typeof AnimatedButton>, 'effect'> = $props();
</script>

<AnimatedButton {...props} {attention} {animatedBorder} effect="shine" />
