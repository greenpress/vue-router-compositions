import { mount, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router'

import { getLocalVue } from './utils/local-vue'
import { onBeforeRouteUpdate } from '../src/on-before-route-update'

describe('onBeforeRouteUpdate', () => {
  it('triggers guard when updating the route', async () => {
    expect.hasAssertions();
    const spy = jest.fn().mockImplementation(() => {
      console.log('i exec');
    });
    const localVue = getLocalVue();
    const RootWithSpy = {
      render: (h: Function) => h('router-view'),
      setup() {
        onBeforeRouteUpdate(spy);
      }
    };
    const WithSpy = {
      render: (h: Function) => h('div', null, 'Component With Spy'),
      setup() {
        onBeforeRouteUpdate(spy);
      }
    };
    const Generic = {
      render: (h: Function) => h('div', null, 'Another Component')
    };
    const router = new VueRouter({
      mode: 'history',
      routes: [
        { path: '/:id', component: WithSpy as any }
      ]
    });
    const view = mount(RootWithSpy, { localVue, router });
    await new Promise(resolve => router.onReady(resolve));
    await view.vm.$router.push('/123');
    await view.vm.$router.push('/321');
    expect(spy).toHaveBeenCalledTimes(2);
  })
})
