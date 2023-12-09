<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import { ElButton, ElMessage, ElTable, ElTableColumn } from 'element-plus';
import { addWhitelist, removeWhitelist, getWhitelist } from '@/apis/user';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store';
import { isString } from '@/utils/types';
const tableData = ref<{ name: string }[]>([]);
const userStore = useUserStore();
const username = ref('');
function loadTableData() {
  getWhitelist({ qq: userStore.qq, token: userStore.token }).then(
    ({ data: { data } = {} }) => {
      if (isString(data)) {
        tableData.value = data.length
          ? data.split(',').map((v) => ({ name: v }))
          : [];
      }
    },
  );
}
function addUser() {
  addWhitelist({
    qq: userStore.qq,
    id: username.value,
    token: userStore.token,
  }).then(() => {
    username.value = '';
    ElMessage.success('添加成功');
    loadTableData();
  });
}
function removeUser(name: string) {
  removeWhitelist({
    id: name,
    qq: userStore.qq,
    token: userStore.token,
  }).then(() => {
    ElMessage.success('移除成功');
    loadTableData();
  });
}
onMounted(loadTableData);
</script>

<template>
  <div :class="commonStyle.contentArea" class="flex flex-col">
    <div class="mb-2">
      <ElInput v-model="username" @keyup.enter="addUser">
        <template #append>
          <ElButton @click="addUser">添加用户</ElButton>
        </template>
      </ElInput>
    </div>
    <ElTable class="flex-1" :data="tableData">
      <ElTableColumn label="用户名" prop="name" />
      <ElTableColumn label="操作" width="80">
        <template #default="{ row }">
          <ElLink type="primary" @click="removeUser(row.name)">删除</ElLink>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>
