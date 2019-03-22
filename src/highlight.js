let highlighter;

export const setHighlighter = func => (highlighter = func);

export const highlight = (code, lang) => {
  return typeof highlighter === "function" ? highlighter(code, lang) : code;
};
