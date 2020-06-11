import Vue from 'vue/types/umd';
import { getCurrentInstance } from '@vue/composition-api';

export function getVueInstance(): Vue {
  const instance = getCurrentInstance();
  if (instance) {
    return instance;
  }
  throw new Error('Vue instance is missing');
}
