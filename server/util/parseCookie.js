module.exports = (cookie) => {
  let cookies = {}
  if (!cookie) {
    return cookies
  }
  const list = cookie.split(';')
  for (let i = 0; i < list.length; i++) {
    let pair = list[i].split('=')
    cookies[pair[0].trim()] = pair[1]
  }
  return cookies
}
