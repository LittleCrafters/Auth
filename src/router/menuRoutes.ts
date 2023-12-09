import type { RouteRecordRaw } from 'vue-router';
/**
 * 菜单路由信息
 */
export const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/UserInfo',
    meta: { title: '用户信息', icon: 'ep:user' },
    component: () => import('@/views/UserInfo'),
  },
];
