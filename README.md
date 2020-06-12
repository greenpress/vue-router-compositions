# vue-router-compositions

[![npm version](https://badge.fury.io/js/vue-router-compositions.svg)](https://badge.fury.io/js/vuex-composition-helpers)

A util package for Vue-Router and Vue Composition API.

## Installation

```shell
$ npm install vue-router-compositions
```

### Basic Usage Examples

#### useRouteParam
Reactive route param.
Updated from route param value, with a setter that apply route change.

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

#### useQueryParam
Reactive query param.
Updated from route param value, with a setter that apply route change.


```js
import { useQueryParam } from 'vue-router-compositions';

export default {
	setup() {
		const { page } = useQueryParam('page', '1');
		const { sort } = useQueryParam('sort', 'ascending', ['ascending', 'descending']);
        
		return {
			changePage(newPage) {
                // will trigger a query route change.
                page.value = newPage;
            },
			changeSort(isAscending) {
                // trying to set a value that not included on the enumOptions will be ignored.
                sort.value = isAscending ? 'ascending' : 'descending';
            }
		}
	}
}
```
Enjoy!
