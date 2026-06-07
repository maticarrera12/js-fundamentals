# Setup — Entorno de Desarrollo

Antes de empezar con los archivos del roadmap, necesitás tener el entorno configurado. Este documento te lleva paso a paso.

---

## 1. Instalar Node.js

Node.js te permite ejecutar JavaScript fuera del navegador, directamente en tu computadora.

**Opción recomendada: instalar con `nvm` (Node Version Manager)**

`nvm` te deja instalar y cambiar versiones de Node fácilmente. Es lo que usan casi todos en la industria.

### macOS / Linux

Abrí la terminal y ejecutá:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Cerrá y volvé a abrir la terminal, luego:

```bash
nvm install --lts
nvm use --lts
```

### Windows

Descargá e instalá **nvm-windows** desde:  
https://github.com/coreybutler/nvm-windows/releases

Después abrí una terminal nueva y ejecutá:

```bash
nvm install lts
nvm use lts
```

### Verificar que funcionó

```bash
node --version
```

Deberías ver algo como `v22.x.x`. Si aparece un número, Node está instalado correctamente.

### Instalar pnpm

`pnpm` es un gestor de paquetes más rápido y eficiente que npm. Una vez que tenés Node instalado:

```bash
npm install -g pnpm
```

Verificá que se instaló:

```bash
pnpm --version
```

Deberías ver algo como `v9.x.x`.

---

## 2. Instalar el editor de código

Usá **Visual Studio Code** (VS Code). Es gratuito, liviano y tiene el mejor soporte para JS y TS.

Descargalo desde: https://code.visualstudio.com

### Extensiones recomendadas

Una vez instalado VS Code, instalá estas extensiones (buscalas en el panel de extensiones con `Ctrl+Shift+X` / `Cmd+Shift+X`):

| Extensión | Para qué sirve |
|-----------|---------------|
| **ESLint** | Detecta errores en tu código mientras escribís |
| **Prettier** | Formatea el código automáticamente |
| **Error Lens** | Muestra los errores directamente en la línea |

---

## 3. Cómo ejecutar archivos JavaScript

Desde la terminal, posicionarte en la carpeta del archivo:

```bash
cd /ruta/a/dev-path/javascript/basic
```

Y ejecutar el archivo con Node:

```bash
node 00-hello-world.js
```

Vas a ver la salida en la terminal. Así probás todos los archivos `.js` del roadmap.

**Tip:** si estás en VS Code, podés abrir la terminal integrada con `` Ctrl+` `` (Windows/Linux) o `` Cmd+` `` (Mac).

---

## 4. Cómo ejecutar archivos TypeScript

TypeScript no corre directo en Node — primero necesita ser compilado o interpretado. La forma más cómoda para aprender es usar **tsx**, que ejecuta archivos `.ts` y `.mts` directamente.

### Instalar tsx globalmente

```bash
pnpm add -g tsx
```

### Ejecutar un archivo TypeScript

```bash
tsx 01-types.ts
```

Para los archivos `.mts` (como `04-type-assertions.mts`) funciona igual:

```bash
tsx 04-type-assertions.mts
```

### Verificar que funcionó

```bash
tsx --version
```

Debería mostrar algo como `v4.x.x`.

---

## 5. Verificar que todo esté listo

Ejecutá estos comandos uno por uno para confirmar que el entorno está completo:

```bash
node --version      # debe mostrar v18 o superior
pnpm --version      # debe mostrar 9 o superior
tsx --version       # debe mostrar 4 o superior
```

Luego probá correr el primer archivo:

```bash
cd /ruta/a/dev-path/javascript/basic
node 00-hello-world.js
```

Si ves `Hello, World!` en la terminal, el setup está completo y podés empezar el roadmap.

---

## 6. Errores comunes al principio

**`node: command not found`**  
Node no está instalado o nvm no se cargó. Cerrá y volvé a abrir la terminal, o revisá la instalación de nvm.

**`Cannot find module`**  
Estás ejecutando el archivo desde la carpeta equivocada. Verificá con `pwd` que estás en la carpeta correcta.

**`SyntaxError: Cannot use import statement`**  
Estás usando `import` (ES modules) con Node en modo CommonJS. Revisá que el archivo tenga la extensión `.mjs` o que la carpeta tenga un `package.json` con `"type": "module"`.

**`tsx: command not found`**  
No instalaste tsx. Ejecutá `pnpm add -g tsx` y cerrá/abrí la terminal.

---

## Estructura del proyecto

```
dev-path/
├── SETUP.md              ← estás acá
├── javascript/
│   ├── ROADMAP.md        ← empezá por acá para JS
│   ├── basic/            ← Etapas 0-3
│   └── intermediate/     ← Etapas 4-5
└── typescript/
    ├── ROADMAP.md        ← empezá por acá para TS
    └── *.ts / *.mts      ← Etapas 0-3
```

**El orden correcto es:** JavaScript completo → luego TypeScript. No mezcles.
