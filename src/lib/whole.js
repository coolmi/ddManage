/**
 * Created by lzl on 17/2/14.
 */
import store from '../store/index'

export function showMore() {
  store.dispatch('showMore', true);
}

export function showTop(str) {
  store.dispatch('showTopMessage', true);
  store.dispatch('topMessage', str);
}

/**
 *   页面正在请求
 */
export function busy() {
  store.dispatch('isLoading', true);
}

/**
 *   页面请求结束
 */
export function leave() {
  store.dispatch('isLoading', false);
}

export default {
  showMore,
  showTop,
  busy,
  leave
}
