// ============================================================
// 05 - CONDICIONALES
// ============================================================
// Los condicionales controlan el flujo del programa según condiciones.
// if/else es la herramienta general. switch es más legible
// cuando comparás una sola variable contra muchos valores fijos.
// ============================================================


// --- if / else if / else ---

const age = 20

if (age >= 18) {
    console.log('Mayor de edad')
} else {
    console.log('Menor de edad')
}

const hour = 14

if (hour < 12) {
    console.log('Buenos días')
} else if (hour < 18) {
    console.log('Buenas tardes')
} else {
    console.log('Buenas noches')
}


// --- Operador ternario ---
// Para asignaciones simples, es más conciso que if/else.
// Evitalo cuando la lógica es compleja — prioriza legibilidad.

const role = age >= 18 ? 'adulto' : 'menor'
console.log(role)

// Anidados (usar con moderación — se vuelve ilegible rápido):
const score = 75
const grade = score >= 90 ? 'A'
            : score >= 80 ? 'B'
            : score >= 70 ? 'C'
            : 'F'


// --- switch ---
// Evalúa una expresión y ejecuta el caso que coincida.
// El break es obligatorio — sin él, la ejecución "cae" al siguiente case.
// default es como el else — se ejecuta si ningún case coincide.

const day = 3
let dayName

switch (day) {
    case 0: dayName = 'Domingo';   break
    case 1: dayName = 'Lunes';     break
    case 2: dayName = 'Martes';    break
    case 3: dayName = 'Miércoles'; break
    case 4: dayName = 'Jueves';    break
    case 5: dayName = 'Viernes';   break
    case 6: dayName = 'Sábado';    break
    default: dayName = 'Inválido'
}
console.log(dayName)  // 'Miércoles'

// Fallthrough intencional: varios cases con la misma lógica
const month = 2
let daysInMonth

switch (month) {
    case 1: case 3: case 5: case 7:
    case 8: case 10: case 12:
        daysInMonth = 31
        break
    case 4: case 6: case 9: case 11:
        daysInMonth = 30
        break
    case 2:
        daysInMonth = 28  // simplificado, sin año bisiesto
        break
}


// --- Cuándo usar cada uno ---
// if/else  → condiciones con rangos, comparaciones complejas, múltiples variables
// switch   → una variable contra valores exactos fijos (como una enum o código de error)
// ternario → asignación simple con dos resultados
//
// Para múltiples condiciones con return, el "early return" es muy limpio
// (las funciones y return se ven en detalle en 06-function; acá es solo un ejemplo):

function classify(n) {
    if (n < 0)  return 'negativo'
    if (n === 0) return 'cero'
    if (n < 10)  return 'un dígito'
    return 'varios dígitos'
}


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Dado: const userType = 'vip' y const total = 1500
//    Usando if/else, calculá e imprimí el precio final aplicando el descuento:
//    - 'vip': 20% si total > 1000, si no 10%
//    - 'member': 5%
//    - cualquier otro: 0%
//    (Probá cambiando userType y total a mano y volvé a correr.)
// Tu código acá:


// 2. Dado: const day = 3   (0 = Domingo, 1 = Lunes, ... 6 = Sábado)
//    Usando switch, imprimí 'Finde' si es sábado o domingo, y 'Laborable'
//    en cualquier otro caso. Aprovechá el fallthrough para agrupar los days.
//    (Probá cambiando day.)
// Tu código acá:
