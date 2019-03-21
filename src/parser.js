import marked from "marked";

export const parse = code => code.split(/\n\s*-{3,}\s*\n/).map(parseSlide);

// content, html, meta: { [kvPair], [flag] }
// - [x] type
// - [x] title
// - [x] slideStyle
// - [x] bgStyle
// - [!] style
// - [!] color
// - [!] backgroundImage
// - [!] backgroundColor
// - [!] backgroundStyle
const parseSlide = str => {
  const matched = str.match(/(\<\!\-\-[\S\s]+\-\-\>\s*)*([\S\s]+)/);
  let content = "";
  const meta = {};

  if (matched) {
    content = matched[2];
    if (matched[1]) {
      parseMeta(matched[1], meta);
    }
  }

  parseMetaStyle(meta);
  parseMetaCover(meta, content);
  parseMetaTitle(meta, content);

  const html = marked(content);

  return { content, meta, html, visited: false };
};

// <!-- key: value --> -> { key: value }
// <!-- flag --> -> { flag: '' }
const parseMeta = (comment, meta) => {
  const commentList = comment.match(/\<\!\-\-([\S\s]+?)\-\-\>/g);
  commentList.forEach(comment => {
    const kvPair = comment.match(/\<\!\-\-\s*(\S+)\s*\:\s*([\S\s]+?)\s*\-\-\>/);
    if (kvPair) {
      meta[kvPair[1]] = kvPair[2];
      return;
    }
    const flag = comment.match(/\<\!\-\-\s*(\S+)\s*\-\-\>/);
    if (flag) {
      meta[flag[1]] = "";
    }
  });
};

const parseMetaStyle = meta => {
  const { color, style, backgroundImage, backgroundColor, background } = meta;
  meta.slideStyle = [style, color ? `color: ${color}` : ""]
    .filter(Boolean)
    .join("; ");
  meta.bgStyle = [
    background,
    backgroundColor ? `background-color: ${backgroundColor}` : "",
    backgroundImage ? `background-image: url(${backgroundImage})` : ""
  ]
    .filter(Boolean)
    .join("; ");
};

const parseMetaCover = (meta, content) => {
  if (!meta.type && content.match(/^\# /)) {
    meta.type = "cover";
  }
};

const parseMetaTitle = (meta, content) => {
  if (!meta.title) {
    meta.title = content.replace(/^\#+ /, "").substr(0, content.search(/$/));
  }
};
