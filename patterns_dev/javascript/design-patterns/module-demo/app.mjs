// Demo ejecutable: node module-demo/app.mjs
// (desde patterns_dev/javascript/design-patterns/)

import { get, set, ready, size } from './inventory.mjs'
import { count, inc, reset } from './counter.mjs'

console.log('=== inventory (privacidad ESM) ===')
await ready
console.log(get('ABC-123'))
console.log('items en cache:', size())
set('NEW-001', { sku: 'NEW-001', qty: 1 })
console.log('después de set:', size())

console.log('\n=== live bindings ===')
reset()
console.log('count antes de inc:', count)  // 0
inc()
console.log('count después de inc:', count)  // 1 — no es copia, es binding vivo

console.log('\n=== import() dinámico ===')
const counterModule = await import('./counter.mjs')
counterModule.reset()
counterModule.inc()
counterModule.inc()
console.log('count vía dynamic import:', counterModule.count)  // 2 — mismo módulo, mismo estado

console.log('\n=== import.meta ===')
console.log('url:', import.meta.url)
