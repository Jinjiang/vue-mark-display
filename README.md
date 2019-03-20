# v-mark-display

A Vue Component for Markdown-based Slides.

## Usage

```vue
<template>
  <v-mark-display
    :markdown="markdown"
    @title="setTitle"
    keyboard-ctrl
    url-hash-ctrl
    auto-font-size
  ></v-mark-display>
</template>

<script>
import VMarkDisplay from "v-mark-display";

const markdown = `# Hello World
----
This is markshow`;

export default {
  components: { VMarkDisplay },
  data() {
    return { markdown };
  },
  methods: {
    setTitle({ title }) {
      document.title = title;
    }
  }
};
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
</style>
```

## The Extension for Markdown Syntax

1. It's based on [marked](https://www.npmjs.com/package/marked).
2. You can separate pages by horizon lines (`----`).
3. You can use HTML comments for meta info of each slides. The format is like `<!-- key: value -->`. Here are all useful meta keys below:
   - `color`: default font color of the slide
   - `style`: inline css text attached to the slide
   - `backgroundImage`: background image of the stage when the current slide is shown
   - `backgroundColor`: background color of the stage when the current slide is shown
   - `background`: inline css text attached to the stage when the current slide is shown

Example:

```markdown
<!-- color: red; -->
<!-- style: font-weight: bold; -->

# Hello

---

<!-- backgroundColor: silver -->

![./favicon.ico] this is content
```

## API

### Props

```js
{
  // markdown content
  markdown: String,
  // or give a markdown URL
  src: String,
  // initial page number
  page: Number,
  // set `baseUrl` for the whole document
  // so all the relative URLs in markdown content would be applied
  baseUrl: String,
  // whether use `src` as the `baseUrl` automatically
  autoBaseUrl: Boolean,
  // whether adjust font-size to adapt the screen size
  autoFontSize: Boolean,
  // whether support keyboard shortcuts (Arrows, Enter, Ctrl+G)
  keyboardCtrl: Boolean,
  // whether update URL hash when page changed
  urlHashCtrl: Boolean,
  // support opening an iframe on top of the page to preview a URL
  // when click the `<a>` link with `altKey` pressed
  supportPreview: Boolean
}
```

### Events

- `@change="func({ from, to })"`: when page changed
- `@title="func({ title })"`: when title changed

### Styles

The component `<v-markshow>` will cover full screen size by default. So maybe "normalizing" the body is a good choice:

```css
body {
  margin: 0;
  overflow: hidden;
}
```

We also provide a group of default styles for common HTML tags which you can overwrite freely.

And you can overwite the default transition style on each slides:

```css
.slide {
  transform-origin: center center;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.slide-enter {
  /* the begining of slide enter */
  opacity: 0;
}
.slide-enter-to {
  /* the ending of slide enter */
}
.slide-leave {
  /* the begining of slide leave */
}
.slide-leave-to {
  /* the ending of slide leave */
  opacity: 0;
}
```
