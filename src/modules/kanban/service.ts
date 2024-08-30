import type { ProbabilityTable, TeamIterationResult } from './types';

export function monteCarloTaskPrediction(
	previousIterations: TeamIterationResult[],
	remainingTasksCount: number,
	numSimulations = 1_000_000
): ProbabilityTable {
	console.log(
		'Running Monte Carlo simulation with',
		numSimulations,
		'simulations',
		previousIterations,
		remainingTasksCount
	);
	const results = [];

	for (let i = 0; i < numSimulations; i++) {
		let tasksLeft = remainingTasksCount;
		let totalTime = 0;

		while (tasksLeft > 0) {
			const randomIteration =
				previousIterations[Math.floor(Math.random() * previousIterations.length)];
			tasksLeft -= randomIteration;
			totalTime += 1;
		}

		results.push(totalTime);
	}

	const probabilityTable: ProbabilityTable = [];

	results.forEach((time) => {
		const existingProbability = probabilityTable.find((entry) => entry[0] === time);
		if (existingProbability) {
			existingProbability[1] += 1;
		} else {
			probabilityTable.push([time, 1]);
		}
	});
	return (
		probabilityTable
			// Sort the probability table by time
			.sort((a, b) => Number(a[0]) - Number(b[0]))
			// Convert to percentage
			.map((entry) => {
				entry[1] = (entry[1] / numSimulations) * 100;
				return entry;
			})
			// Calculate cumulative probability
			.reduce<ProbabilityTable>((acc, entry, index) => {
				entry[1] += acc[index - 1]?.[1] || 0;
				acc.push(entry);
				return acc;
			}, [])
	);
}
