declare interface ImportMeta {
  env: {
    [key: string]: string
    VITE_CURRENT_ENV: string
    VITE_TICKETS_BASE_API_URL: string
    VITE_TICKETS_BASE_WS: string
    VITE_PROXY: string
    VITE_BASE_API_URL: string
  }
}
