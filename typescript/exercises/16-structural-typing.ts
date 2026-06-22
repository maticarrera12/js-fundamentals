// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

interface Shape {
    width: number
    height: number
}

// C1. Estructural vs nominal. Declará una clase "Rectangle" con
//     constructor(public width: number, public height: number) {}
//     SIN "implements Shape". Escribí una función "area(s: Shape): number"
//     que devuelva width * height, y llamala con un "new Rectangle(2, 3)".
//     Pregunta: ¿hace falta "implements Shape" para que compile? ¿Por qué?
// Tu código acá:


// C2. Asignabilidad como conjuntos. Declará:
//       let wide: number
//       const narrow: 5 = 5
//     Asigná narrow a wide. Después intentá asignar wide a narrow y
//     comentá el error que tira TS (no lo borres, comentalo con //).
//     Esperado: narrow → wide compila; wide → narrow NO compila.
// Tu código acá:


// C3. Excess property checking directo. Pasale a "area" un objeto
//     LITERAL con una propiedad de más, por ejemplo "depth: 1".
//     Comentá la línea cuando veas el error. Después arreglalo
//     pasando el mismo objeto pero a través de una variable intermedia.
// Tu código acá:


// C4. unknown vs never. Declará "declare const x: unknown" y
//     "declare const y: never". Intentá:
//       const a: Shape = x   ❌ (comentalo)
//       const b: Shape = y   ✓
//     Explicá en un comentario por qué "never" sí entra y "unknown" no.
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Sin ejecutar nada, respondé y DESPUÉS verificá con el compilador:
//    a) ¿{ a: string; b: number } es asignable a { a: string }?
//    b) ¿{ a: string } es asignable a { a: string; b?: number }?
//    c) ¿string[] es asignable a readonly string[]? ¿Y al revés?
// Tus respuestas y verificación acá:


// 2. Creá una función "processItems(items: string[], log: (item: string) => void)".
//    Intentá pasarle como log:
//    a) una función (item: unknown) => void
//    b) una función (item: 'a' | 'b') => void
//    Explicá en un comentario POR QUÉ una compila y la otra no (varianza).
// Tu código acá:


// 3. Reproducí el bug de excess property checking:
//    definí una interface con una prop opcional, creá un objeto con esa
//    prop mal escrita en una variable intermedia, y pasalo a una función.
//    Después arreglalo usando "satisfies" en la variable intermedia.
// Tu código acá:

export {}
