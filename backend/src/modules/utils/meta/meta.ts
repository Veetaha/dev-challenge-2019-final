import * as I from '@app/interfaces';


/**
 * Returns a constructor function of the TypeScript type that was defined for
 * the given `propName` of the given class'es `classPrototype`.
 * 
 * @param classPrototype Proptotype of the class to get type from.
 * @param propName       Target property name to get type of.
 * 
 * @remarks
 * This feature is currently experimental and not as determinated as it is wished
 * to be. So if your TypeScript type is complex, e.g. a union type or generic,
 * you will get only `Object` or the constructor of your generic type with no 
 * information about its type arguments.
 * 
 * Details: http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4#3-basic-type-serialization_1
 * 
 */
export function getTypeScriptType(classPrototype: I.Obj, propName: string | symbol): I.Class {
    return Reflect.getOwnMetadata('design:type', classPrototype, propName);
}
