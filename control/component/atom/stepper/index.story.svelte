<script lang="ts">
	import Stepper from './index.svelte';
</script>

<div style="display:grid;gap:16px;max-width:360px;padding:24px;">
	<Stepper label="Adults" value={2} min={1} max={12} />
	<Stepper label="Children" value={0} min={0} max={8} />
	<Stepper label="Disabled quantity" value={4} disabled />
</div>
