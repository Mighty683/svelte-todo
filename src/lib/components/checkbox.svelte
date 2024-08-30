<script lang="ts">
	export let checked: boolean = false;
	export let label: string = '';
	export let disabled: boolean = false;
	export let id: string = Math.random().toString(36).substring(7);
</script>

<div class="checkbox">
	<input {id} type="checkbox" bind:checked {disabled} />
	<label for={id}>{label}</label>
</div>

<style lang="scss">
	.checkbox {
		display: flex;
		align-items: center;
	}
	.label {
		margin-left: 0.5rem;
	}

	input {
		margin-right: 0.5rem;
	}
</style>
