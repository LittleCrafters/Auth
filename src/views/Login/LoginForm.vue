<script setup lang="ts">
import { ElButton, ElMessage } from 'element-plus';
import { ref } from 'vue';
import { generateToken, getWhitelist } from '@/apis/user';
import type { FormInstance, FormItemInstance, FormRules } from 'element-plus';
import { useUserStore } from '@/store';
import router from '@/router';
import { computed } from 'vue';

// 表单组件数据
const formRef = ref<FormInstance>();
const formRules: FormRules = {
  qq: {
    validator: (_rule, value, cb) => {
      if (value.length < 5 || value.length > 10) {
        cb('长度必须为5-10位');
      } else if (!/^\d*$/.test(value)) {
        cb('只允许使用数字');
      } else {
        cb();
      }
    },
    trigger: 'blur',
  },
  token: { required: true, message: '请输入Token', trigger: 'blur' },
};
const formData = ref({
  qq: import.meta.env.APP_QQ,
  token: import.meta.env.APP_TOKEN,
});
const qqNumber = computed(() => {
  const qq = formData.value.qq;
  return qq.length < 5 || qq.length > 10 ? 0 : qq;
});
// 验证码展示逻辑
const tokenAppend = ref('发送邮件');
const sendSmsDisabled = ref(false);
const tokenFormItemRef = ref<FormItemInstance>();
let tokenSetTimeout: ReturnType<typeof setTimeout>;
function updateTokenAppend(time = 60) {
  sendSmsDisabled.value = true;
  tokenAppend.value = `等待${time}秒`;
  const nextSecond = function () {
    tokenSetTimeout = setTimeout(() => updateTokenAppend(time - 1), 1000);
  };
  if (time === 0) {
    sendSmsDisabled.value = false;
    tokenAppend.value = '发送邮件';
  } else {
    nextSecond();
  }
}
// 获取验证码
async function sendSmsVerificationCode() {
  const valid = await formRef.value?.validateField('qq').catch(() => false);
  if (!valid && tokenFormItemRef.value) {
    tokenFormItemRef.value.validateState = 'error';
    tokenFormItemRef.value.validateMessage = '请先输入有效的QQ号码';
    return;
  }
  updateTokenAppend();
  generateToken({
    qq: formData.value.qq,
  })
    .then(() => {
      ElMessage.success('邮件发送成功');
    })
    .catch(() => {
      clearTimeout(tokenSetTimeout);
      updateTokenAppend(0);
    });
}
// 提交表单
async function submit() {
  await formRef.value?.validate();
  getWhitelist({
    qq: formData.value.qq,
    token: formData.value.token,
  }).then(() => {
    ElMessage.success('登录成功');
    const userStore = useUserStore();
    userStore.qq = formData.value.qq;
    userStore.token = formData.value.token;
    router.push('/');
  });
}
</script>

<template>
  <div class="w-full">
    <div class="avatar flex justify-center mb-5">
      <img
        class="w-60px rounded-1/2 border-2px border-solid border-$el-border-color"
        :src="`https://q1.qlogo.cn/g?b=qq&nk=${qqNumber}&s=5`"
      />
    </div>
    <ElForm
      ref="formRef"
      :model="formData"
      :rules="formRules"
      @keyup.enter="submit"
    >
      <ElFormItem prop="qq">
        <ElInput v-model="formData.qq" placeholder="请输入QQ号">
          <template #suffix>@qq.com</template>
        </ElInput>
      </ElFormItem>
      <ElFormItem ref="tokenFormItemRef" prop="token">
        <ElInput
          v-model="formData.token"
          maxlength="40"
          placeholder="请输入Token"
        >
          <template #append>
            <ElButton
              :disabled="sendSmsDisabled"
              @click="sendSmsVerificationCode()"
            >
              {{ tokenAppend }}
            </ElButton>
          </template>
        </ElInput>
      </ElFormItem>
    </ElForm>
    <ElButton type="primary" class="w-full" @click="submit">登录</ElButton>
  </div>
</template>
<style lang="scss" scoped>
.avatar {
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    transform: translateY(100%);
    width: 100%;
    height: 50%;
    z-index: -1;
    position: absolute;
    border-top: 1px var(--el-border-color) solid;
  }
}
</style>
