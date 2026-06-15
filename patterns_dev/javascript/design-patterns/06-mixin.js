// ============================================================
// 06 - MIXIN
// ============================================================
// Un mixin es un paquete reutilizable de comportamiento que podés
// incorporar a una clase u objeto para ganar capacidades sin meterlo
// en una cadena de herencia.
//
// JS solo permite herencia simple (una clase → una superclase). Los
// mixins cubren el hueco: compartir concerns ortogonales — logging,
// dirty-tracking, serialización, eventing — entre clases que no tienen
// nada más en común.
//
// Siguen apareciendo (TypeScript mixin classes, Vue 2 mixins, spec del
// browser como WindowOrWorkerGlobalScope), pero en 2024+ rara vez son
// la primera herramienta. Composición, hooks y utilidades pequeñas
// resuelven lo mismo con menos sorpresas.
// ============================================================


// ============================================================
// PARTE 1: Ejemplo práctico — dirty tracking
// ============================================================

class Document {
    constructor(title, body) {
        this.title = title
        this.body = body
    }
}

const dirtyTrackable = {
    markDirty() {
        this._dirty = true
        this._lastModified = Date.now()
    },
    markClean() {
        this._dirty = false
    },
    isDirty() {
        return Boolean(this._dirty)
    },
    lastModified() {
        return this._lastModified ?? null
    },
}

// Forma más simple: trait object + Object.assign en el prototype
Object.assign(Document.prototype, dirtyTrackable)

const draft = new Document('Patterns', 'Mixins, composition, hooks...')
draft.markDirty()
console.log(draft.isDirty())    // true
draft.markClean()
console.log(draft.isDirty())    // false

// Problemas de Object.assign directo:
// 1. Métodos nuevos shadowean silenciosamente nombres existentes
// 2. No queda registro explícito en la clase — hay que greppear


// ============================================================
// PARTE 2: applyTraits — composición con detección de conflictos
// ============================================================

function applyTraits(target, ...traits) {
    for (const trait of traits) {
        for (const key of Reflect.ownKeys(trait)) {
            if (key === 'constructor') continue
            if (Object.prototype.hasOwnProperty.call(target.prototype, key)) {
                throw new Error(`Trait conflict on "${String(key)}"`)
            }
            Object.defineProperty(
                target.prototype,
                key,
                Object.getOwnPropertyDescriptor(trait, key),
            )
        }
    }
    return target
}

const serializable = {
    toJSON() {
        return { title: this.title, body: this.body }
    },
}

const eventEmitting = {
    on(event, handler) {
        ;(this._handlers ??= new Map()).set(event, handler)
    },
    emit(event, payload) {
        this._handlers?.get(event)?.(payload)
    },
}

class Note {
    constructor(title, body) {
        this.title = title
        this.body = body
    }
}

applyTraits(Note, dirtyTrackable, serializable, eventEmitting)

const note = new Note('Draft', 'contenido')
note.on('save', (payload) => console.log('[event] saved', payload))
note.markDirty()
note.emit('save', note.toJSON())

console.log(note.isDirty())       // true
console.log(JSON.stringify(note)) // serializable vía toJSON


// ============================================================
// PARTE 3: Subclass-factory mixins
// ============================================================
// Los trait objects no pueden llamar super — no hay padre real.
// La forma factory: mixin(Base) → class extends Base { ... }

const Timestamped = (Base) =>
    class extends Base {
        constructor(...args) {
            super(...args)
            this.createdAt = new Date()
            this.updatedAt = this.createdAt
        }
        touch() {
            this.updatedAt = new Date()
        }
    }

const Versioned = (Base) =>
    class extends Base {
        constructor(...args) {
            super(...args)
            this.version = 1
        }
        bump() {
            this.version += 1
            if (typeof this.touch === 'function') this.touch()
        }
    }

class RawNote {}

class TrackedNote extends Versioned(Timestamped(RawNote)) {}

const tracked = new TrackedNote()
tracked.bump()
console.log(tracked.version)      // 2
console.log(tracked.createdAt instanceof Date)  // true

// Más verboso, pero:
// - super.method() funciona
// - Componer con extends es natural
// - TypeScript tipa bien mixin classes con esta forma


// ============================================================
// PARTE 4: Composición — la alternativa más simple
// ============================================================
// Si Document "tiene" un DirtyTracker en lugar de "ser" dirty-trackable,
// evitás mezclar prototypes.

class DirtyTracker {
    #dirty = false
    #lastModified = null

    markDirty() {
        this.#dirty = true
        this.#lastModified = Date.now()
    }
    markClean() {
        this.#dirty = false
    }
    isDirty() {
        return this.#dirty
    }
    lastModified() {
        return this.#lastModified
    }
}

class ComposedDocument {
    constructor(title, body) {
        this.title = title
        this.body = body
        this.dirty = new DirtyTracker()
    }

    edit(newBody) {
        this.body = newBody
        this.dirty.markDirty()
    }
}

const doc = new ComposedDocument('Título', 'v1')
doc.edit('v2')
console.log(doc.dirty.isDirty())  // true — explícito, testeable, sin sorpresa en prototype


// ============================================================
// PARTE 5: Mixins en el browser
// ============================================================
// La plataforma web está llena de mixins a nivel spec:
//
// Window hereda miembros de:
//   - WindowOrWorkerGlobalScope (setTimeout, fetch, queueMicrotask...)
//   - WindowEventHandlers (onbeforeunload, onclick...)
//
// Son "mixin interfaces" en la spec: no las instanciás solas,
// solo ves sus miembros en hosts como Window o WorkerGlobalScope.


