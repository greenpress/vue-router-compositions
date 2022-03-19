import Vue from 'vue/types/umd';
import { NavigationGuard } from 'vue-router';
import { getVueInstance } from './utils/vue-instance';


export function onBeforeRouteUpdate(navigationGuard: NavigationGuard) {
  const { $options } = getVueInstance();
  const mergeFn = Vue.config.optionMergeStrategies.beforeRouteUpdate;
  $options.beforeRouteUpdate = mergeFn($options.beforeRouteUpdate, navigationGuard)
  return navigationGuard
}
