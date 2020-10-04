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
import { useRouteParam } from "vue-router-compositions";

export default {
  setup() {
    const { articleId } = useRouteParam("articleId");
    // "articleId" is a computed property from current route:
    doSomethingWithRouteParam(articleId.value);
    return {
      someAction() {
        // this actions will set up a route change accordingly
        articleId.value = "new-article-ID";
      },
    };
  },
};
```

#### useQueryParam

Reactive query param.
Updated from route param value, with a setter that apply route change.

```js
import { useQueryParam } from "vue-router-compositions";

export default {
  setup() {
    const { page } = useQueryParam("page", "1");
    const { sort } = useQueryParam("sort", "ascending", ["ascending", "descending"]);

    return {
      changePage(newPage) {
        // will trigger a query route change.
        page.value = newPage;
      },
      changeSort(isAscending) {
        // trying to set a value that not included on the enumOptions will be ignored.
        sort.value = isAscending ? "ascending" : "descending";
      },
    };
  },
};
```

#### useNavigateItem

Helper function to create a navigation method for your entities.

Let's say you're using a table of some kind, and you want to subscribe to a row click event.
In common cases, the "click" event will send the row's entity item as the event payload.
In case you want to trigger a route change to navigate to this item's screen, you can use this method as the example below:

```js
import { useNavigateItem } from "vue-router-compositions";

export default {
  template: '<el-table :data="rows" @row-click="navigateItem"/>',
  setup() {
    const { navigateItem } = useNavigateItem("article", "articleId", "rowId");

    return {
      rows: [
        { rowId: "1234", title: "first article" },
        { rowId: "2345", title: "second article" },
        { rowId: "4567", title: "third article" },
      ],
      navigateItem,
    };
  },
};
```

#### useRouteDispatcher

Create a reactive dispatcher from a router param

```js
import { useRouteDispatcher } from "vue-router-compositions";

const fetchArticle = (articleId) => fetch(`/articles/${articleId}`).then((res) => res.json());

export default {
  setup() {
    const { result, loading, error, promise, param } = useRouteDispatcher("articleId", fetchArticle);

    return {
      // all values are reactive
      param,
      result,
      loading,
      error,
      promise,
    };
  },
};
```

Enjoy!
