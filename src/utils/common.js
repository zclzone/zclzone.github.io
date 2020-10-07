const to = promise => {
  return promise.then(res => [null, res]).catch(err => [err])
}

const utf8ToBase64 = (str) => {
  return btoa(unescape(encodeURIComponent(str)))
}

const base64ToUtf8 = (str) => {
  return decodeURIComponent(escape(atob(str)))
}

export {
  to,
  utf8ToBase64,
  base64ToUtf8,
}