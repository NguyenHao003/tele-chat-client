export function getCookie(name: string) {
  const cookies = document.cookie ? document.cookie.split('; ') : []
  const cookie = cookies.find((item) => item.startsWith(`${name}=`))

  if (!cookie) {
    return null
  }

  return decodeURIComponent(cookie.split('=').slice(1).join('='))
}

export function setCookie(name: string, value: string, maxAgeSeconds: number) {
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`
}
