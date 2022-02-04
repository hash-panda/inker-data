import { createPinia } from 'pinia';
import { useAppStore } from './modules/app';
import { useUserStore } from './modules/user';
import { useProfileInfoState } from './modules/profileInfo';

const pinia = createPinia();

export { useAppStore, useUserStore, useProfileInfoState };
export default pinia;
