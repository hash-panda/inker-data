<template>
  <div>
    <a-card class="general-card" :title="$t('userInfo.myProfiles')">
      <template #extra>
        <a-button type="primary" shape="round" @click="handleClick">
          <template #icon>
            <icon-plus />
          </template>
          <!-- Use the default slot to avoid extra spaces -->
          <template #default>{{ $t('userInfo.addProfile') }}</template>
        </a-button>
      </template>
      <a-row :gutter="16">
        <a-col
          v-for="(project, index) in projectList"
          :key="index"
          :span="12"
          :gutters="20"
          class="my-project-item"
        >
          <a-card title="Arco Card" :bordered="true" :hoverable="true">
            <template #extra>
              <a-space>
                <a-button type="primary" shape="round" size="mini"
                  >Check Awards</a-button
                >
                <a-button
                  type="outline"
                  shape="round"
                  size="mini"
                  @click="handleAddAccountClick"
                  >Add Account</a-button
                >
                <a-dropdown @select="handleDropdown">
                  <icon-more-vertical size="18" />
                  <template #content>
                    <a-doption
                      :value="{ key: 1, name: 'Arco Card', action: 'Edit' }"
                      >Edit</a-doption
                    >
                    <a-doption
                      :value="{ key: 1, name: 'Arco Card', action: 'Delete' }"
                      >Delete</a-doption
                    >
                  </template>
                </a-dropdown>
              </a-space>
            </template>
            <a-list :max-height="300" :bordered="false">
              <a-list-item v-for="(item, aIndex) in data" :key="aIndex"
                ><a-row>
                  <a-col :span="2"
                    ><a-avatar
                      :style="{ backgroundColor: '#C091F2', marginTop: '8px' }"
                      :size="15"
                      >{{ aIndex + 1 }}</a-avatar
                    ></a-col
                  >
                  <a-col :span="20">
                    <a-space align="center">
                      <span>{{ item.address }}</span>
                      <a-button type="text">
                        <template #icon>
                          <icon-tags />
                        </template>
                      </a-button>
                    </a-space>
                  </a-col>
                  <a-col :span="2"
                    ><a-popconfirm content="Are you sure you want to delete?">
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
    <a-modal
      v-model:visible="addProfileVisible"
      :width="700"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <template #title> Edit Profile </template>
      <div>
        <a-row>
          <a-col :span="18" :offset="3">
            <a-form :model="form" :style="{ width: '100%', height: '100%' }">
              <a-form-item field="name" label="Profile Name">
                <a-input
                  v-model="form.name"
                  placeholder="please enter your profile name..."
                />
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </a-modal>
    <a-modal
      v-model:visible="addAccountVisible"
      :width="700"
      @ok="handleAddAccountOk"
      @cancel="handleAddAccountCancel"
    >
      <template #title> Add Account </template>
      <div>
        <a-row>
          <a-col :span="18" :offset="3">
            <a-form
              :model="accountForm"
              :style="{ width: '100%', height: '100%' }"
            >
              <a-form-item field="account" label="Account">
                <a-input
                  v-model="accountForm.account"
                  placeholder="please enter your account address..."
                />
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </a-modal>
    <a-modal
      v-model:visible="deleteVisible"
      @ok="handleDeleteOk"
      @cancel="handleDeleteCancel"
    >
      <div>是否删除？</div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { queryMyProjectList, MyProjectRecord } from '@/api/user-center';
import useRequest from '@/hooks/request';

export default defineComponent({
  setup() {
    const defaultValue = Array(1).fill({} as MyProjectRecord);
    const { loading, response: projectList } = useRequest<MyProjectRecord[]>(
      queryMyProjectList,
      defaultValue
    );
    const addProfileVisible = ref(false);
    const addAccountVisible = ref(false);
    const deleteVisible = ref(false);
    const form = ref({
      name: '',
    });
    const accountForm = ref({
      account: '',
    });
    const data = [
      {
        key: '1',
        address: 'terra1dfu88cvcrx7tq646500zudjgyw4r9gg0s9m6jn23',
      },
      {
        key: '2',
        address: 'terra1dfu88cvcrx7tq646500zudjgyw4r9gg0s9m6jn',
      },
      {
        key: '3',
        address: 'terra1dfu88cvcrx7tq646500zudjgyw4r9gg0s9m6jn232',
      },
      {
        key: '4',
        address: 'terra1dfu88cvcrx7tq646500zudjgyw4r9gg0s9m6jn1',
      },
      {
        key: '5',
        address: 'terra1dfu88cvcrx7tq646500zudjgyw4r9gg0s9m6jn',
      },
      {
        key: '6',
        address: 'terra1dfu88cvcrx7tq646500zudjgyw4r9gg0s9m6jn',
      },
      {
        key: '7',
        address: 'terra1dfu88cvcrx7tq646500zudjgyw4r9gg0s9m6jn',
      },
      {
        key: '8',
        address: 'terra1dfu88cvcrx7tq646500zudjgyw4r9gg0s9m6jn',
      },
      {
        key: '9',
        address: 'terra1dfu88cvcrx7tq646500zudjgyw4r9gg0s9m6jn',
      },
    ];
    const handleClick = () => {
      addProfileVisible.value = true;
    };
    const handleOk = () => {
      addProfileVisible.value = false;
    };
    const handleCancel = () => {
      addProfileVisible.value = false;
    };
    const handleDeleteClick = () => {
      deleteVisible.value = true;
    };
    const handleDeleteOk = () => {
      deleteVisible.value = false;
    };
    const handleDeleteCancel = () => {
      deleteVisible.value = false;
    };

    const handleDropdown = (v: any) => {
      console.log(v);
      if (v.action === 'Edit') {
        handleClick();
      } else if (v.action === 'Delete') {
        handleDeleteClick();
      }
    };
    const handleFormAdd = () => {
      form.value.posts.push({
        value: '',
      });
    };
    const handleFormDelete = (index: number) => {
      form.value.posts.splice(index, 1);
    };

    const handleAddAccountClick = () => {
      addAccountVisible.value = true;
    };
    const handleAddAccountOk = () => {
      addAccountVisible.value = false;
    };
    const handleAddAccountCancel = () => {
      addAccountVisible.value = false;
    };

    return {
      loading,
      projectList,
      data,
      form,
      accountForm,
      addProfileVisible,
      handleDropdown,
      handleClick,
      handleOk,
      handleCancel,
      handleDeleteOk,
      handleDeleteCancel,
      deleteVisible,
      handleFormAdd,
      handleFormDelete,
      addAccountVisible,
      handleAddAccountClick,
      handleAddAccountOk,
      handleAddAccountCancel,
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
