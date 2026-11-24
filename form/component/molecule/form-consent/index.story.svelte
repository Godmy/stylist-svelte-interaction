<script lang="ts">
	import Consent from '$stylist/form/component/molecule/form-consent/index.svelte';
	let checked = $state(false);
</script>

<Consent bind:checked>
	Даю <a href="#consent">согласие на обработку персональных данных</a> для связи по заявке.
</Consent>
<p>{checked ? 'Согласие дано' : 'Согласия нет'}</p>
