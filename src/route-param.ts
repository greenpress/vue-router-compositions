import { getVueInstance } from './utils/vue-instance';
import { computed } from '@vue/composition-api';
import { useDisposableCallback } from './utils/disposable-callback';


export function useRouteParam(key: string) {
  const { $root, $router } = getVueInstance();

  const { call, register } = useDisposableCallback();


  return {
    [key]: computed<string>({
      get: () => $root.$route.params[key],
      set: (value) => {
        $router.push({
          query: {
            ...$router.currentRoute.query,
            [key]: value
          }
        }).then(() => call({ router: $router, route: $router.currentRoute, key, value }));
      }
    }),
    onParamChange: register
  };
}
