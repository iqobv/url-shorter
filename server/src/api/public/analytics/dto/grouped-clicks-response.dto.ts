import { ApiProperty } from '@nestjs/swagger';

export class GroupedClicksResponseDto {
	@ApiProperty({
		example: {
			clicksByCountry: {
				USA: { total: 150, unique: 100 },
				Canada: { total: 50, unique: 30 },
			},
			clicksByDevice: {
				Mobile: { total: 120, unique: 80 },
				Desktop: { total: 80, unique: 50 },
			},
			clicksByDay: {
				'2026-01-01': { total: 70, unique: 50 },
				'2026-01-02': { total: 130, unique: 80 },
			},
			clicksByBrowser: {
				Chrome: { total: 140, unique: 90 },
				Firefox: { total: 60, unique: 40 },
			},
			clicksByOs: {
				Windows: { total: 110, unique: 70 },
				macOS: { total: 90, unique: 60 },
			},
		},
		type: 'object',
		additionalProperties: {
			type: 'object',
			properties: {
				total: { type: 'number' },
				unique: { type: 'number' },
			},
		},
	})
	data: Record<string, Record<string, { total: number; unique: number }>>;
}
