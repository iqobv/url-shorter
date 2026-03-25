'use client';

import { createLink } from '@/api';
import { Form, Input } from '@/components/ui';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { CreateAuthorizedLinkDto, CreateLinkDto } from '@/dto';
import { useWorkspaceId } from '@/hooks';
import { useRouter } from '@/i18n';
import { defaultLinkSchema } from '@/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { CREATE_LINK_FIELDS } from './craeteLinkFields';

const CreateLink = () => {
	const workspaceId = useWorkspaceId();
	const router = useRouter();
	const queryClient = useQueryClient();

	const t = useTranslations('links.create');

	const { mutate } = useMutation({
		mutationFn: (data: CreateAuthorizedLinkDto) => createLink(data),
		mutationKey: QUERY_KEYS.LINK.CREATE(workspaceId),
		onSuccess: () => {
			router.push(PRIVATE_PAGES.LINKS(workspaceId));
			queryClient.refetchQueries({
				queryKey: QUERY_KEYS.LINK.ALL(
					workspaceId,
					{ pageIndex: 0, pageSize: 20 },
					[
						{
							id: 'createdAt',
							desc: true,
						},
					],
				),
			});
		},
	});

	return (
		<div>
			<Form<CreateLinkDto>
				schema={defaultLinkSchema}
				onSubmit={(data) => mutate({ ...data, workspaceId })}
			>
				{CREATE_LINK_FIELDS.map((field) => (
					<Form.Field<CreateLinkDto>
						name={field.name}
						key={field.name}
					>
						<Form.Label htmlFor={field.name}>
							{t(field.label as never)}
						</Form.Label>
						<Input
							placeholder={t(field.placeholder as never)}
							id={field.name}
						/>
					</Form.Field>
				))}
				<Form.Submit>{t('createButton')}</Form.Submit>
			</Form>
		</div>
	);
};

export default CreateLink;
