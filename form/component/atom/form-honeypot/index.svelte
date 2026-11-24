<script lang="ts">
	import type { RecipeFormHoneypot } from '$stylist/form/interface/recipe/form-honeypot';
	let {
		name = 'website',
		label = 'Не заполняйте это поле',
		class: className,
		...rest
	}: RecipeFormHoneypot = $props();
</script>

<!-- Off-screen trap: people never see it, form-filling bots do. -->
<label {...rest} class={['form-honeypot', className]} aria-hidden="true">
	{label}
	<input {name} tabindex="-1" autocomplete="off" />
</label>

<style>
	:where(.form-honeypot) {
		position: absolute;
		left: -10000px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
</style>
