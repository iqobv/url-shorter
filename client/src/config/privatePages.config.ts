export const PRIVATE_PAGES = {
	DASHBOARD: '/dashboard',
	DASHBOARD_WORKSPACE: (workspaceId: string) => `/dashboard/${workspaceId}`,
	LINKS: (workspaceId: string) => `/dashboard/${workspaceId}/links`,
	MEMBERS: (workspaceId: string) => `/dashboard/${workspaceId}/members`,
	MEMBER: (workspaceId: string, memberId: string) =>
		`/dashboard/${workspaceId}/members/${memberId}`,
	ROLES: (workspaceId: string) => `/dashboard/${workspaceId}/roles`,
	NEW_ROLE: (workspaceId: string) => `/dashboard/${workspaceId}/roles/new`,
	ROLE: (workspaceId: string, roleId: string) =>
		`/dashboard/${workspaceId}/roles/${roleId}`,
	LINK: (workspaceId: string, linkId: string) =>
		`/dashboard/${workspaceId}/links/${linkId}`,
	NEW_LINK: (workspaceId: string) => `/dashboard/${workspaceId}/links/new`,
	AUDIT_LOG: (workspaceId: string) => `/dashboard/${workspaceId}/audit`,
	SETTINGS: '/settings',
	ONBOARDING: '/onboarding',
} as const;
