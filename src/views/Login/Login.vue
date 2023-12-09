<script setup lang="ts">
import LoginForm from './LoginForm.vue';
import { themeMap, switchTheme } from '@/utils/theme';
import { ref } from 'vue';
import { useStyleStore } from '@/store';
import { computed } from 'vue';

const styleStore = useStyleStore();
const bgMask = computed(() => (styleStore.theme == 'dark' ? 0.5 : 0));

const projectName = import.meta.env.APP_NAME;
const mode = ref<'login' | 'signup' | 'reset'>('login');
</script>

<template>
  <div class="login">
    <div class="min-w-80% flex justify-end z-2">
      <div class="login-box flex justify-center items-center flex-col">
        <div class="w-300px flex flex-col gap-3">
          <div class="font-bold text-3xl text-center">
            {{ projectName }}
          </div>
          <LoginForm v-show="mode === 'login'" />
        </div>
      </div>
    </div>
    <div class="absolute right-0 bottom-0 flex gap-3 m-3 z-2">
      <div
        v-for="(theme, key) of themeMap"
        :key="key"
        :style="{ background: theme.accentColor }"
        class="w-5 h-5 rounded-lg ring-3 ring-white ring-opacity-10 cursor-pointer"
        @click="switchTheme(key)"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/bg.webp');
  background-size: cover;

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
  }

  &::before {
    background:
      linear-gradient(
        to bottom right,
        #0000 50%,
        var(--el-bg-color-page) 120%
      );
  }

  &::after {
    background: black;
    opacity: v-bind('bgMask');
  }

  .login-box {
    background-color: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
    height: 500px;
    width: 400px;
    box-shadow: var(--el-box-shadow-lighter);
  }
}
</style>
