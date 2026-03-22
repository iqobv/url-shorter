import api from './api.json';
import auth from './auth.json';
import dashboard from './dashboard/dashboard.json';
import links from './dashboard/links.json';
import role from './dashboard/role.json';
import workspaceMember from './dashboard/workspaceMember.json';
import form from './form.json';
import header from './header.json';
import home from './home.json';
import metadata from './metadata.json';
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
	metadata,
	role,
	shorten,
	workspaceMember,
	zod,
} as const;

export default en;
