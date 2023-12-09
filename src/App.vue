<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCN from 'element-plus/es/locale/lang/zh-cn';
</script>
<template>
  <ElConfigProvider :locale="zhCN">
    <RouterView v-slot="{ Component }">
      <Transition name="fade-left">
        <component :is="Component" class="w-full" />
      </Transition>
    </RouterView>
  </ElConfigProvider>
</template>

<style lang="scss" scoped>
@use '@/styles/animate.scss';
</style>
