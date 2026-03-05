import { Prisma } from 'generated/prisma/client';

export type MemberWithRoles = Prisma.WorkspaceMemberGetPayload<{
	include: { roles: { include: { role: true } } };
}>;

export const calculatePermissions = (member: MemberWithRoles): string[] => {
	const rolePermissions = member.roles.flatMap((mr) => mr.role.permissions);
	const personalAllow = member.permissions.filter((p) => !p.startsWith('-'));
	const personalDeny = member.permissions
		.filter((p) => p.startsWith('-'))
		.map((p) => p.substring(1));

	const combinedPermissions = new Set([...rolePermissions, ...personalAllow]);

	for (const perm of personalDeny) {
		combinedPermissions.delete(perm);
	}

	return Array.from(combinedPermissions);
};
