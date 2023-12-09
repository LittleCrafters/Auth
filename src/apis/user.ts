import http from '@/utils/http';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

// 登录管理 --------------------------------------------------
// 获取token
export async function generateToken(params: { qq: string }) {
  return http.get('/user/generate_token', { params });
}
// 添加白名单
export async function addWhitelist(params: {
  qq: string;
  token: string;
  id: string;
}) {
  return http.get('/user/add', { params });
}
// 移除白名单
export async function removeWhitelist(params: {
  qq: string;
  token: string;
  id: string;
}) {
  return http.get('/user/remove', { params });
}
// 获取白名单
export async function getWhitelist(params: { qq: string; token: string }) {
  return http.get('/user/list', { params });
}
