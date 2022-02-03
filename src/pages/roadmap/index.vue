<template>
  <div class="container">
    <div class="panel">
      <a-row>
        <a-col :offset="6" :span="12">
          <a-space direction="vertical">
            <a-typography>
              <a-typography-title :heading="3"> 路线图 </a-typography-title>
              <a-typography-title :heading="6" delete>
                <a-checkbox :default-checked="true" disabled></a-checkbox>
                多账号汇总查看自己的账户存款信息
              </a-typography-title>
              <a-typography-title :heading="6" delete>
                <a-checkbox :default-checked="true" disabled></a-checkbox>
                多账号汇总查看是否已中奖
              </a-typography-title>
              <a-typography-title :heading="6" delete>
                <a-checkbox :default-checked="true" disabled></a-checkbox>
                INKer 存款信息分析图表
              </a-typography-title>
              <a-typography-title :heading="6">
                <a-checkbox :default-checked="false" disabled></a-checkbox>
                更新 UI / UX
              </a-typography-title>
              <a-typography-title :heading="6">
                <a-checkbox :default-checked="false" disabled></a-checkbox>
                团队参与中奖信息分析图表
              </a-typography-title>
              <a-typography-title :heading="6">
                <a-checkbox :default-checked="false" disabled></a-checkbox>
                ink-protocol 团队增加跳转入口
              </a-typography-title>
            </a-typography>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="less" scoped>
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  display: flex;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  width: 100%;
  padding: 16px 20px 36px 20px;
  overflow: auto;
}
</style>
