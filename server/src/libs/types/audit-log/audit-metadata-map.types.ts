import {
	InviteLinkAuditMetadataMap,
	LinkAuditMetadataMap,
	RoleAuditMetadataMap,
	WorkspaceAuditMetadataMap,
	WorkspaceMembersAuditMetadataMap,
} from './audit-metadatas';

export type AuditMetadataMap = WorkspaceAuditMetadataMap &
	InviteLinkAuditMetadataMap &
	LinkAuditMetadataMap &
	RoleAuditMetadataMap &
	WorkspaceMembersAuditMetadataMap;
