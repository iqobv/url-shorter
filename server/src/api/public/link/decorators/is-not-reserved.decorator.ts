import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsNotReservedConstraint } from '../validators';

export function IsNotReserved(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsNotReservedConstraint,
		});
	};
}
