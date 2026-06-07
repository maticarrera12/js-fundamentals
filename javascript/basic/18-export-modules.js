// ============================================================
// 18 - EXPORTAR MÓDULOS
// ============================================================
// Los módulos permiten dividir el código en archivos reutilizables.
// Hay dos tipos de export: nombrado (podés tener muchos por archivo)
// y por defecto (solo uno por archivo, se importa sin llaves).
// ============================================================


// --- Exportación nombrada ---
// Se importa con llaves: import { sum, PI } from './18-export-modules.js'
// El nombre al importar DEBE coincidir con el nombre al exportar.

export function sum(a, b) {
    return a + b
}

export function multiply(a, b) {
    return a * b
}

export const PI = 3.14159265358979

export class Circle {
    constructor(radius) {
        this.radius = radius
    }

    area() {
        return PI * this.radius ** 2
    }

    perimeter() {
        return 2 * PI * this.radius
    }
}


// --- Exportación por defecto ---
// Solo puede haber UNA por archivo.
// Se importa SIN llaves y con el nombre que quieras.
// Usá default para la exportación "principal" del archivo.

export default function subtract(a, b) {
    return a - b
}


// --- Export al final (alternativa) ---
// En vez de poner export en cada declaración, podés exportar todo junto al final.
// Es útil cuando querés ver de un vistazo qué expone el módulo.

// Equivalente a lo de arriba — no podés tener ambas formas a la vez:
// export { sum, multiply, PI, Circle }
// export default subtract


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá un archivo "math-utils.js" que exporte:
//    - por defecto: una función "calculate(a, op, b)" que soporte +, -, *, /
//    - nombradas: clamp(value, min, max), lerp(a, b, t), randomInt(min, max)
//    Luego importalas en otro archivo y probá cada función.
// Tu código acá (podés esbozar las funciones aunque no las muevas de archivo):
