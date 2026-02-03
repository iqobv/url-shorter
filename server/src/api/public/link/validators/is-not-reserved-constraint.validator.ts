import { Injectable } from '@nestjs/common';
import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { ReservedWordService } from 'src/api/public/reserved-word/reserved-word.service';

@ValidatorConstraint({ name: 'isNotReserved', async: true })
@Injectable()
export class IsNotReservedConstraint implements ValidatorConstraintInterface {
	constructor(private readonly reservedWordService: ReservedWordService) {}

	validate(value: unknown) {
		if (typeof value !== 'string') return false;

		return !this.reservedWordService.isReserved(value);
	}

	defaultMessage(args: ValidationArguments) {
		return `The alias "${args.value}" is reserved.`;
	}
}
