import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {isConnectedToTheInternet, forward, isE2E, updateFixture} from './utils'

// put one-off handlers that don't really need an entire file to themselves here
const miscHandlers: any[] = []

const server = setupServer(...miscHandlers)

server.listen({onUnhandledRequest: 'warn'})
console.info('🔶 Mock server installed')
if (isE2E) console.info('running in E2E mode')

process.once('SIGINT', () => server.close())
process.once('SIGTERM', () => server.close())
