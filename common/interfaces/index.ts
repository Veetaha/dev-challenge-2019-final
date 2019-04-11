import { Obj, Op, FilterProps, Func, Tag } from 'ts-typedefs';
export * from 'ts-typedefs';

export type CoreObjData<TObj extends Obj> = FilterProps<
    TObj,
    Op.NotExtends<Func<any, any, TObj>>
>;

// number within range [0-65635]
export type PortNumber = Tag<number, 'PortNumber'>;
export type Integer    = Tag<number, 'Integer'>;