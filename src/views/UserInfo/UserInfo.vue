<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import {
  ElButton,
  ElMessage,
  ElTable,
  ElTableColumn,
  FormInstance,
  FormRules,
  ElInput,
} from 'element-plus';
import { addWhitelist, removeWhitelist, getWhitelist } from '@/apis/user';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store';
import { isString } from '@/utils/types';
const tableData = ref<{ name: string }[]>([]);
const userStore = useUserStore();

// 表单数据
const formRef = ref<FormInstance>();
const idRef = ref<InstanceType<typeof ElInput>>();
const formData = ref({ id: '' });
const formRules: FormRules = {
  id: {
    validator(_rule, value = '', cb) {
      if (value.length < 2 || value.length > 16) {
        cb('长度必须为2-16位');
      } else if (!/^\w*$/.test(value)) {
        cb('只允许使用字母，数字，特殊符号_');
      }
      cb();
    },
  },
};
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
async function addUser() {
  idRef.value?.focus();
  await formRef.value?.validate();
  addWhitelist({
    qq: userStore.qq,
    id: formData.value.id,
    token: userStore.token,
  }).then(() => {
    formData.value.id = '';
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
    <ElForm ref="formRef" :model="formData" :rules="formRules">
      <ElFormItem prop="id">
        <ElInput
          ref="idRef"
          v-model="formData.id"
          placeholder="请输入用户名"
          :validate-event="false"
          @keyup.enter="addUser"
          @blur="formRef?.clearValidate()"
        >
          <template #append>
            <ElButton @click="addUser()">添加用户</ElButton>
          </template>
        </ElInput>
      </ElFormItem>
    </ElForm>
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
