'use client';

import { createLink } from '@/api';
import { Button, Input } from '@/components/ui';
import { CreateLinkDto } from '@/dto';
import { defaultLinkSchema } from '@/schemas';
import { useAddLink, useGetUser } from '@/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { FaLink } from 'react-icons/fa';

const CreateLink = () => {
	const t = useTranslations('shorten.shortenInput');

	const addLink = useAddLink();
	const user = useGetUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateLinkDto>({
		defaultValues: {
			originalUrl: '',
		},
		resolver: zodResolver(defaultLinkSchema),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (dto: CreateLinkDto) => createLink(dto),
		onSuccess: (data) => {
			if (!user) {
				addLink({
					id: data.id,
					originalUrl: data.originalUrl,
					slug: data.slug,
					claimToken: data.claimToken,
					createdAt: new Date(data.createdAt),
				});
			}
		},
	});

	return (
		<div>
			<form onSubmit={handleSubmit((data) => mutate(data))}>
				<Input
					placeholder={t('placeholder')}
					error={errors.originalUrl?.message}
					leftSection={<FaLink />}
					disabled={isPending}
					rightSection={
						<Button
							type="submit"
							isLoading={isPending}
							style={{
								height: '36px',
							}}
						>
							{t('button')}
						</Button>
					}
					{...register('originalUrl')}
				/>
			</form>
		</div>
	);
};

export default CreateLink;
