import browser from './src/browser'
import node from './src/node'

const isBrowser = typeof window === 'object'
export default isBrowser ? browser : node
