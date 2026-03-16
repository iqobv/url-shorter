import api from './api.json';
import auth from './auth.json';
import dashboard from './dashboard.json';
import form from './form.json';
import header from './header.json';
import home from './home.json';
import links from './links.json';
import role from './role.json';
import shorten from './shorten.json';
import zod from './zod.json';

const en = {
	api,
	auth,
	dashboard,
	form,
	header,
	home,
	links,
	role,
	shorten,
	zod,
} as const;

export default en;
