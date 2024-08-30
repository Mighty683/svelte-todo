<script lang="ts">
	export let entry: [number, number];
</script>

<div class={`${$$restProps.class} container`}>
	<span class="label">{entry[0]}</span>
	<span class="info">{entry[1].toFixed(0)}%</span>
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
		min-width: 3rem;
		margin: 0.25rem;
		font-size: 1rem;
	}
	.info {
		padding: 0.5rem 1rem;
		border: #007bff 1px solid;
		border-radius: 0.25rem;
	}
</style>
