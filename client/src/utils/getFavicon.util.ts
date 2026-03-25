export const getFavicon = (domain: string, size: number = 64): string => {
	return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
};
