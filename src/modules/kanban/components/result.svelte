<script lang="ts">
	import type { CumulativeProbabilityEntry } from '../types';

	export let entry: CumulativeProbabilityEntry;
</script>

<div class={`${$$restProps.class} container`}>
	<span class="info">
		<span class="label">{entry[0]}:</span>
		{entry[2].toFixed(2)}%</span
	>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.label {
		text-align: center;
		margin: 0.25rem;
		font-size: 1rem;
	}
	.info {
		padding: 0.5rem 1rem;
		border: #007bff 1px solid;
		border-radius: 0.25rem;
	}
</style>
