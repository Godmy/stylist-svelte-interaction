<script lang="ts">
	import ArcLetter from '$stylist/animation/component/atom/arc-letter/index.svelte';
	import LetterArcPath from '$stylist/animation/component/atom/letter-arc-path/index.svelte';
	import type { RecipePhraseArcFlight } from '$stylist/animation/interface/recipe/phrase-arc-flight';
	import createPhraseArcFlightComponentState from '$stylist/animation/component/molecule/phrase-arc-flight/state.svelte';

	let {
		phrase,
		points,
		pathText,
		progress = 0,
		width = 720,
		height = 360,
		amplitude = 7,
		stagger = 0.035,
		highlight = true,
		highlightIntensity = 0.85,
		showPath = true,
		still = true,
		class: className = ''
	}: RecipePhraseArcFlight = $props();

	const state = createPhraseArcFlightComponentState(() => ({
		phrase: phrase,
		points: points,
		pathText: pathText,
		progress: progress,
		amplitude: amplitude,
		stagger: stagger,
		highlight: highlight,
		highlightIntensity: highlightIntensity,
		still: still
	}));
</script>

<div
	class={`c-phrase-arc-flight ${className}`}
	style:--phrase-arc-width={`${width}px`}
	style:--phrase-arc-height={`${height}px`}
>
	{#if showPath}
		<LetterArcPath points={state.parsedPoints} {width} {height} progress={state.pathProgress} />
	{/if}
	{#each state.letterStates as letter, index (`${index}-${letter.character}`)}
		<ArcLetter {...letter} />
	{/each}
</div>

<style>
	.c-phrase-arc-flight {
		position: relative;
		isolation: isolate;
		width: min(100%, var(--phrase-arc-width, 720px));
		aspect-ratio: 2 / 1;
		min-height: min(var(--phrase-arc-height, 360px), 58vw);
		overflow: hidden;
		border: 1px solid rgb(17 58 52 / 0.14);
		border-radius: 0.5rem;
		background: linear-gradient(135deg, rgb(232 247 242 / 0.96), rgb(255 251 238 / 0.94)), #f4fbf8;
		font-size: clamp(1.8rem, 5vw, 3.8rem);
	}
</style>
