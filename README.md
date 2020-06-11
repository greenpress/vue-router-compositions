# vue-router-compositions

[![npm version](https://badge.fury.io/js/vue-router-composition.svg)](https://badge.fury.io/js/vuex-composition-helpers)

A util package for Vue-Router and Vue Composition API.

## Installation

```shell
$ npm install vue-router-compositions
```

### Basic Usage Examples

#### useRouteParam
reactive 

```js
import { useRouteParam } from 'vue-router-compositions';

export default {
	setup() {
		const { articleId } = useRouteParam('articleId');
        // "articleId" is a computed property from current route:
        doSomethingWithRouteParam(articleId.value);
		return {
			someAction() {
                // this actions will set up a route change accordingly
			    articleId.value = 'new-article-ID';
            }
		}
	}
}
```

Enjoy!
