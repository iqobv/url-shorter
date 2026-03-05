import { PERMISSIONS as PERMISSIONS_LIST } from '../constants';
import { DeepValue } from './deep-valur.types';

export type Permissions = DeepValue<typeof PERMISSIONS_LIST, string>;
