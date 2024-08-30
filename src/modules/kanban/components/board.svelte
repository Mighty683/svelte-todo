<script lang="ts">
	import AppInput from '../../../lib/components/input.svelte';
	import AppButton from '../../../lib/components/button.svelte';
	import { monteCarloTaskPrediction } from '../service';
	import AppInfo from '../../../lib/components/info.svelte';
	import Result from './result.svelte';
	import RemovableInput from '$lib/components/removableInput.svelte';
	import Button from '../../../lib/components/button.svelte';

	let previousIterations: number[] = [10, 9, 4, 12, 13];
	let remainingTasks: string = '60';
	let nextIteration: string = '5';
	let numberOfSimulations = '1000000';

	$: probabilityTable = monteCarloTaskPrediction(
		previousIterations,
		Number(remainingTasks || 0),
		Number(numberOfSimulations || 0)
	);

	function addIteration() {
		previousIterations = [...previousIterations, 0];
	}

	function editIteration(index: number, value: string) {
		previousIterations = previousIterations.map((iteration, i) =>
			i === index ? Number(value) : iteration
		);
	}

	function removeIteration(index: number) {
		previousIterations = previousIterations.filter((_, i) => i !== index);
	}

	function clearData() {
		previousIterations = [];
		remainingTasks = '10';
		nextIteration = '5';
		numberOfSimulations = '1000000';
	}
</script>

<div class="container">
	<h1>Monte Carlo Task Prediction</h1>
	<div>
		<AppInfo title="Number of Simulations">
			{numberOfSimulations}
		</AppInfo>
		<AppInfo title="Remaining Tasks">
			{remainingTasks}
		</AppInfo>
		<AppInfo title="Previous Iterations">
			<div class="results">
				{#each previousIterations as iteration, index}
					<RemovableInput
						value={iteration.toString()}
						onChange={(v) => editIteration(index, v)}
						onClear={() => removeIteration(index)}
					/>
				{/each}
				<Button on:click={addIteration}>Add</Button>
			</div>
		</AppInfo>
	</div>
	<div>
		<AppInput label="Remaining Tasks" bind:value={remainingTasks} />
	</div>
	<div>
		<AppInput label="Number of Simulations" bind:value={numberOfSimulations} />
	</div>
	<div>
		<AppButton class="element" on:click={clearData}>Clear Data</AppButton>
	</div>
	<div class="form-element">
		Results:
		<br />
	</div>
	{#each probabilityTable as entry}
		<Result class="element" {entry} />
	{/each}
</div>

<style lang="scss" scoped>
	.container {
		.results {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			gap: 0.5rem;
			flex-wrap: wrap;
		}
		:global(.element) {
			margin-top: 0.25rem;
		}
	}
</style>
