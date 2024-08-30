<script lang="ts">
	export let value = '';
	export let label = '';
</script>

<div class="container">
	<label class="label" for={$$restProps.id}>{label}</label>
	<input class="input" {...$$restProps} bind:value />
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
	.input {
		padding: 0.5rem 1rem;
		border: #007bff 1px solid;
		border-radius: 0.25rem;
		cursor: pointer;
	}
</style>
