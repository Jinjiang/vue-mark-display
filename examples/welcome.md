# Welcome

this is a intro about `vue-mark-display`

---

## Usage

1. install & import from `vue-mark-display`
2. use `<mark-display>` in template

---

### Import in Script

```html
<script>
  import MarkDisplay from "vue-mark-display";
  export default {
    components: { MarkDisplay }
  };
</script>
```

---

### Use in Template

```html
<template>
  <MarkDisplay markdown="..." />
</template>
```

---

You can use [Markdown](https://commonmark.org/help/) to write slides.

For example:

---

# Heading 1

## Heading 2

### Heading 3

paragraph

---

### Table

| Foo | Bar | Baz |
| --- | --- | --- |
| 1   | 2   | 3   |
| 4   | 5   | 6   |

---

You can also do some extensions by your own:

---

1. set your code highlighted

```js
export default {
  data() {
    return {
      msg: "Highlighted!"
    };
  }
};
```

---

2. or support touch events

Try to **SWIPE horizontally** on the touch screen.

---

<!-- style: color: blue; font-family: monospace; -->

3. custom background using meta syntax

`<!-- style: color: blue; font-family: monospace; -->`

---

4. reset base url

```html
<MarkDisplay
  ...
  baseUrl="https://github.com/"
/>
```

![](./favicon.ico) this is the `./favicon.ico`

---

At almost the end:

You can press **<kbd>⌘+P</kbd>** to print your slides into PDF.

<small>you can have a try _now_</small>

---

More about me:

https://github.com/jinjiang/vue-mark-display

Thanks
