import { acceptHMRUpdate, defineStore } from 'pinia';
import { Profile } from './types';

export const useProfileStore = defineStore({
  id: 'profile',
  state: () => {
    const profiles = [] as Profile[];
    return {
      profiles,
      currentProfileKey: 0,
    };
  },
  getters: {
    currentProfile: (state) => {
      return state.profiles.find((e) => e.key === state.currentProfileKey);
    },
    currentProfileName: (state) => {
      return (
        state.profiles.find((e) => e.key === state.currentProfileKey)?.name ??
        ''
      );
    },
    currentProfileIndex: (state) => {
      return state.profiles.findIndex((e) => e.key === state.currentProfileKey);
    },
  },
  actions: {
    setCurrentProfileKey(index: number) {
      this.currentProfileKey = index;
    },
    addProfile(name: string) {
      const profile = {
        key: Date.now(),
        create: Date.now(),
        update: Date.now(),
        name,
        address: [],
      };
      this.profiles.push(profile);
    },
    editProfileName(key: number, name: string) {
      const index = this.profiles.findIndex((e) => e.key === key);
      this.profiles[index].name = name;
    },
    getProfile(profileKey: number) {
      return this.profiles.find((e) => e.key === profileKey);
    },
    editProfile(profile: Profile) {
      // key 不变，create 不变，其他改变
      const index = this.profiles.findIndex((e) => e.key === profile.key);
      this.profiles[index].address = profile.address;
      this.profiles[index].name = profile.name;
      this.profiles[index].update = Date.now();
    },
    removeProfile(key: number) {
      this.profiles.splice(
        this.profiles.findIndex((e) => e.key === key),
        1
      );
    },
    addAddress(profileKey: number, address: string) {
      const index = this.profiles.findIndex((e) => e.key === profileKey);
      if (index >= 0) {
        this.profiles[index].address.push(address);
      }
    },
    removeAddress(profileKey: number, addressIndex: number) {
      const index = this.profiles.findIndex((e) => e.key === profileKey);
      if (index >= 0) {
        this.profiles[index].address.splice(addressIndex, 1);
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_profiles',
        storage: localStorage,
        paths: ['profiles'],
      },
      {
        key: 'current_profile_key',
        storage: localStorage,
        paths: ['currentProfileKey'],
      },
    ],
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
