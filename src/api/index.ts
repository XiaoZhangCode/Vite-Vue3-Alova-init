import { createAlova } from 'alova';
import vueHook from 'alova/vue';
import { createApis, withConfigType } from './createApis';
import { axiosRequestAdapter } from '@alova/adapter-axios'
import axiosInstance from '../utils/request.ts';

export const alovaInstance = createAlova({
  baseURL: 'http://localhost:8080/api',
  statesHook: vueHook,
  requestAdapter: axiosRequestAdapter({
    axios:axiosInstance,
  }),
  // 设置为null即可全局关闭全部请求缓存
  cacheFor: null,
  responded: res => {
    return res.data;
  }
});

export const $$userConfigMap = withConfigType({});

const Apis = createApis(alovaInstance, $$userConfigMap);

export default Apis;
