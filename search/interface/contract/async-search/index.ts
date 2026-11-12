export interface ContractAsyncSearch<T> {
	load: (query: string, signal: AbortSignal) => Promise<readonly T[]>;
	minLength?: number;
}
