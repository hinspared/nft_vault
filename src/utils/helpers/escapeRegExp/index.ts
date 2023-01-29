export const escapeRegExp = (str: string) => {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
