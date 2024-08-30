import type { ProbabilityArray, SimulationResult, TeamIterationResult } from './types';

export function monteCarloTaskPrediction(
	previousIterations: TeamIterationResult[],
	remainingTasksCount: number,
	numSimulations = 1_000_000
): ProbabilityArray {
	return createProbabilityTable(
		runSimulation(numSimulations, previousIterations, remainingTasksCount),
		numSimulations
	);
}

export function runSimulation(
	numSimulations: number,
	previousIterations: number[],
	remainingTasksCount: number
): SimulationResult {
	const results = [];

	for (let i = 0; i < numSimulations; i++) {
		let tasksLeft = remainingTasksCount;
		let totalTime = 0;

		while (tasksLeft > 0) {
			const variabilityFactor = Math.random() * 0.2 + 0.9;
			const randomIteration =
				previousIterations[Math.floor(Math.random() * previousIterations.length)] *
				variabilityFactor;
			tasksLeft -= randomIteration;
			totalTime += 1;
		}

		results.push(totalTime);
	}

	return results;
}

export function createProbabilityTable(
	simulationResults: number[],
	numSimulations: number
): ProbabilityArray {
	const probabilityArray: ProbabilityArray = simulationResults.reduce(
		reduceSimulationResultsToProbabilityArray,
		[]
	);

	return (
		probabilityArray
			// Sort the probability table by time
			.sort(sortByTime)
			// Convert to percentage
			.map(getMapToPercentage(numSimulations))
			// Calculate cumulative probability
			.reduce<ProbabilityArray>(reduceToCumulativeProbabilityArray, [])
	);
}
function reduceSimulationResultsToProbabilityArray(
	acc: ProbabilityArray,
	entry: number
): ProbabilityArray {
	const existingProbability = acc.find((accEntry) => accEntry[0] === entry);
	if (existingProbability) {
		existingProbability[1] += 1;
	} else {
		acc.push([entry, 1]);
	}
	return acc;
}

function sortByTime(a: [number, number], b: [number, number]): number {
	return a[0] - b[0];
}

function reduceToCumulativeProbabilityArray(
	acc: ProbabilityArray,
	entry: [number, number],
	index: number
): ProbabilityArray {
	entry[1] += acc[index - 1]?.[1] || 0;
	acc.push(entry);
	return acc;
}

function getMapToPercentage(
	numSimulations: number
): (value: [number, number], index: number, array: [number, number][]) => [number, number] {
	return (entry) => {
		entry[1] = (entry[1] / numSimulations) * 100;
		return entry;
	};
}
