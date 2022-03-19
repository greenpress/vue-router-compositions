import Vue from 'vue/types/umd';
import { getCurrentInstance } from '@vue/composition-api';

export function getVueInstance() {
  const instance = getCurrentInstance();
  if (instance?.proxy) {
    return instance.proxy;
  }
  throw new Error('Vue instance is missing');
}
