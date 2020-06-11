import { computed, ref, watch } from '@vue/composition-api';
import { getVueInstance } from './utils/vue-instance';
import { useDisposableCallback } from './utils/disposable-callback';


/**
 * get a reactive property from/to route query param
 * @param key
 * @param defaultValue
 * @param enumOptions
 */
export function useQueryParam(key: string, defaultValue: string = '', enumOptions?: string[]) {
  const { $router } = getVueInstance();

  const query = ref<string>(defaultValue);
  watch<string & any, true>(`$route.query.${key}`, (newVal: string) => {
    query.value = newVal || defaultValue
  });

  const {call, register} = useDisposableCallback()

  return {
    [key]: computed<string>({
      get: () => query.value,
      set: (value = defaultValue) => {
        if (enumOptions && !enumOptions.includes(value)) {
          return;
        }
        query.value = value;
        $router.push({
          query: {
            ...$router.currentRoute.query,
            [key]: value
          }
        }).then(() => call({ router: $router, route: $router.currentRoute, key, value }));
      }
    }),
    onQueryChange: register
  }

}
