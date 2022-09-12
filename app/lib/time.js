export const delayed = (f, ms) => () => {
  setTimeout(() => f(), ms);
};
