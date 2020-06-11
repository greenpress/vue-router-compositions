import { onUnmounted } from '@vue/composition-api';

export function useDisposableCallback() {

  let callback: Function | null = null;

  onUnmounted(() => callback = null)

  return {
    call<T>(payload: T) {
      callback && callback(payload);
    },
    register(cb: Function) {
      callback = cb;
    }
  }
}
