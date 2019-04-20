import * as CV  from 'class-validator';
import * as Joi from 'typesafe-joi';

import * as I from '@app/interfaces';
import { getTypeScriptType } from '../meta/meta';


class ValidateNestedInputConstraint implements CV.ValidatorConstraintInterface {
    private err?: I.Nullable<Joi.ValidationError>;

    validate(suspect: unknown, { constraints: [schema] }: CV.ValidationArguments) {
        return null == (this.err = Joi.validate(suspect, schema).error);
    }

    defaultMessage() {
        return this.err!.message;
    }
}

export function ValidateNestedInput<TNested extends I.Obj = I.Obj>
(
    getType?: ((arg?: undefined) => I.Class<TNested>), 
    options?: CV.ValidationOptions
): I.PropertyDecorator<I.Nullable<TNested>> {
    return (classProto, propertyName) => {
        CV.registerDecorator({
            name:        ValidateNestedInput.name,
            target:      classProto.constructor,
            constraints: [getType, getTypeScriptType(classProto, propertyName)],
            validator:   ValidateNestedInputConstraint,
            propertyName,
            options
        });
    };
}