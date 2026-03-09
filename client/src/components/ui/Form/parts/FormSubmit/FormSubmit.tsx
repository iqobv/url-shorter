'use client';

import Button from '@/components/ui/Button/Button';

interface FormSubmitProps {
	children: React.ReactNode;
}

const FormSubmit = ({ children }: FormSubmitProps) => {
	return <Button type="submit">{children}</Button>;
};

export default FormSubmit;
