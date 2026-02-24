'use client';

import { useTheme } from 'next-themes';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

const ToastProvider = ({ children }: PropsWithChildren) => {
	const { resolvedTheme } = useTheme();

	return (
		<>
			{children}
			<ToastContainer
				position="top-right"
				autoClose={5000}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				stacked
				theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
			/>
		</>
	);
};

export default ToastProvider;
