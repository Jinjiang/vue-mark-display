export const genMarkdown = () => "# Hello World";

export const genSlide = () => [
  {
    html: "<h1>Hello World</h1>",
    title: "Hello World",
    meta: { bg: "", type: "", style: "" },
    visited: false
  }
];

export const setHash = page => location.replace(`#${page}`);

export const getHash = () => {
  const matched = location.hash.match(/^\#(\d+)$/);
  return matched ? matched[1] : "";
};

export const parseMarkdown = markdown => {
  // todo
  return genSlide();
};
export const parseFontSize = () => {
  // todo
  return 14;
};
