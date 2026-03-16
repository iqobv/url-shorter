'use client';

interface FormActionsProps {
	children: React.ReactNode;
	className?: string;
}

const FormActions = ({ children, className }: FormActionsProps) => {
	return <div className={className}>{children}</div>;
};

export default FormActions;
