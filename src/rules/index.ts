import { IRuleValues, IRule, PredefinedValues, IKOut, IValues } from '../types';

export const baseRules: IRule = {
	ABC: ({ A, B, C }: IRuleValues) => A && B && C && PredefinedValues.M,
	ABnC: ({ A, B, C }: IRuleValues) => A && B && !C && PredefinedValues.P,
	nABC: ({ A, B, C }: IRuleValues) => !A && B && C && PredefinedValues.T,
};

export const c2Rules: IRule = {
	ABnC: ({ A, B, C }: IRuleValues) => A && B && !C && PredefinedValues.T,
	AnBC: ({ A, B, C }: IRuleValues) => A && !B && C && PredefinedValues.M,
};

export const Kbase: IKOut = {
	M: ({ D, E }: IValues) => D + (D * E) / 10,
	P: ({ D, E, F }: IValues) => D + (D * (E - F)) / 25.5,
	T: ({ D, F }: IValues) => D - (D * F) / 30,
};

export const Kc1: IKOut = {
	P: ({ D, E }: IValues) => 2 * D + (D * E) / 100,
};

export const Kc2: IKOut = {
	M: ({ D, E, F }: IValues) => F + D + (D * E) / 100,
};
