import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';
import { useAppStore } from './modules/app';
import { useUserStore } from './modules/user';
import { useProfileInfoState } from './modules/profileInfo';
import { useProfileStore } from './modules/profile';

const pinia = createPinia();
pinia.use(piniaPluginPersist);

export { useAppStore, useUserStore, useProfileInfoState, useProfileStore };
export default pinia;
