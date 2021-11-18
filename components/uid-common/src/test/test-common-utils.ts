export function removeComment(str: string) {
  // Remove comments, and leading and trailing whitespaces
  return str.replace(/<!--.*?-->/g, '').trim();
}
