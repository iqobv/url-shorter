import { AuditChangeValue } from './audit-change-value.types';

export interface AuditChange {
	field: string;
	oldValue: AuditChangeValue;
	newValue: AuditChangeValue;
}
