<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '17px 20px 21px 20px' }"
    >
      <template #title> 中奖信息 </template>

      <a-table
        :data="account"
        :pagination="false"
        :bordered="false"
        :split="false"
      >
        <template #columns>
          <a-table-column title="序号" data-index="index"> </a-table-column>
          <a-table-column title="账号" data-index="address"> </a-table-column>
        </template>
      </a-table>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useLoading from '@/hooks/loading';

export default defineComponent({
  setup(props) {
    const { loading } = useLoading();
    const account = [
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
      //   { index: 1, address: '4729874283fahfjkahfkjfkjflkjfak' },
    ];
    return {
      loading,
      account,
    };
  },
});
</script>

<style scoped lang="less">
.general-card {
  min-height: 188px;
}
:deep(.arco-table-tr) {
  height: 44px;
  .arco-typography {
    margin-bottom: 0;
  }
}
.increases-cell {
  display: flex;
  align-items: center;
  span {
    margin-right: 4px;
  }
}
</style>
