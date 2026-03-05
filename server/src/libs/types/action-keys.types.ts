import { ACTION_KEYS } from '../constants';
import { DeepValue } from './deep-valur.types';

export type ActionKeys = DeepValue<typeof ACTION_KEYS, string>;
