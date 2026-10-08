<script lang="ts">
	import createSliderTickState from './state.svelte';
	import type { RecipeTick } from '$stylist/control/interface/recipe/tick';

	let props: RecipeTick = $props();

	const state = createSliderTickState(() => props);

	const restProps = $derived(
		(() => {
			const {
				class: _class,
				value: _value,
				position: _position,
				active: _active,
				label: _label,
				...rest
			} = props;
			return rest;
		})()
	);
</script>

<div
	class={['c-tick', props.class].filter(Boolean).join(' ')}
	data-active={state.active || undefined}
	style="left: {state.position}%"
	{...restProps}
>
	{#if state.label}
		<span>{state.label}</span>
	{:else}
		{state.value}
	{/if}
</div>

<style>
	.c-tick {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translateX(-50%);
	}

	.c-tick::before {
		content: '';
		display: block;
		width: 2px;
		height: 0.5rem;
		background: var(--color-border-primary);
		border-radius: 1px;
	}

	.c-tick[data-active]::before {
		background: var(--color-primary-500);
	}

	.c-tick span {
		margin-top: 0.25rem;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		white-space: nowrap;
	}
</style>
