import faunadb from 'faunadb'

const q = faunadb.query

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
  domain: process.env.FAUNA_DOMAIN,
  // NOTE: Use the correct domain for your database's Region Group.
  port: 443,
  scheme: 'https',
})

export {q, client}
