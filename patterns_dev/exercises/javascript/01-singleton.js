// ============================================================
// EJERCICIOS — Singleton
// ============================================================
// Apunte teórico: ../../javascript/design-patterns/01-singleton.js
// ⚠️ Leer sección "ANÁLISIS — Perspectiva React / TypeScript (2026)" ANTES.
// ============================================================

// 1. Implementá un cliente de analytics como Singleton de clase:
//    - static getInstance()
//    - track(event, props) que acumula eventos en un array privado
//    - flush() que loguea todos los eventos y vacía el array
//    - static reset() para tests
//    Verificá que dos getInstance() son === y comparten el mismo buffer.
// Tu código acá:


// 2. Reescribí el ejercicio 1 SIN clase: solo funciones con closure
//    (patrón módulo). Compará líneas de código y legibilidad en un comentario.
// Tu código acá:


// 3. Refactorizá chargeCard para recibir logger por parámetro
//    en lugar de depender de un singleton oculto:
//
//    function chargeCard(order, paymentGateway) {
//      // versión mala: Logger.getInstance().info('cobro', order.id)
//    }
//
//    Escribí chargeCard(order, paymentGateway, logger) y una prueba
//    manual pasando un mock que guarde mensajes en un array.
// Tu código acá:


// 4. Clasificá cada caso como SEGURO o PELIGROSO como singleton
//    en un servidor Node con muchos requests concurrentes.
//    Justificá en un comentario por cada uno:
//    a) Cliente HTTP configurado con baseURL y timeout
//    b) Map con el carrito de compras del usuario actual
//    c) Contador de requests procesados (métrica global)
//    d) Sesión autenticada del usuario que hizo el request
// Tu respuestas acá:
