// 主题相关函数, 变量, 类型
import { useStyleStore } from '@/store';
import nProgress from 'nprogress';
// 主题映射
export const themeMap = {
  default: {
    name: '默认主题',
    accentColor: '#409eff',
    background: 'white',
    color: '#409eff',
  },
  dark: {
    name: '夜间模式',
    accentColor: 'black',
    background: 'black',
    color: 'white',
  },
};
export type Theme = keyof typeof themeMap;
/**
 * 切换主题, 不传参即为初始化
 * @param theme 主题名称
 */
export function switchTheme(theme?: Theme) {
  const styleStore = useStyleStore();
  if (theme === undefined) {
    theme = styleStore.theme;
  } else {
    styleStore.theme = theme;
  }
  document.documentElement.dataset.theme = theme;
  if (theme !== 'default') {
    nProgress.start();
    import(`@/styles/theme/${theme}.scss`).then(nProgress.done);
  }
}
