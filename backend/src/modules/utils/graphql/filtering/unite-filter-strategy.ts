const enum UnionOperator {
    And = 'AND',
    Or  = 'OR'
}

export abstract class UntiteFilterStrategy {
    protected abstract getOperator():     UnionOperator;
    protected abstract shouldBeNegated(): boolean;

    addOperand(prevQuery: string, operand: string) {
        return (
            prevQuery.length === 0 ? operand   :
            operand.length   === 0 ? prevQuery :
            `${prevQuery} ${this.getOperator()} ${operand}`
        ); 
    }

    wrapOperands(query: string) { 
        return this.shouldBeNegated() ? `NOT (${query})` : query;
    }
}

export class AndUniteFilterStrategy extends UntiteFilterStrategy {
    protected getOperator()     { return UnionOperator.And; }
    protected shouldBeNegated() { return false; }
}

export class OrUniteFilterStrategy extends UntiteFilterStrategy {
    protected getOperator()     { return UnionOperator.Or; }
    protected shouldBeNegated() { return false; }
}

export class NandUniteFilterStrategy extends UntiteFilterStrategy {
    protected getOperator()     { return UnionOperator.And; }
    protected shouldBeNegated() { return true; }
}

export class NorUniteFilterStrategy extends UntiteFilterStrategy {
    protected getOperator()     { return UnionOperator.Or; }
    protected shouldBeNegated() { return true; }
}