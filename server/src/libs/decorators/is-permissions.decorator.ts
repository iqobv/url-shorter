import { registerDecorator, ValidationOptions } from 'class-validator';
import { PERMISSIONS } from '../constants';
import { Permissions } from '../types';

export function IsPermissions(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'isPermissions',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: {
				validate(value: unknown) {
					if (!Array.isArray(value)) return false;
					const validPermissions = Object.values(PERMISSIONS).flatMap((perm) =>
						Object.values(perm),
					);
					return value.every((p: Permissions) => validPermissions.includes(p));
				},
				defaultMessage() {
					return `${propertyName} must be an array of valid permissions`;
				},
			},
		});
	};
}
