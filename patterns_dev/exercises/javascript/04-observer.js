// ============================================================
// EJERCICIOS — Observer
// ============================================================
// Apunte teórico: ../../javascript/design-patterns/04-observer.js
// ⚠️ Leer sección "ANÁLISIS — Perspectiva React / TypeScript (2026)" ANTES.
// ============================================================

// 1. Implementá class PriceStore con:
//    - setPrice(symbol, price) que notifica { symbol, price, previous }
//    - subscribe que devuelve unsubscribe
//    Registrá dos observers y verificá que ambos reciben el update.
// Tu código acá:


// 2. Reescribí el ticker usando EventTarget + CustomEvent('tick').
//    Usá AbortController para remover todos los listeners de una vez.
// Tu código acá:


// 3. Implementá EventBus con publish/subscribe por topic.
//    Publicá en 'user:login' y 'user:logout'. Dos módulos distintos
//    se suscriben solo a los topics que les interesan.
// Tu código acá:


// 4. Simulá el problema de notify síncrono lento:
//    - Subject con un observer lento y otro rápido
//    - Mostrá por qué batching o async dispatch ayuda
// Tu código acá:


// 5. Clasificá cada caso como Observer, Pub/Sub, Promise, o llamada directa:
//    a) Botón click → abrir modal (un handler en el mismo componente)
//    b) WebSocket de chat → 5 widgets distintos en la app
//    c) fetch('/api/user') una sola vez al montar
//    d) bus.publish('order:paid') entre módulos de billing y email
// Tu respuestas acá:
