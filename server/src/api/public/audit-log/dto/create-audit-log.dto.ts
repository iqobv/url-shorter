import { EntityType } from '@generated/prisma/enums';
import { ACTION_KEYS } from '@libs/constants';
import type { ActionKeys, AuditMetadataMap } from '@libs/types';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsEnum,
	IsObject,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';

const ALL_ACTION_KEYS = Object.values(ACTION_KEYS).flatMap((cat) =>
	Object.values(cat),
);

export class CreateAuditLogDto<K extends ActionKeys = ActionKeys> {
	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	@IsUUID('4')
	workspaceId: string;

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		required: false,
	})
	@IsOptional()
	@IsUUID('4')
	userId?: string | null;

	@ApiProperty({ example: ACTION_KEYS.LINK.CREATED })
	@IsEnum(ALL_ACTION_KEYS)
	actionKey: K;

	@ApiProperty({
		example: { slug: 'my-link', originalUrl: 'https://example.com' },
	})
	@IsOptional()
	@IsObject()
	metadata?: AuditMetadataMap[K];

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		required: false,
	})
	@IsOptional()
	@IsUUID('4')
	entityId?: string;

	@ApiProperty({ enum: EntityType, example: EntityType.LINK })
	@IsEnum(EntityType)
	entityType: EntityType;

	@ApiProperty({ example: 'John Doe' })
	@IsOptional()
	@IsString()
	actorName?: string;
}
