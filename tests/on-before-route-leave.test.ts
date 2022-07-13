import { mount, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router'

import { getLocalVue } from './utils/local-vue'
import { onBeforeRouteLeave } from '../src/on-before-route-leave'

describe('onBeforeRouteLeave', () => {
  it('triggers guard when leaving the route', async () => {
    expect.hasAssertions();
    const spy = jest.fn().mockImplementation(() => {
      console.log('i exec')
    });
    const localVue = getLocalVue();
    const Root = {
      render: (h: Function) => h('router-view')
    };
    const WithSpy = {
      render: (h: Function) => h('div', null, 'Component With Leave'),
      setup() {
        onBeforeRouteLeave(spy);
      }
    };
    const Generic = {
      render: (h: Function) => h('div', null, 'Another Component')
    };
    const router = new VueRouter({
      routes: [
        { path: '/leave', component: WithSpy as any },
        { path: '/', component: Generic as any }
      ]
    });
    const view = mount(Root, { localVue, router });
    await new Promise(resolve => router.onReady(resolve));
    await view.vm.$router.push('/leave');
    await view.vm.$router.push('/');
    expect(spy).toHaveBeenCalledTimes(1);
    await view.vm.$router.push('/leave');
    await view.vm.$router.push('/');
    expect(spy).toHaveBeenCalledTimes(2);
  })
})
