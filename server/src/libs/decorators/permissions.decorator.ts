import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/public/auth/guards';
import { ERRORS } from '../constants';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions as PermissionsType } from '../types';
import { createCustomMessageDto } from '../utils';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (...permissions: PermissionsType[]) => {
	return applyDecorators(
		SetMetadata(PERMISSIONS_KEY, permissions),
		UseGuards(JwtAuthGuard, PermissionsGuard),
		ApiNotFoundResponse({
			type: createCustomMessageDto(
				ERRORS.WORKSPACE.WORKSPACE_NOT_FOUND_OR_NO_PERMISSION,
			),
		}),
		ApiForbiddenResponse({
			type: createCustomMessageDto(ERRORS.WORKSPACE.NO_PERMISSION),
		}),
	);
};
