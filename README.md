# It universe

Это мой личный сайт.

## Сторонние зависимости

1. Fauna <https://fauna.com/>
2. Cloudflare Workers <https://workers.cloudflare.com/>
3. Cloudflare Images <https://developers.cloudflare.com/images/cloudflare-images>

## Конфигурация production

В `app/wrangler.toml` необходимо изменить:

```toml
account_id = "Ваш ACCOUNT_ID Cloudflare"
```

```
[vars]
CLOUDFLARE_ACCOUNT_ID = "Ваш ACCOUNT_ID Cloudflare"
CLOUDFLARE_IMAGES_TOKEN = "" # В https://developers.cloudflare.com/images/cloudflare-images/api-request , "your Global API Key or API Token"
FAUNA_SECRET = "" # В https://docs.fauna.com/fauna/current/learn/quick_start/client_quick_start?lang=javascript FAUNADB_SECRET
FAUNA_DOMAIN = "db.fauna.com" # В https://docs.fauna.com/fauna/current/drivers/javascript#instantiating-a-client-and-issuing-queries
```

## В разработке

## Интересные части кода

1. <https://github.com/vladislav1010/universe/tree/main/app/app/components/navbar>
2. <https://github.com/vladislav1010/universe/blob/main/app/app/components/file-input.tsx>
3. <https://github.com/vladislav1010/universe/blob/main/app/app/components/use-input.ts>
4. <https://github.com/vladislav1010/universe/tree/main/app/app/lib/cloudflare/image>

## Заимствование

Т.к. я ни дизайнер, ни разработчик мирового уровня, взял цветовую схему и части кода из <https://github.com/kentcdodds/kentcdodds.com>
