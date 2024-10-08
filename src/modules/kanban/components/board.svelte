<script lang="ts">
	import AppInput from '../../../lib/components/input.svelte';
	import AppButton from '../../../lib/components/button.svelte';
	import { monteCarloTaskPrediction } from '../service';
	import AppInfo from '../../../lib/components/info.svelte';
	import Result from './result.svelte';
	import RemovableInput from '$lib/components/removableInput.svelte';
	import Button from '../../../lib/components/button.svelte';
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';
	import AppCheckbox from '$lib/components/checkbox.svelte';

	let previousIterations: number[] = [6, 8, 4, 11, 14];
	let remainingTasks: string = '60';
	let nextIteration: string = '5';
	let numberOfSimulations = '1000';
	let focusFactor = '1';
	let chart: Chart;
	let weighted: boolean = false;

	$: probabilityArray = monteCarloTaskPrediction(
		previousIterations,
		Number(remainingTasks || 0),
		Number(numberOfSimulations || 0),
		weighted,
		Number(focusFactor || 0)
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

	function updateChart() {
		if (!chart) return;
		chart.data.labels = probabilityArray.map(([x]) => x);
		chart.data.datasets[0].data = probabilityArray.map(([_, __, y]) => y);
		chart.data.datasets[1].data = probabilityArray.map(([_, y]) => y);
		chart.update();
	}

	onMount(() => {
		const element = document.getElementById('chart') as HTMLCanvasElement;
		if (!element) return;

		chart = new Chart(element, {
			type: 'line',
			data: {
				labels: probabilityArray.map(([x]) => x),
				datasets: [
					{
						label: 'Cumulative Probability',
						data: probabilityArray.map(([_, __, y]) => y),
						fill: false,
						borderColor: '#ff0000',
						tension: 0.3
					},
					{
						label: 'Confidence',
						data: probabilityArray.map(([_, y]) => y),
						borderColor: '#0000ff',
						fill: true,
						backgroundColor: 'rgba(0, 0, 255, 0.1)',
						tension: 0.5
					}
				]
			}
		});
		() => chart.destroy();
	});

	$: probabilityArray, updateChart();
</script>

<div class="container">
	<h1>Monte Carlo Task Prediction</h1>
	<div>
		<AppCheckbox bind:checked={weighted} label="Linear weight most recent tasks" />
		<AppInput label="Focus Factor" bind:value={focusFactor} />
		<AppInput label="# of Simulations" bind:value={numberOfSimulations} />
		<AppInput label="# of Remaining Tasks" bind:value={remainingTasks} />
		<AppInfo title="Past flow (eg: # of tasks done per week)">
			<div class="previous-iterations">
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
		<AppButton class="element" on:click={clearData}>Clear Data</AppButton>
	</div>
	<div class="form-element">
		Results:
		<br />
	</div>
	<canvas id="chart"></canvas>
	Results (# of iterations: cumulative probability):
	<div class="results">
		{#each probabilityArray as entry}
			<Result class="element" {entry} />
		{/each}
	</div>
</div>

<style lang="scss" scoped>
	.container {
		.results {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			gap: 0.1rem;
			flex-wrap: wrap;
		}

		:global(.previous-iterations) {
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: wrap;
			gap: 0.5rem;
		}
		:global(.element) {
			margin-top: 0.25rem;
		}
	}
</style>
