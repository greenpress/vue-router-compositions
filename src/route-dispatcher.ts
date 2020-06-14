import { WritableComputedRef } from '@vue/composition-api/dist/apis/computed';
import { useRouteParam } from './route-param';
import { DispatchFunction, useDispatcher } from './dispatcher';

/**
 * create a reactive dispatcher from a router param
 * @param {string} paramName
 * @param {DispatchFunction<T, string>} callback
 */
export function useRouteDispatcher<T = any>(paramName: string, callback: DispatchFunction<T, string>) {
  const param = useRouteParam(paramName)[paramName] as WritableComputedRef<string>;
  const { loading, result, error, promise } = useDispatcher(param, callback);

  return {
    param,
    loading,
    result,
    error,
    promise
  }
}
