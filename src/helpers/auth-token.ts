import { getCookie, removeCookie, setCookie } from '@/helpers/cookie'

export const ACCESS_TOKEN_COOKIE = 'tele-chat.access-token'

const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 24 * 7

export function getAccessToken() {
  return getCookie(ACCESS_TOKEN_COOKIE)
}

export function setAccessToken(accessToken: string) {
  setCookie(ACCESS_TOKEN_COOKIE, accessToken, ACCESS_TOKEN_MAX_AGE)
}

export function removeAccessToken() {
  removeCookie(ACCESS_TOKEN_COOKIE)
}
