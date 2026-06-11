// ============================================================
// 18 - MÓDULOS: TYPESCRIPT EN EL MUNDO ESM/CJS
// ============================================================
// La mitad de los errores de configuración de proyectos TS reales
// no son de tipos — son de MÓDULOS: ESM vs CommonJS, extensiones,
// import type. Este archivo te ahorra esas horas de sufrimiento.
// ============================================================


// --- Qué hace que un archivo sea un módulo ---
// Si un archivo tiene al menos un import o export, es un MÓDULO:
// sus variables son locales. Si no tiene ninguno, es un SCRIPT:
// todo lo que declara es GLOBAL (y colisiona con otros scripts).
//
// Por eso todos los archivos de este curso terminan con `export {}` —
// los convierte en módulos sin exportar nada.


// --- import type ---
// Los tipos NO existen en runtime. Cuando importás solo tipos,
// decláralo explícitamente: el compilador puede borrar el import
// entero sin analizar nada.

// Import solo de tipos — desaparece por completo del JS compilado:
// import type { User, Config } from './models'

// Import mixto — valor y tipo en una línea, con el modificador inline:
// import { createUser, type UserRole } from './models'

// ¿Por qué importa? Tres razones:
// 1. Side effects: un import normal EJECUTA el módulo. Si solo
//    querías el tipo, ejecutaste código al pedo (o causaste un ciclo).
// 2. Herramientas de un-archivo-a-la-vez (esbuild, swc, vite) no ven
//    los otros archivos: no pueden saber si User es tipo o valor.
//    import type se lo dice.
// 3. Claridad: el lector sabe qué es contrato y qué es runtime.

// La opción "verbatimModuleSyntax": true en tsconfig hace esto OBLIGATORIO:
// todo import que no se usa como valor debe ser import type.
// Recomendada en proyectos nuevos — elimina la ambigüedad de raíz.


// --- ESM vs CommonJS: los dos mundos ---
//
// CommonJS (CJS) — el sistema histórico de Node:
//   const fs = require('fs')
//   module.exports = { ... }
//
// ESModules (ESM) — el estándar del lenguaje:
//   import fs from 'node:fs'
//   export function helper() {}
//
// Vos escribís SIEMPRE sintaxis ESM en TypeScript.
// Lo que cambia es a qué compila — y eso lo deciden DOS configs:
//
// 1. package.json → "type": "module"  (los .js son ESM)
//    sin ese campo                     (los .js son CJS)
// 2. tsconfig → "module": "nodenext" respeta lo que diga package.json
//
// REGLA PRÁCTICA para proyectos nuevos en Node:
//   package.json:  { "type": "module" }
//   tsconfig:      "module": "nodenext", "moduleResolution": "nodenext"
// Para proyectos con bundler (Vite, Next):
//   tsconfig:      "module": "esnext", "moduleResolution": "bundler"


// --- Extensiones: .ts, .mts, .cts ---
// Igual que .js/.mjs/.cjs pero en TypeScript:
//   .ts  → sigue lo que diga package.json
//   .mts → SIEMPRE ESM   (compila a .mjs)
//   .cts → SIEMPRE CJS   (compila a .cjs)
//
// Por eso 04-type-assertions es .mts: necesita top-level await,
// que solo existe en ESM.
//
// GOTCHA GRANDE con "moduleResolution": "nodenext":
// los imports relativos llevan extensión .js (la del ARCHIVO COMPILADO):
//   import { helper } from './utils.js'   ← aunque el archivo sea utils.ts
// Con "bundler" no hace falta extensión. Este detalle confunde a TODOS
// la primera vez — no es un bug, es cómo resuelve Node en ESM.


// --- esModuleInterop ---
// CJS y ESM no exportan igual: CJS tiene UN export (module.exports),
// ESM tiene named exports + default. Cuando importás un paquete CJS
// desde código ESM, alguien tiene que traducir.
//
// "esModuleInterop": true hace esa traducción:
//   import express from 'express'   ✓ funciona aunque express sea CJS
//
// Sin él, necesitarías la forma rara: import * as express from 'express'
// Siempre en true. Punto.


// --- Module augmentation ---
// En 14 viste declare global. La variante para MÓDULOS:
// agregarle tipos a un paquete existente sin tocar su código.

// Ejemplo real: agregar campos custom a la sesión de express-session:
//
// declare module 'express-session' {
//     interface SessionData {
//         userId: number
//         role: 'admin' | 'user'
//     }
// }
//
// A partir de acá, req.session.userId está tipado en todo el proyecto.
// Convención: estos archivos van en src/types/*.d.ts


// --- Barrel files (index.ts) — usalos con criterio ---
// Un barrel re-exporta todo un directorio:
//
// src/services/index.ts:
//   export * from './user-service'
//   export * from './order-service'
//
// PRO: imports limpios → import { UserService } from '@/services'
// CONTRA:
//   - Un import del barrel puede cargar TODO el directorio (bundle size,
//     tiempo de arranque, ciclos de imports).
//   - Los ciclos via barrel son el origen del clásico
//     "Cannot access 'X' before initialization".
//
// Regla: barrels en la frontera PÚBLICA de un módulo/paquete, sí.
// Barrels internos por comodidad en cada carpeta, no.


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
