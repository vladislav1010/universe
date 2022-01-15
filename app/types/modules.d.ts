declare namespace NodeJS {
  export interface ProcessEnv {
    CLOUDFLARE_ACCOUNT_ID: string
    CLOUDFLARE_TOKEN: string
    CLOUDFLARE_IMAGES_ACCOUNT_HASH: string
    FAUNA_SECRET: string
    FAUNA_DOMAIN: string
  }
}
