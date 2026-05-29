export const ENV = {
  API_URL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
  SOCKET_URL:
    import.meta.env.VITE_SOCKET_URL ??
    import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') ??
    'http://localhost:3000',
}
