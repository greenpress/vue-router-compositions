import { createLocalVue } from '@vue/test-utils';
import CompositionApi from '@vue/composition-api';

import VueRouter from 'vue-router';
import Vue from 'vue';

export function getLocalVue(): typeof Vue {
	const Vue = createLocalVue();

	Vue.use(CompositionApi);
	Vue.use(VueRouter);

	return Vue;
}
