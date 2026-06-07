// ============================================================
// 13 - TSCONFIG.JSON
// ============================================================
// tsconfig.json controla cómo el compilador de TypeScript
// interpreta tu código. Entenderlo evita bugs silenciosos
// y errores raros que no tienen nada que ver con tu lógica.
//
// Referencia completa: https://www.typescriptlang.org/tsconfig
// ============================================================

// Un tsconfig.json mínimo y explicado:
//
// {
//   "compilerOptions": {
//
//     // TARGET: a qué versión de JS compila tu código.
//     // ES2020+ para Node.js moderno o navegadores modernos.
//     // ES5 si necesitás soporte legacy.
//     "target": "ES2020",
//
//     // LIB: qué APIs del entorno están disponibles.
//     // TS usa esto para saber si Date, Promise, fetch, etc. existen.
//     // Si ponés "ES2020" incluye las APIs estándar de ES2020.
//     // Para browsers, agregás "DOM" y "DOM.Iterable".
//     "lib": ["ES2020"],
//
//     // MODULE: formato de módulos que genera.
//     // "NodeNext" / "ESNext" para ESModules (import/export).
//     // "CommonJS" para require/module.exports (Node.js clásico).
//     "module": "NodeNext",
//
//     // MODULE RESOLUTION: cómo resuelve los imports.
//     // "NodeNext" sigue las reglas de Node.js con ESModules.
//     // "bundler" si usás Vite, webpack, etc.
//     "moduleResolution": "NodeNext",
//
//     // OUTDIR: carpeta donde va el JS compilado.
//     "outDir": "./dist",
//
//     // ROOTDIR: carpeta raíz de tus archivos .ts.
//     "rootDir": "./src",
//
//     // ============================================================
//     // STRICT MODE — el más importante de todos
//     // ============================================================
//     // Habilita un conjunto de checks que TS tiene desactivados
//     // por defecto para no romper proyectos legados.
//     // En proyectos nuevos: SIEMPRE en true.
//     "strict": true,
//
//     // strict: true habilita todos estos juntos:
//     //
//     // "strictNullChecks": true
//     //   null y undefined son tipos distintos. Sin esto, podés
//     //   asignar null a cualquier tipo y TS no se queja.
//     //   Con esto: string !== string | null
//     //
//     // "noImplicitAny": true
//     //   Si TS no puede inferir el tipo y vos no lo anotaste,
//     //   es error. Sin esto, TS silenciosamente pone 'any'.
//     //
//     // "strictFunctionTypes": true
//     //   Chequeo estricto de tipos en parámetros de funciones.
//     //
//     // "strictPropertyInitialization": true
//     //   Las propiedades de clase deben inicializarse en el constructor.
//     //
//     // "noImplicitThis": true
//     //   Error si 'this' tiene tipo 'any' implícito.
//
//     // ============================================================
//     // CHECKS ADICIONALES (muy recomendados)
//     // ============================================================
//
//     // Error si hay variables declaradas pero nunca usadas.
//     "noUnusedLocals": true,
//
//     // Error si hay parámetros de función nunca usados.
//     "noUnusedParameters": true,
//
//     // Error si no todos los code paths de una función retornan un valor.
//     "noImplicitReturns": true,
//
//     // Error si un switch tiene casos que "caen" al siguiente sin break.
//     "noFallthroughCasesInSwitch": true,
//
//     // ============================================================
//     // PATH ALIASES — para imports más limpios
//     // ============================================================
//     // En vez de: import { something } from '../../../../utils'
//     // Podés escribir: import { something } from '@/utils'
//     "baseUrl": ".",
//     "paths": {
//       "@/*": ["src/*"],
//       "@components/*": ["src/components/*"],
//       "@utils/*": ["src/utils/*"]
//     },
//
//     // SOURCE MAPS: genera archivos .map para debuggear el TS original.
//     "sourceMap": true,
//
//     // DECLARATION: genera archivos .d.ts (próximo tema).
//     "declaration": true,
//
//     // SKIP LIB CHECK: no chequea los tipos dentro de node_modules.
//     // Casi siempre en true para evitar errores de librerías mal tipadas.
//     "skipLibCheck": true
//   },
//
//   // Qué archivos incluir:
//   "include": ["src/**/*.ts"],
//
//   // Qué archivos ignorar:
//   "exclude": ["node_modules", "dist", "**/*.test.ts"]
// }


// ============================================================
// ERRORES COMUNES QUE TSCONFIG CAUSA O PREVIENE
// ============================================================

// 1. sin strictNullChecks — esto no da error aunque debería:
//    function getName(): string { return null }
//    Con strict: true → error: Type 'null' is not assignable to type 'string'

// 2. sin noImplicitAny — esto pasa silenciosamente:
//    function process(data) { return data }
//    'data' es implícitamente 'any'
//    Con strict: true → error: Parameter 'data' implicitly has an 'any' type

// 3. strictPropertyInitialization — esto da error con strict:
//    class Config { host: string }  ← no inicializada en constructor
//    Solución: host!: string  (non-null assertion, usalo con cuidado)
//    Mejor solución: constructor(public host: string) {}


// ============================================================
// TSCONFIG POR ENTORNO
// ============================================================

// Podés tener múltiples tsconfig que extiendan uno base:
//
// tsconfig.base.json — opciones compartidas
// tsconfig.json — desarrollo (incluye tests, más permisivo)
// tsconfig.build.json — producción (excluye tests, más estricto)
//
// tsconfig.build.json:
// {
//   "extends": "./tsconfig.base.json",
//   "exclude": ["**/*.test.ts", "**/*.spec.ts"]
// }


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
// Después ejecutá: npx tsc --noEmit
// y fijate qué errores encuentra en los archivos que ya escribiste.
// Son todos bugs reales — intentá corregir al menos 2.

export {}
