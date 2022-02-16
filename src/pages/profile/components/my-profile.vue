<template>
  <div>
    <a-card class="general-card" :title="$t('userInfo.myProfiles')">
      <template #extra>
        <a-button type="primary" shape="round" @click="handleAddProfileClick">
          <template #icon>
            <icon-plus />
          </template>
          <!-- Use the default slot to avoid extra spaces -->
          <template #default>{{ $t('userInfo.addProfile') }}</template>
        </a-button>
      </template>
      <a-row :gutter="16">
        <a-col
          v-for="profile in profileStore.profiles"
          :key="profile.key"
          :span="12"
          :gutters="20"
          class="my-project-item"
        >
          <a-card
            :title="`${profile.name}(${profile.address?.length ?? 0})`"
            :bordered="true"
            :hoverable="true"
            class="card-animation"
          >
            <template #extra>
              <a-space>
                <a-button
                  type="primary"
                  shape="round"
                  size="mini"
                  @click="openCheckProfile(profile.key)"
                  >{{ $t('myProfiles.profileCard.checkAwards') }}</a-button
                >
                <a-button
                  type="outline"
                  shape="round"
                  size="mini"
                  @click="handleAddAccountClick(profile.key)"
                  >{{ $t('myProfiles.profileCard.addAccount') }}</a-button
                >
                <a-dropdown @select="handleDropdown">
                  <icon-more-vertical size="18" />
                  <template #content>
                    <a-doption
                      :value="{
                        key: profile.key,
                        name: profile.name,
                        action: 'Edit',
                      }"
                      >{{ $t('myProfiles.dropdown.optoin.edit') }}</a-doption
                    >
                    <a-doption
                      :value="{
                        key: profile.key,
                        name: profile.name,
                        action: 'Delete',
                      }"
                      >{{ $t('myProfiles.dropdown.optoin.delete') }}</a-doption
                    >
                  </template>
                </a-dropdown>
              </a-space>
            </template>
            <a-list :max-height="300" :bordered="false">
              <a-list-item
                v-for="(address, aIndex) in profile.address"
                :key="aIndex"
                ><a-row>
                  <a-col :span="2"
                    ><a-avatar
                      :style="{ backgroundColor: '#C091F2', marginTop: '8px' }"
                      :size="15"
                      >{{ aIndex + 1 }}</a-avatar
                    ></a-col
                  >
                  <a-col :span="20">
                    <a-space align="center" style="margin-top: 5px">
                      <span>{{ address }}</span>
                      <!-- <a-button type="text">
                        <template #icon>
                          <icon-tags />
                        </template>
                      </a-button> -->
                    </a-space>
                  </a-col>
                  <a-col :span="2"
                    ><a-popconfirm
                      :ok-text="$t('myProfiles.modal.ok')"
                      :cancel-text="$t('myProfiles.modal.cancel')"
                      :content="$t('myProfiles.popconfirm.content')"
                      @ok="deleteAccount(profile.key, aIndex)"
                    >
                      <a-button type="text">
                        <template #icon>
                          <icon-delete />
                        </template>
                      </a-button>
                    </a-popconfirm>
                  </a-col>
                </a-row>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <a-modal v-model:visible="addProfileVisible" :width="700" :footer="false">
      <template #title>
        {{ $t('myProfiles.modal.editProfile.title') }}
      </template>
      <div>
        <a-row>
          <a-col :span="20" :offset="3">
            <a-form
              ref="addProfileFormRef"
              :model="addProfileFormData"
              :style="{ width: '100%', height: '100%' }"
            >
              <a-form-item
                field="name"
                :label="$t('myProfiles.modal.editProfile.name')"
                :rules="[
                  {
                    required: true,
                    message: $t('myProfiles.modal.addProfile.rule.required'),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-input
                  v-model="addProfileFormData.name"
                  :placeholder="
                    $t('myProfiles.modal.addProfile.placehoder.profileName')
                  "
                />
              </a-form-item>
              <a-form-item>
                <a-button @click="handleAddProfileOk">{{
                  $t('myProfiles.modal.editProfile.submit')
                }}</a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </a-modal>
    <a-modal v-model:visible="addAccountVisible" :width="700" :footer="false">
      <template #title>{{ $t('myProfiles.profileCard.addAccount') }}</template>
      <div>
        <a-row>
          <a-col :span="18" :offset="3">
            <a-form
              ref="addAccountFormRef"
              :model="accountForm"
              :style="{ width: '100%', height: '100%' }"
            >
              <a-form-item
                field="account"
                :label="$t('myProfiles.modal.addAccount.label')"
                :rules="[
                  { required: true, message: $t('myProfiles.modal.addAccount.rule.required') },
                  {
                    length: 44,
                    message: $t('myProfiles.modal.addAccount.rule2.required'),
                  },
                  {
                    validator: (value:string, cb:Function) => {
                      if (value.startsWith('terra')) {
                        cb();
                      } else {
                        cb($t('myProfiles.modal.addAccount.rule3.required')
                        );
                      }
                    },
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-input
                  v-model="accountForm.account"
                  :placeholder="
                    $t('myProfiles.modal.addProfile.placehoder.account')
                  "
                />
              </a-form-item>
              <a-form-item>
                <a-button @click="handleAddAccountOk">{{
                  $t('myProfiles.modal.editProfile.submit')
                }}</a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </a-modal>
    <a-modal
      v-model:visible="deleteVisible"
      :ok-text="$t('myProfiles.modal.ok')"
      :cancel-text="$t('myProfiles.modal.cancel')"
      @ok="handleDeleteOk"
      @cancel="handleDeleteCancel"
    >
      <div>{{ $t('myProfiles.isDelete') }}</div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useProfileStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const profileStore = useProfileStore();
    const addProfileVisible = ref(false);
    const addAccountVisible = ref(false);
    const deleteVisible = ref(false);
    const addProfileFormRef = ref<FormInstance>();
    const addAccountFormRef = ref<FormInstance>();
    const editProfileKey = ref(0);
    const action = ref('');
    const addProfileFormData = ref({
      name: '',
    });
    const accountForm = ref({
      account: '',
    });
    const addresses = ref([] as string[]);

    const resetEditProfileKey = () => {
      editProfileKey.value = 0;
    };
    const handleAddProfileClick = async () => {
      resetEditProfileKey();
      action.value = 'Add';
      await addProfileFormRef.value?.resetFields();
      addProfileVisible.value = true;
    };
    const handleAddProfileOk = async () => {
      const res = await addProfileFormRef.value?.validate();
      if (!res) {
        if (action.value === 'Edit') {
          profileStore.editProfileName(
            editProfileKey.value,
            addProfileFormData.value.name
          );
          resetEditProfileKey();
        } else if (action.value === 'Add') {
          profileStore.addProfile(addProfileFormData.value.name);
        }
        addProfileVisible.value = false;
      }
    };
    const handleDeleteClick = () => {
      deleteVisible.value = true;
    };
    const handleDeleteOk = () => {
      profileStore.removeProfile(editProfileKey.value);
      resetEditProfileKey();
      deleteVisible.value = false;
    };
    const handleDeleteCancel = () => {
      deleteVisible.value = false;
    };

    const setEditProfileInfo = async (key: number, name: string) => {
      await addProfileFormRef.value?.resetFields();
      action.value = 'Edit';
      editProfileKey.value = key;
      addProfileFormData.value.name = name;
    };
    const handleDropdown = (v: any) => {
      console.log(v);
      if (v.action === 'Edit') {
        setEditProfileInfo(v.key, v.name);
        addProfileVisible.value = true;
      } else if (v.action === 'Delete') {
        editProfileKey.value = v.key;
        handleDeleteClick();
      }
    };

    const handleAddAccountClick = async (key: number) => {
      await addAccountFormRef.value?.resetFields();
      editProfileKey.value = key;
      addAccountVisible.value = true;
    };
    const handleAddAccountOk = async () => {
      const res = await addAccountFormRef.value?.validate();
      if (!res) {
        profileStore.addAddress(
          editProfileKey.value,
          accountForm.value.account
        );

        addAccountVisible.value = false;
      }
    };
    const handleAddAccountCancel = () => {
      addAccountVisible.value = false;
    };

    const deleteAccount = (profileKey: number, index: number) => {
      profileStore.removeAddress(profileKey, index);
    };

    const openCheckProfile = (key: number) => {
      profileStore.setCurrentProfileKey(key);
      router.push({
        name: 'checkProfile',
      });
    };

    return {
      profileStore,
      addresses,
      addProfileFormRef,
      addProfileFormData,
      accountForm,
      addAccountFormRef,
      addProfileVisible,
      handleDropdown,
      handleAddProfileClick,
      handleAddProfileOk,
      handleDeleteOk,
      handleDeleteCancel,
      deleteVisible,
      addAccountVisible,
      handleAddAccountClick,
      handleAddAccountOk,
      handleAddAccountCancel,
      deleteAccount,
      openCheckProfile,
    };
  },
});
</script>

<style scoped lang="less">
:deep(.arco-card-body) {
  min-height: 300px;
  padding-bottom: 0;
}
.my-project {
  &-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &-title {
    margin-top: 0 !important;
    margin-bottom: 18px !important;
  }

  &-list {
    display: flex;
    justify-content: space-between;
  }

  &-item {
    // padding-right: 16px;
    margin-bottom: 16px;

    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
