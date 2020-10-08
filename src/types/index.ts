export interface IRuleValues {
	A: boolean;
	B: boolean;
	C: boolean;
}

export interface IValues {
	D: number;
	E: number;
	F: number;
}

export type IPossibleValues = IRuleValues & IValues;

export enum PredefinedValues {
	M = 'M',
	P = 'P',
	T = 'T',
}

export interface IRule {
	[k: string]: (a: IRuleValues) => PredefinedValues | boolean;
}

export interface IKOut {
	[k: string]: (a: IValues) => number;
}

export enum IExpressions {
	base = 'Base rules',
	custom1 = 'Custom 1',
	custom2 = 'Custom 2',
}
