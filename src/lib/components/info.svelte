<script lang="ts">
	export let title = '';
</script>

<div class="container">
	<div class="label">
		{title}
	</div>
	<div class="info">
		<slot></slot>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
	}
	.label {
		margin: 0.25rem;
		font-size: 1rem;
	}
	.info {
		padding: 0.5rem 1rem;
		border: #007bff 1px solid;
		border-radius: 0.25rem;
	}
</style>
