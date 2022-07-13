import Vue from 'vue';
import { NavigationGuard } from 'vue-router';
import { getVueInstance } from './utils/vue-instance';


export function onBeforeRouteLeave(navigationGuardFn: NavigationGuard) {
  if (typeof navigationGuardFn === 'function') {
    const vm = getVueInstance();
    const strats = (Vue.config && Vue.config.optionMergeStrategies) || false;
    const mergeFn = (strats && strats.beforeRouteLeave) || false;
    if (mergeFn) {
      vm.$options.beforeRouteLeave = mergeFn(vm.$options.beforeRouteLeave, navigationGuardFn);
    } else {
      vm.$options.beforeRouteLeave = navigationGuardFn.bind(vm);
    }
  }
  return navigationGuardFn;
}
