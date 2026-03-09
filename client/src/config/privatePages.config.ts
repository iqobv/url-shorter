export const PRIVATE_PAGES = {
	DASHBOARD: '/dashboard',
	DASHBOARD_WORKSPACE: (workspaceId: string) => `/dashboard/${workspaceId}`,
	LINKS: (workspaceId: string) => `/dashboard/${workspaceId}/links`,
	MEMBERS: (workspaceId: string) => `/dashboard/${workspaceId}/members`,
	ROLES: (workspaceId: string) => `/dashboard/${workspaceId}/roles`,
	NEW_LINK: (workspaceId: string) => `/dashboard/${workspaceId}/links/new`,
	LINK: (workspaceId: string, linkId: string) =>
		`/dashboard/${workspaceId}/links/${linkId}`,
	AUDIT_LOG: (workspaceId: string) => `/dashboard/${workspaceId}/audit`,
	SETTINGS: '/settings',
	ONBOARDING: '/onboarding',
} as const;
