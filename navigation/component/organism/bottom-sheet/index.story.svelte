<script lang="ts">
	import BottomSheet from './index.svelte';
</script>

<div style="min-height:420px;padding:24px;background:#eef2f7;">
	<BottomSheet open title="Booking details">
		{#snippet children()}
			<div style="display:grid;gap:12px;">
				<p style="margin:0;">Pickup, date and traveler controls can live here on mobile.</p>
				<label>Date <input type="date" /></label>
			</div>
		{/snippet}
		{#snippet actions()}
			<button>Cancel</button>
			<button>Apply</button>
		{/snippet}
	</BottomSheet>
</div>
