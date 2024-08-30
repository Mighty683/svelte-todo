import type {
	CumulativeProbabilityArray,
	ProbabilityArray,
	ProbabilityEntry,
	SimulationResult,
	TeamIterationResult
} from './types';

export function monteCarloTaskPrediction(
	previousIterations: TeamIterationResult[],
	remainingTasksCount: number,
	numSimulations = 1_000_000,
	weighted = false,
	focusFactor = 1
): CumulativeProbabilityArray {
	const result = createProbabilityTable(
		runSimulation(
			numSimulations,
			previousIterations,
			remainingTasksCount,
			focusFactor,
			weighted
				? getWeightedSimulationStrategy(previousIterations)
				: getUnweightedSimulationStrategy(previousIterations)
		),
		numSimulations
	);
	if (result.length) {
		return addZeroResultsToBegin(result);
	} else {
		return [[0, 100, 100]];
	}
}

export function getWeightedSimulationStrategy(previousIterations: number[]): () => number {
	const weights = previousIterations.map((_, index) => index + 1); // Linear weight increase
	const cumulativeWeights = weights.reduce<number[]>((acc, weight) => {
		const lastValue = acc.length > 0 ? acc[acc.length - 1] : 0;
		acc.push(lastValue + weight);
		return acc;
	}, []);

	return () => {
		const randomWeight = Math.random() * cumulativeWeights[cumulativeWeights.length - 1];
		const selectedIndex = cumulativeWeights.findIndex(
			(cumulativeWeight) => cumulativeWeight >= randomWeight
		);
		return previousIterations[selectedIndex];
	};
}

export function getUnweightedSimulationStrategy(previousIterations: number[]): () => number {
	return () => previousIterations[Math.floor(Math.random() * previousIterations.length)];
}

export function runSimulation(
	numSimulations: number,
	previousIterations: number[],
	remainingTasksCount: number,
	focusFactor: number,
	selectIterationResultStrategy: () => number
): SimulationResult {
	if (
		!arePreviousIterationsCorrect(previousIterations) ||
		remainingTasksCount <= 0 ||
		numSimulations <= 0
	) {
		return [];
	}
	const results = [];

	for (let i = 0; i < numSimulations; i++) {
		let tasksLeft = remainingTasksCount;
		let totalTime = 0;

		while (tasksLeft > 0) {
			const randomIteration = selectIterationResultStrategy() * focusFactor;
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
): CumulativeProbabilityArray {
	return simulationResults
		.reduce(reduceSimulationResultsToProbabilityArray, [])
		.sort(sortByTime)
		.map(getMapToPercentage(numSimulations))
		.reduce<CumulativeProbabilityArray>(reduceToCumulativeProbabilityArray, []);
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

function arePreviousIterationsCorrect(previousIterations: TeamIterationResult[]): boolean {
	return !!previousIterations.length && previousIterations.every((iteration) => iteration > 0);
}

function sortByTime(a: [number, number], b: [number, number]): number {
	return a[0] - b[0];
}

function reduceToCumulativeProbabilityArray(
	acc: CumulativeProbabilityArray,
	entry: ProbabilityEntry,
	index: number
): CumulativeProbabilityArray {
	const cumulative = entry[1] + (acc[index - 1]?.[2] || 0);
	acc.push([entry[0], entry[1], cumulative]);
	return acc;
}

function getMapToPercentage(
	numSimulations: number
): (value: ProbabilityEntry, index: number, array: [number, number][]) => ProbabilityEntry {
	return (entry) => {
		entry[1] = (entry[1] / numSimulations) * 100;
		return entry;
	};
}

function addZeroResultsToBegin(results: CumulativeProbabilityArray): CumulativeProbabilityArray {
	if (results[0][0] !== 0) {
		results.unshift([results[0][0] - 1, 0, 0]);
	}
	return results;
}