// ============================================================
// PARTE 6: Mixins vs composición vs hooks
// ============================================================
//
// | Necesidad                              | Herramienta              | Por qué                          |
// |----------------------------------------|--------------------------|----------------------------------|
// | Comportamiento en clases planas        | Trait-object mixin       | Baja ceremonia, sin super        |
// | Capas que llaman super                 | Subclass-factory mixin   | Cada capa es subclase real       |
// | Compartir en React                     | Custom hook              | Explícito, no contamina instance |
// | Compartir en Vue 3                     | Composable (useX)        | Reemplaza Vue.mixin legacy       |
// | Relación "tiene un"                    | Composición (campo)      | La respuesta más subutilizada    |
//
// React retiró mixins en 2016 → HOCs → Hooks.
// Vue: Options API mixins → Composition API composables.
// Svelte: stores y actions, sin mixin.
// Dirección clara: composición explícita > merge implícito de prototype.


// ============================================================
// PARTE 7: Decorators (ángulo futuro)
// ============================================================
// Decorators Stage 3 (TS 5.0+) permiten adjuntar capacidades con
// anotación visible en el source:
//
//   @dirtyTrackable
//   class Document { ... }
//
// Hasta que ship nativo en browser/Node, mixins siguen siendo
// opción de baja fricción — pero conviene conocer la dirección del estándar.


// ============================================================
// PARTE 8: Trade-offs
// ============================================================
//
// Ventajas:
// - Menos duplicación
// - Fácil de aplicar (Object.assign o factory)
//
// Costos:
// - Métodos aparecen sin estar declarados en la clase → peor IDE/review
// - Conflictos de nombres silenciosos (sin applyTraits)
// - Cadenas profundas difíciles de debuggear
//
// Regla: mixin cuando el comportamiento es ortogonal (logging, dirty,
// serialización, eventing). Composición cuando puede vivir en un
// colaborador. En frameworks de UI → hooks/composables.


// ============================================================
// ANÁLISIS — Perspectiva React / TypeScript (2026)
// ============================================================
//
// ### 1. Idea importante (6 meses)
// JS mixin ≠ React mixin (removido 2016). En React moderno: custom hooks
// y composición. Mixin JS sirve en clases de dominio; en UI casi nunca.
//
// ### 2. Problema que resuelve
// Compartir comportamiento ortogonal entre clases sin herencia múltiple
// (logging, dirty-tracking, serialización) cuando JS solo permite extends una vez.
//
// ### 3. En React hoy
// - React mixins: MUERTOS. No los uses ni en entrevistas como solución UI.
// - Custom hooks (useDirtyTracking, useLogger): reemplazo directo.
// - HOCs: reemplazados por hooks en la mayoría de casos.
// - Composición: <WithLogger><Document /></WithLogger> o hook interno.
// - Vue 2 mixins → Vue 3 composables (misma lección que React).
//
// ### 4. En TypeScript hoy
// - Mixin factory: type Constructor = new (...args: any[]) => object
//   function Timestamped<T extends Constructor>(Base: T) { ... }
// - Trait + Object.assign: sin tipos en prototype — TS no lo ve.
// - Preferí composición tipada: class Doc { dirty = new DirtyTracker() }.
// - Decorators (@logged): alternativa futura para cross-cutting en clases.
//
// ### 5. En el ecosistema
// - React: hooks exclusivamente para shared behavior.
// - Next.js: middleware/proxy, no mixins.
// - Zustand middleware: composición funcional, no prototype mixin.
// - lodash mixins / Backbone.extend: legacy.
//
// ### 6. ¿Lo implementaría manualmente en 2026?
// En componentes React: nunca — hooks. En backend TS con clases de dominio:
// raramente factory mixin; más often composición o decorator. Trait Object.assign
// solo scripts pequeños o migración legacy.
//
// ### 7. Preguntas de entrevista
// - ¿Por qué React sacó mixins? → naming collisions, implicit deps, hard to trace.
// - ¿Mixin vs HOC vs Hook? → hook gana: explícito, composable, testeable.
// - ¿Subclass-factory vs trait object? → factory si necesitás super().
// - ¿Mixin vs composición has-a? → has-a casi siempre más claro.
// - ¿TypeScript mixin classes? → sí en dominio; tipar con Constructor constraint.
//
// ### 8. Ejercicio práctico (~10 min)
// Ejercicio #3 (composición vs mixin) es el más transferible a React:
// reescribí dirty tracking como hook useDirtyState() en comentarios
// después de completarlo con clase.
//
// ### 9. Estado actual
// React mixins: deprecados/eliminados. JS mixins en clases: nicho.
// Estándar en UI: hooks/composables. Decorators: emergente para clases TS.


// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá trait object loggable con log(message) que acumule en
//    this._logs = []. Aplicalo a Document con applyTraits junto
//    a dirtyTrackable. Verificá que ambos coexisten.
// Tu código acá:


// 2. Implementá Timestamped como subclass-factory mixin y aplicalo
//    a una clase Task con title. Confirmá createdAt y touch().
// Tu código acá:


// 3. Reescribí dirty tracking del Document usando composición
//    (DirtyTracker como campo) en lugar de mixin. ¿Qué ganás en
//    claridad y testabilidad?
// Tu código acá:


// 4. Provocá un conflicto de traits: dos traits con el mismo método
//    save(). Verificá que applyTraits lanza Error con mensaje claro.
// Tu código acá:


// 5. Para cada caso, elegí mixin trait, mixin factory, composición o hook:
//    a) Serializar User a JSON en 4 clases distintas
//    b) useWindowSize() en React
//    c) Logger compartido en servicios de backend sin framework UI
//    d) Validación + timestamps en una jerarquía donde Validatable llama super
// Tu respuestas acá:
