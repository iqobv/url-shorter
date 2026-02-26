import { useUserStore } from '@/stores';
import { IApiErrorResponse } from '@/types';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface FailedRequest {
	resolve: (token?: string | null) => void;
	reject: (error: unknown) => void;
}

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (
	error: AxiosError | Error | null,
	token: string | null = null,
) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		const isLoginRequest = originalRequest.url?.includes('/auth/login');
		const isRegisterRequest = originalRequest.url?.includes('/auth/register');

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!isLoginRequest &&
			!isRegisterRequest
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then(() => api(originalRequest))
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
					{},
					{ withCredentials: true },
				);

				isRefreshing = false;
				processQueue(null);

				return api(originalRequest);
			} catch (refreshError) {
				isRefreshing = false;
				processQueue(
					refreshError instanceof Error
						? refreshError
						: new Error('Refresh failed'),
				);

				useUserStore.getState().logout();

				if (typeof window !== 'undefined') {
					window.dispatchEvent(new Event('unauthorized'));
				}
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => response,
	(error: AxiosError<IApiErrorResponse>) => {
		if (error.response?.data) {
			return Promise.reject(error.response.data);
		}

		return Promise.reject({
			code: 'SERVER_ERROR',
			message: error.message || 'An unexpected error occurred',
			statusCode: 500,
		});
	},
);

export default api;
