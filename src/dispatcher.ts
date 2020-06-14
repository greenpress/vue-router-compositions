import { computed, ref, watch, WatchSource } from '@vue/composition-api';

export interface DispatchResult<T = any, SourceType = any> {
  source: WatchSource<SourceType>,
  loading: WatchSource<boolean>,
  result: WatchSource<T | null>,
  promise: WatchSource<Promise<T> | null>,
  error: WatchSource<Error | null>;
}

export type DispatchFunction<T, S> = (paramValue: S) => Promise<T>;

/**
 * create a reactive dispatcher from a given watch-source
 * @param {WatchSource} source
 * @param {DispatchFunction<T>} callback
 */
export function useDispatcher<T = any, SourceType = any>(
  source: WatchSource<SourceType>,
  callback: DispatchFunction<T, SourceType>
): DispatchResult<T, SourceType> {
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);
  const result = ref<T>();
  const promise = ref<Promise<T>>();

  watch(source, async (value) => {
    loading.value = true;
    try {
      result.value = (await (promise.value = callback(value)));
    } catch (err) {
      error.value = err;
    }
    loading.value = false;
  }, { immediate: true });

  return {
    source,
    loading: computed(() => loading.value),
    result: computed(() => result.value || null),
    promise: computed(() => promise.value || null),
    error: computed(() => error.value),
  };
}
