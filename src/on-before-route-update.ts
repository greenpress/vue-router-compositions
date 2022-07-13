import Vue from 'vue';
import { NavigationGuard } from 'vue-router';
import { getVueInstance } from './utils/vue-instance';


export function onBeforeRouteUpdate(navigationGuardFn: NavigationGuard) {
  if (typeof navigationGuardFn === 'function') {
    const { $options } = getVueInstance();
    const strats = (Vue.config && Vue.config.optionMergeStrategies) || false;
    const mergeFn = (strats && strats.beforeRouteUpdate) || false;
    if (mergeFn) {
      $options.beforeRouteUpdate = mergeFn($options.beforeRouteUpdate, navigationGuardFn);
    } else {
      $options.beforeRouteUpdate = navigationGuardFn;
    }
  }
  return navigationGuardFn;
}
