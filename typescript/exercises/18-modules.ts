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
