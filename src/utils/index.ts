import {
	IRuleValues,
	IRule,
	PredefinedValues,
	IKOut,
	IPossibleValues,
	IExpressions,
	IValues,
} from '../types';
import { baseRules, Kbase, Kc1, Kc2, c2Rules } from '../rules';

const calculateH = (values: IRuleValues, rules: IRule) => {
	let _H: PredefinedValues | boolean = false;
	for (const iterator of Object.keys(rules)) {
		const _r = rules[iterator](values);
		_H = _r ? _r : _H;
	}

	if (!_H) return undefined;
	return _H as PredefinedValues;
};

const calculateK = (values: IValues, _H: string | undefined, _K: IKOut) => {
	switch (_H) {
		case PredefinedValues.M:
			return _K.M(values);
		case PredefinedValues.P:
			return _K.P(values);
		case PredefinedValues.T:
			return _K.T(values);
		default:
			console.error('Incorrect inputs', Error());
			return _H;
	}
};

export const calculateOutputs = (values: IPossibleValues, expressions: IExpressions) => {
	let _rules: IRule = { ...baseRules };
	let _k: IKOut = { ...Kbase };

	if (expressions === IExpressions.custom1) _k = { ..._k, ...Kc1 };
	else if (expressions === IExpressions.custom2) {
		_rules = { ..._rules, ...c2Rules };
		_k = { ..._k, ...Kc2 };
	}

	const _H = calculateH(values, _rules);
	const _K = calculateK(values, _H, _k);

	return [_H, _K];
};
