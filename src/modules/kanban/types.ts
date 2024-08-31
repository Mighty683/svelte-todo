export type TeamIterationResult = number;
export type NumberOfIterations = number;
export type NumberOfResults = number;
export type SimulationResultsGrouped = [NumberOfIterations, NumberOfResults];
export type CumulativeProbability = number;
export type CumulativeProbabilityEntry = [
	NumberOfIterations,
	NumberOfResults,
	CumulativeProbability
];
export type GroupedResultsArray = SimulationResultsGrouped[];
export type CumulativeProbabilityArray = CumulativeProbabilityEntry[];
export type SimulationResult = NumberOfIterations[];
