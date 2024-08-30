<script lang="ts">
	export let value: string = '';
	export let onChange = (value: string) => {};
	export let onClear = () => {};
</script>

<div class="container">
	<input class="input" bind:value on:input={(e) => onChange(e.currentTarget?.value)} />
	<button class="remove" on:click={onClear}>X</button>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;
		flex-direction: row;

		.input {
			font-size: 0.8rem;
			padding: 0.25rem;
			border: #007bff 1px solid;
			border-radius: 0.25rem;
			flex-grow: 0;
			flex-shrink: 1;
			width: 3rem;
			cursor: pointer;
		}
		.remove {
			padding: 0.25rem 0.5rem;
			border: #007bff 1px solid;
			border-radius: 0.25rem;
			cursor: pointer;
		}
	}
</style>
