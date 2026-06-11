// ============================================================
// 05 - FECHAS E INTERNACIONALIZACIÓN
// ============================================================
// El hueco más grande de cualquier curso de JS: Date es la API
// más vieja y traicionera del lenguaje, y todos los proyectos
// reales la necesitan. Acá: cómo NO cortarte con Date, y cómo
// Intl resuelve gratis lo que antes hacías a mano (formatear
// fechas, monedas y números para humanos).
// ============================================================


// --- Date: lo básico que sí funciona ---

const now = new Date()                       // ahora
const timestamp = Date.now()                 // ms desde 1970-01-01 UTC (number)
const fromIso = new Date('2026-06-10T15:30:00Z')   // desde string ISO 8601
const fromParts = new Date(2026, 5, 10, 15, 30)    // ⚠️ junio — mes 5 (ver abajo)

// Getters principales:
now.getFullYear()    // 2026
now.getMonth()       // 0-11  ⚠️
now.getDate()        // día del mes 1-31
now.getDay()         // día de la semana 0-6, DOMINGO es 0 ⚠️
now.getHours()       // 0-23
now.getTime()        // timestamp en ms — la representación más segura


// --- Las trampas (memorizalas — TODAS causan bugs reales) ---

// TRAMPA 1: los meses van de 0 a 11.
new Date(2026, 0, 15)    // 15 de ENERO. El "mes 1" sería febrero.

// TRAMPA 2: parsear strings que no son ISO es lotería.
// new Date('06/10/2026') — ¿10 de junio o 6 de octubre? Depende
// del motor. REGLA: solo parseá strings ISO 8601 (los demás formatos,
// partilos vos con split y armá la fecha con el constructor de partes).

// TRAMPA 3: ISO sin hora se interpreta UTC; con hora, LOCAL.
const utcMidnight = new Date('2026-06-10')          // medianoche UTC
const localMidnight = new Date('2026-06-10T00:00')  // medianoche en TU zona
// En Argentina (UTC-3), utcMidnight es el 9 de junio a las 21:00 local.
// El clásico "el calendario muestra un día menos" sale EXACTAMENTE de acá.

// TRAMPA 4: Date es MUTABLE — los setters modifican el objeto.
const deadline = new Date('2026-06-10T12:00:00')
const reminder = deadline            // misma referencia, mismo bug que basic/12
reminder.setHours(9)
console.log(deadline.getHours())     // 9 — también "cambió"
// Copiá antes de tocar: const copy = new Date(deadline)

// TRAMPA 5: overflow silencioso.
new Date(2026, 1, 30)   // 30 de febrero no existe → 2 de marzo. Sin error.
// (útil a propósito: new Date(2026, 2, 0) = último día de febrero)


// --- Aritmética de fechas ---
// Restar dos Dates da milisegundos — de ahí derivás todo:

const start = new Date('2026-06-01')
const end = new Date('2026-06-10')
const diffDays = (end - start) / (1000 * 60 * 60 * 24)   // 9

// Sumar días — vía setDate sobre una COPIA:
function addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)   // el overflow acá juega a favor
    return result
}

// Comparar: con los timestamps, nunca con ==
const isSame = start.getTime() === end.getTime()
// start == end compara REFERENCIAS de objeto — siempre false


// --- Intl.DateTimeFormat: fechas para humanos ---
// Nunca más armes "10/06/2026" concatenando getDate() + '/' + ...
// Intl formatea según el idioma y las convenciones de cada región:

const date = new Date('2026-06-10T15:30:00')

new Intl.DateTimeFormat('es-AR').format(date)
// '10/6/2026'

new Intl.DateTimeFormat('es-AR', { dateStyle: 'full', timeStyle: 'short' }).format(date)
// 'miércoles, 10 de junio de 2026, 15:30'

new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date)
// 'June 10, 2026' — mismo Date, otra convención, cero esfuerzo

