/**
 * 全局异常请求处理
 */
import { ElMessage } from 'element-plus';
import type { AxiosError } from 'axios';
import { useUserStore } from '@/store';
import router from '@/router';

export default async function (error: AxiosError) {
  const blob = error.response?.data as Blob;
  let message = '未知网络异常';
  if (blob.type === 'application/json') {
    message = JSON.parse(await blob.text()).reason;
    if (message == '验证错误') {
      const userStore = useUserStore();
      userStore.qq = '';
      userStore.token = '';
      router.push('/Login');
    }
  }
  ElMessage.error(message);
  throw error;
}
