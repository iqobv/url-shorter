'use client';

import { Form, Input } from '@/components/ui';
import { CreateLinkDto } from '@/dto';
import { createLinkSchema } from '@/schemas';
import { useTranslations } from 'next-intl';
import { CREATE_LINK_FIELDS } from './craeteLinkFields';

const CreateLink = () => {
	const t = useTranslations('links.create');

	return (
		<div>
			<Form<CreateLinkDto>
				schema={createLinkSchema}
				onSubmit={(data) => console.log(data)}
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
