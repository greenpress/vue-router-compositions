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
import { useRouteParam, useActions } from 'vue-router-compositions';

export default {
	props: {
		articleId: String
	},
	setup(props) {
		const { fetch } = useActions(['fetch']);
		const { article, comments } = useState(['article', 'comments']);
		fetch(props.articleId); // dispatch the "fetch" action

		return {
			// both are computed compositions for to the store
			article,
			comments
		}
	}
}
```

Enjoy!
