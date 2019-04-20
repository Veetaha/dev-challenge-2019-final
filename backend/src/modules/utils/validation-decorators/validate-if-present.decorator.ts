import { ValidateIf } from 'class-validator';

export const ValidateIfPresent = ValidateIf(value => value != null);