// @flow

const {
    array,
    ValueType,
    NumberType
} = require('../types');

const RuntimeError = require('../runtime_error');

import type { Expression } from '../expression';
import type ParsingContext from '../parsing_context';
import type EvaluationContext from '../evaluation_context';
import type { Type, ArrayType } from '../types';
import type { Value } from '../values';

class At implements Expression {
    key: string;
    type: Type;
    index: Expression;
    input: Expression;

    constructor(key: string, type: Type, index: Expression, input: Expression) {
        this.key = key;
        this.type = type;
        this.index = index;
        this.input = input;
    }

    static parse(args: Array<mixed>, context: ParsingContext) {
        if (args.length !== 3)
            return context.error(`Expected 2 arguments, but found ${args.length - 1} instead.`);

        const index = context.parse(args[1], 1, NumberType);
        const input = context.parse(args[2], 2, array(context.expectedType || ValueType));

        if (!index || !input) return null;

        const t: ArrayType = (input.type: any);
        return new At(context.key, t.itemType, index, input);
    }

    evaluate(ctx: EvaluationContext) {
        const index = ((this.index.evaluate(ctx): any): number);
        const array = ((this.input.evaluate(ctx): any): Array<Value>);

        if (index < 0 || index >= array.length) {
            throw new RuntimeError(`Array index out of bounds: ${index} > ${array.length}.`);
        }

        if (index !== Math.floor(index)) {
            throw new RuntimeError(`Array index must be an integer, but found ${index} instead.`);
        }

        return array[index];
    }

    eachChild(fn: (Expression) => void) {
        fn(this.index);
        fn(this.input);
    }
}

module.exports = At;
