// ============================================================
// 19 - IMPORTAR MÓDULOS
// ============================================================
// import es la contraparte de export. La sintaxis varía según
// qué tipo de export estés consumiendo.
// Los módulos ES son estáticos — las importaciones se resuelven
// en tiempo de análisis, antes de ejecutar el código.
// ============================================================

import subtract from './18-export-modules.js'          // default: sin llaves, nombre libre
import { sum, multiply, PI, Circle } from './18-export-modules.js'  // nombradas: con llaves, nombre exacto


// --- Usar las exportaciones nombradas ---

console.log(sum(2, 3))        // 5
console.log(multiply(4, 5))   // 20
console.log(PI)               // 3.14159265358979

const circle = new Circle(5)
console.log(circle.area())       // ~78.54
console.log(circle.perimeter())  // ~31.42


// --- Usar la exportación por defecto ---
// El nombre que elegís al importar es completamente libre.

console.log(subtract(10, 3))  // 7


// --- Renombrar al importar ---
// Útil para evitar conflictos de nombres con variables locales.

import { sum as addNumbers } from './18-export-modules.js'
console.log(addNumbers(1, 2))  // 3


// --- Importar todo como namespace ---
// Crea un objeto que agrupa todas las exportaciones nombradas.
// No incluye el default — ese sigue siendo subtract arriba.

import * as MathUtils from './18-export-modules.js'

console.log(MathUtils.sum(5, 5))       // 10
console.log(MathUtils.PI)              // 3.14159...
const c = new MathUtils.Circle(3)
console.log(c.area())                  // ~28.27


// --- Dynamic import (import dinámico) ---
// import() devuelve una Promise — carga el módulo en runtime.
// Útil para code splitting: cargar solo lo que necesitás cuando lo necesitás.

async function loadMath() {
    const module = await import('./18-export-modules.js')
    console.log(module.sum(1, 2))     // 3
    console.log(module.default(5, 3)) // 2 — el default se accede con .default
}

loadMath()


// --- Reglas importantes ---
// ✓ Solo UN export default por archivo
// ✓ Varios export nombrados por archivo
// ✓ Las importaciones nombradas deben usar el nombre exacto (o renombrar con as)
// ✓ Los import estáticos van al tope del archivo — no dentro de funciones o ifs
// ✓ import() dinámico sí puede ir en cualquier lugar (devuelve Promise)


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Importá Circle de 18-export-modules.js y creá un array de 3 círculos
//    con radios diferentes. Usá map para obtener un array de sus áreas.
// Tu código acá:


// 2. Usá dynamic import para cargar el módulo solo cuando el usuario
//    "hace click" (simulalo con un setTimeout o una condición).
//    Imprimí el resultado de sum(10, 5) cuando el módulo cargue.
// Tu código acá:
