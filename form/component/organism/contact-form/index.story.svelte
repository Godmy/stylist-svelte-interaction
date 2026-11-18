<script lang="ts">
	import ContactForm from '$stylist/form/component/organism/contact-form/index.svelte';
	import type { RecipeContactForm } from '$stylist/form/interface/recipe/contact-form';
	let props: RecipeContactForm = $props();
</script>

<ContactForm {...props} onsubmit={(event) => event.preventDefault()} />
