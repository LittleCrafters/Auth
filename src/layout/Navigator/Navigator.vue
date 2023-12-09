<script setup lang="ts">
import { useUserStore, useStyleStore } from '@/store';
import { Icon } from '@iconify/vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import router from '@/router';
import { themeMap, switchTheme } from '@/utils/theme';
const userStore = useUserStore();
const projectName = import.meta.env.APP_NAME;
const styleStore = useStyleStore();
async function logout() {
  userStore.qq = '';
  userStore.token = '';
  router.push('/Login');
}
</script>
<template>
  <nav class="navigator">
    <div
      v-show="styleStore.deviceMode === 'mobild'"
      @click="styleStore.sidebarToggle"
    >
      <Transition name="flip" mode="out-in">
        <Icon
          :key="styleStore.sidebarVisible.toString()"
          :icon="styleStore.sidebarVisible ? 'ep:fold' : 'ep:expand'"
          width="20"
          class="mx-1"
        />
      </Transition>
    </div>
    <RouterLink
      v-show="styleStore.deviceMode === 'pc'"
      to="/"
      class="project-name"
    >
      {{ projectName }}
    </RouterLink>
    <div class="flex items-center">
      <ElDropdown trigger="click">
        <span class="el-dropdown-link">
          <div class="navigator-action">
            <img
              class="w-10 rounded-1/2"
              :src="`https://q1.qlogo.cn/g?b=qq&nk=${userStore.qq}&s=40`"
            />
            <span v-show="styleStore.deviceMode !== 'mobild'">
              {{ userStore.qq }}
            </span>
          </div>
        </span>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdown placement="left" trigger="click">
              <div><ElDropdownItem>切换主题</ElDropdownItem></div>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem
                    v-for="(theme, key) of themeMap"
                    :key="key"
                    @click="switchTheme(key)"
                  >
                    {{ theme.name }}
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
            <ElDropdownItem divided @click="logout">退出登录</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </nav>
</template>
<style scoped lang="scss">
@use '@/styles/animate.scss';

.navigator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 0;
  padding: 10px;

  .project-name {
    font-size: xx-large;
    text-decoration: none;
    color: var(--el-color-primary);
  }

  .navigator-action {
    display: flex;
    align-items: center;

    > * {
      margin: 0 0.5rem;
    }
  }
}
</style>
