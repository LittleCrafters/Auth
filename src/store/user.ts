import { defineStore } from 'pinia';
import { useStorage } from '@/utils/storage';
import pinia from './pinia';

/**
 * 样式相关信息
 */
export function useUserStore() {
  return defineStore('user', {
    state: () => {
      return useStorage('userInfo', {
        qq: '',
        token: '',
      });
    },
  })(pinia);
}
