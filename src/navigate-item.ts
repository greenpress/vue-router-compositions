import { getVueInstance } from './utils/vue-instance';


export function useNavigateItem<T, K extends keyof T>(routeName: string, paramName: string, paramItemKey: K) {
  const { $router } = getVueInstance();

  return {
    navigateItem: (item: T & { [key in K]: string }) => {
      const value = item[paramItemKey];
      return $router.push({
        name: routeName,
        params: {
          [paramName]: value
        }
      });
    }
  }

}
