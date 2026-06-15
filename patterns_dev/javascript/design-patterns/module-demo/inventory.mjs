// cache privado — no exportado, inalcanzable desde otros archivos
const cache = new Map()

export function get(sku) {
    return cache.get(sku)
}

export function set(sku, item) {
    cache.set(sku, item)
}

export function clear() {
    cache.clear()
}

export function size() {
    return cache.size
}

// Simula carga async inicial (top-level await)
export const ready = Promise.resolve().then(() => {
    set('ABC-123', { sku: 'ABC-123', qty: 42, name: 'Widget' })
    set('XYZ-789', { sku: 'XYZ-789', qty: 7, name: 'Gadget' })
})
