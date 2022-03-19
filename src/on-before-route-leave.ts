import Vue from 'vue/types/umd';
import { NavigationGuard } from 'vue-router';
import { getVueInstance } from './utils/vue-instance';


export function onBeforeRouteLeave(navigationGuard: NavigationGuard) {
  const { $options } = getVueInstance();
  const mergeFn = Vue.config.optionMergeStrategies.beforeRouteLeave;
  $options.beforeRouteLeave = mergeFn($options.beforeRouteLeave, navigationGuard)
  return navigationGuard
}
