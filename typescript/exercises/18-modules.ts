// ============================================================
// CALENTAMIENTO — un mecanismo por vez
// ============================================================
// Micro-ejercicios. Cada uno aísla UN solo mecanismo del archivo.
// Resolvelos en orden: cuando los tengas, los ejercicios de abajo
// dejan de ser un salto al vacío.

// C1. Módulo vs script. Sin crear archivos nuevos: respondé en un
//     comentario, ¿este mismo archivo (18-modules.ts) es un módulo
//     o un script? ¿Cómo lo sabés mirando la última línea del archivo?
// Tu respuesta acá:


// C2. import type inline. Escribí (sin ejecutar, esto es sintaxis)
//     la línea de import que trae "createTask" como VALOR y "Task"
//     como TIPO desde './models' en una sola línea, usando el
//     modificador inline `type`.
// Tu código acá (un comentario con la línea):


// C3. Extensión en imports relativos. Con "moduleResolution": "nodenext",
//     tenés un archivo "helpers.ts" en la misma carpeta y querés
//     importar "formatDate" de ahí. Escribí la línea de import correcta.
//     Pregunta: ¿por qué la extensión NO es ".ts"?
// Tu código acá (un comentario con la línea + tu respuesta):


// C4. Module augmentation mínimo. Escribí el bloque
//     "declare module 'node:process' { ... }" que agregue UN solo
//     campo nuevo a "NodeJS.ProcessEnv": "APP_NAME: string".
//     (No hace falta verificarlo corriendo nada — es sintaxis.)
// Tu código acá:


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá dos archivos en este directorio:
//    - models.ts: exportá un type "Task" y una función "createTask"
//    - main-tasks.ts: importá AMBOS con un solo import usando
//      el modificador inline `type`.
//    Compilá con pnpx tsc --noEmit para verificar.
// Hacelo en archivos aparte — anotá acá lo que aprendiste:


// 2. Experimento ESM/CJS: compilá un archivo simple con
//    "module": "commonjs" y después con "module": "esnext"
//    (podés usar pnpx tsc archivo.ts --module commonjs --outDir out).
//    Compará el output JS de un import/export. Anotá las diferencias.
// Tus hallazgos acá:


// 3. Escribí un archivo de module augmentation que le agregue
//    a 'node:process' (interface ProcessEnv en el namespace NodeJS)
//    tus variables de entorno tipadas:
//    DATABASE_URL: string, NODE_ENV: 'development' | 'production'.
//    Verificá que process.env.DATABASE_URL ahora es string (no string | undefined).
// Tu código acá (o en un env.d.ts aparte):

export {}
