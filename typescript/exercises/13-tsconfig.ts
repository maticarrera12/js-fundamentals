// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Acá no hay tipos para escribir: son preguntas cortas de
// "qué opción resuelve qué problema". Respondé en un comentario
// debajo de cada una antes de pasar al ejercicio práctico.

// C1. Tenés esta función y NO te tira error pese a ser un bug real:
//     function getName(): string { return null }
//     ¿Qué opción de compilerOptions hace que esto falle?
// Tu respuesta acá:


// C2. Escribiste `import { something } from '../../../../utils'`
//     y querés reemplazarlo por `import { something } from '@/utils'`.
//     ¿Qué dos opciones de tsconfig necesitás configurar juntas?
// Tu respuesta acá:


// C3. Tenés una variable que declarás pero nunca usás en todo el
//     archivo, y TS no te avisa nada. ¿Qué opción la detecta?
// Tu respuesta acá:


// C4. Querés que TS genere un archivo .d.ts por cada .ts que
//     compila (el tema del próximo archivo). ¿Qué opción activás?
// Tu respuesta acá:


// ============================================================
// EJERCICIO PRÁCTICO
// ============================================================

// Creá un tsconfig.json en la raíz de este proyecto con:
// - target: ES2022
// - module: NodeNext
// - moduleResolution: NodeNext
// - strict: true
// - noUnusedLocals: true
// - noImplicitReturns: true
// - outDir: ./dist
// - include: los archivos .ts de este directorio
//
// Después ejecutá: pnpx tsc --noEmit
// y fijate qué errores encuentra en los archivos que ya escribiste.
// Son todos bugs reales — intentá corregir al menos 2.

export {}
