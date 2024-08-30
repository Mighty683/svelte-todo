<script lang="ts">
	export let loading = false;
</script>

<button on:click {...$$restProps} class={`button ${$$restProps.class || ''}`}>
	{#if loading}
		<span class="spinner" />
	{:else}
		<slot />
	{/if}
</button>

<style lang="scss">
	.button {
		background-color: #007bff;
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.25rem;
		min-height: 2rem;

		cursor: pointer;
	}

	.spinner {
		display: inline-block;
		width: 0.75rem;
		height: 0.75rem;
		border: 3px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: #fff;
		animation: spin 1s ease-in-out infinite;
		-webkit-animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
	@-webkit-keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
</style>
