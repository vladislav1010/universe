import faunadb from 'faunadb'

const q = faunadb.query

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: faunadb.Client = undefined as any

const client = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (_client === undefined) {
    _client = new faunadb.Client({
      secret: process.env.FAUNA_SECRET,
      domain: process.env.FAUNA_DOMAIN,
      // NOTE: Use the correct domain for your database's Region Group.
      port: 443,
      scheme: 'https',
    })
  }
  return _client
}

export {q, client}
