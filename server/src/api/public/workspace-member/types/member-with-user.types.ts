import { Prisma, WorkspaceMember } from '@generated/prisma/client';
import { publicUserSelect } from '@libs/prisma';

export type MemberWithUser = WorkspaceMember &
	Prisma.WorkspaceMemberGetPayload<{
		include: { user: { select: typeof publicUserSelect } };
	}>;