// Control fino con opciones individuales:
new Intl.DateTimeFormat('es-AR', {
    weekday: 'short', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
}).format(date)
// 'mié, 10 de junio, 15:30'

// Zonas horarias — formatear la MISMA fecha en otra zona:
new Intl.DateTimeFormat('es-AR', { timeStyle: 'short', timeZone: 'Asia/Tokyo' }).format(date)
// la hora de Tokio para ese instante

// Tip de performance: crear el formatter es caro; format() es barato.
// Creá UNO a nivel módulo y reusalo, no uno por llamada.


// --- Intl.NumberFormat: números y monedas ---

const price = 1234567.891

new Intl.NumberFormat('es-AR').format(price)
// '1.234.567,891' — separadores argentinos

new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price)
// '$ 1.234.567,89'

new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
// '$1,234,567.89'

new Intl.NumberFormat('es-AR', { style: 'percent' }).format(0.85)
// '85 %'

new Intl.NumberFormat('en', { notation: 'compact' }).format(1234567)
// '1.2M' — para dashboards y contadores de likes

// REGLA: los números se guardan crudos (number), se formatean SOLO
// al mostrarlos. Nunca guardes '$ 1.234,56' en ningún lado.


// --- Intl.RelativeTimeFormat: "hace 3 días" ---

const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

rtf.format(-1, 'day')     // 'ayer'
rtf.format(-3, 'day')     // 'hace 3 días'
rtf.format(2, 'hour')     // 'dentro de 2 horas'

// El helper que todo feed necesita:
function timeAgo(date) {
    const seconds = Math.round((date - Date.now()) / 1000)
    const units = [
        ['year', 31536000], ['month', 2592000], ['day', 86400],
        ['hour', 3600], ['minute', 60], ['second', 1],
    ]
    for (const [unit, secondsPerUnit] of units) {
        if (Math.abs(seconds) >= secondsPerUnit || unit === 'second') {
            return rtf.format(Math.round(seconds / secondsPerUnit), unit)
        }
    }
}
// timeAgo(new Date(Date.now() - 90_000))  → 'hace 2 minutos'


// --- Bonus Intl que casi nadie conoce ---

new Intl.ListFormat('es', { type: 'conjunction' }).format(['JS', 'TS', 'React'])
// 'JS, TS y React' — la coma y la "y" correctas en cada idioma

new Intl.PluralRules('es').select(1)    // 'one'
new Intl.PluralRules('es').select(5)    // 'other'
// Para elegir entre '1 mensaje' / '5 mensajes' sin if (n === 1)


// --- El futuro: Temporal ---
// La API que REEMPLAZA a Date (ya estándar, llegando a los motores):
// - inmutable (adiós trampa 4)
// - tipos separados: PlainDate, PlainTime, ZonedDateTime (adiós trampa 3)
// - aritmética integrada: date.add({ days: 3 })
//
// Mientras llega: para apps con MUCHA lógica de fechas, date-fns
// (funciones puras, tree-shakeable). Para formatear: Intl ya lo
// tenés gratis, no instales una librería para eso.


// ============================================================
// DESAFÍOS
// ============================================================

// 1. Escribí "getNextFriday(from = new Date())" que devuelva el
//    próximo viernes a las 18:00 (si hoy es viernes antes de las 18,
//    es hoy). Tip: getDay() — viernes es 5 — y aritmética modular.
// Tu código acá:


// 2. Escribí "formatPriceRange(min, max, currency, locale)" que
//    devuelva '$ 1.500 – $ 3.000' usando Intl.NumberFormat con el
//    locale y la moneda recibidos. Sin decimales si son enteros
//    (tip: minimumFractionDigits / maximumFractionDigits).
// Tu código acá:


// 3. Reproducí la TRAMPA 3: creá new Date('2026-03-01') y mostrá
//    con Intl.DateTimeFormat (dateStyle: 'full') qué día muestra
//    en tu zona horaria vs en timeZone: 'UTC'. Explicá en un
//    comentario qué le pasaría a un usuario de un calendario.
// Tu código acá:
