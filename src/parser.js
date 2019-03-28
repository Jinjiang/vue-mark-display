import marked from "marked";
import { highlight } from "./highlight";

marked.setOptions({
  highlight
});

export const parse = code => {
  const tokens = marked.lexer(code);
  const slides = splitTokens(tokens);
  return slides;
};

function splitTokens(tokens) {
  const slides = [];
  let current = createSlide();
  tokens.forEach(token => {
    if (token.type === "hr") {
      resolveSlide(current);
      slides.push(current);
      current = createSlide();
    } else {
      if (token.type === "html") {
        const kvPair = token.text.match(
          /\<\!\-\-\s*(\S+)\s*\:\s*([\S\s]+?)\s*\-\-\>/
        );
        if (kvPair) {
          current.meta[kvPair[1]] = kvPair[2];
          return;
        } else {
          const flag = token.text.match(/\<\!\-\-\s*(\S+)\s*\-\-\>/);
          if (flag) {
            current.meta[flag[1]] = "";
            return;
          }
        }
      }
      current.tokens.push(token);
    }
  });
  if (current.tokens.length) {
    resolveSlide(current);
    slides.push(current);
  }
  return slides;
}

function resolveSlide(slide) {
  const { meta, tokens } = slide;

  // style
  const {
    background,
    backgroundColor,
    backgroundImage,
    color,
    style,
    stageBackground
  } = meta;
  meta.slideStyle = [
    background ? `background: ${background}` : "",
    backgroundColor ? `background-color: ${backgroundColor}` : "",
    backgroundImage ? `background-image: url(${backgroundImage})` : "",
    color ? `color: ${color}` : "",
    style
  ]
    .filter(Boolean)
    .join("; ");
  meta.bgStyle = stageBackground || "";

  // first token
  const firstToken = findFirstTextToken(tokens);
  if (firstToken.token) {
    // cover
    if (
      !meta.type &&
      firstToken.token.type === "heading" &&
      firstToken.token.depth === 1
    ) {
      meta.type = "cover";
    }

    // title
    if (!meta.title) meta.title = firstToken.text;
  }

  const html = marked.parser(tokens);
  slide.html = html;
}

function createSlide() {
  const slide = { meta: {}, tokens: [], html: "" };
  slide.tokens.links = {};
  return slide;
}

function findFirstTextToken(tokens) {
  const result = {};
  tokens.some(token => {
    const text = parseText(token.text || "");
    if (text) {
      result.token = token;
      result.text = text;
      return true;
    }
  });
  return result;
}

function parseText(text) {
  return text
    .replace(/<\!\-\-(.|\s)*\-\-\>/g, "")
    .replace(/\!\[([^\]]*)\]\([^\)]*\)/g, "$1")
    .replace(/\[[^\]]*\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
