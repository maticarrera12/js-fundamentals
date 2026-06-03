// exportacion de modulos sirve para compartir código entre diferentes archivos. Esto es especialmente útil para organizar el código y reutilizar funciones, clases o variables en diferentes partes de una aplicación.

// Exportar un módulo

// En JavaScript, puedes exportar un módulo utilizando la palabra clave export. Hay dos formas principales de exportar: exportación nombrada y exportación por defecto.

// Exportación nombrada
export function sum(a, b) {
    return a + b
}


// Exportación por defecto
export default function substract(a, b) {
    return a - b
}

// la diferencia entre exportación nombrada y exportación por defecto es que en la exportación nombrada puedes exportar varias funciones, clases o variables desde un mismo archivo, mientras que en la exportación por defecto solo puedes exportar una función, clase o variable por archivo. Además, al importar un módulo con exportación por defecto, no es necesario usar llaves para acceder a la función, clase o variable exportada, mientras que en la exportación nombrada sí es necesario usar llaves para acceder a cada elemento exportado.

// exportar una varaible 

export const PI = 3.14159

// exportar una clase

export class Circle {
    constructor(radius) {
        this.radius = radius
    }

    area() {
        return Math.PI * Math.pow(this.radius, 2)
    }
}

// clase por defecto

export default class Rectangle {
    constructor(width, height) {
        this.width = width
        this.height = height
    }
    area() {
        return this.width * this.height
    }
}

