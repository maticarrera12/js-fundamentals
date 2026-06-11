// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá una jerarquía de clases para figuras 3D:
//    - Shape3D (abstracta) con método volume() abstracto y describe()
//    - Sphere extends Shape3D — volume: (4/3)πr³
//    - Cube extends Shape3D   — volume: lado³
//    - Cylinder extends Shape3D — volume: πr²h
//    Verificá que new Shape3D() lanza error.
// Tu código acá:


// 2. Implementá un mixin "Timestamped" que agregue:
//    - createdAt: Date al construirse
//    - updatedAt: Date que se actualiza cada vez que cambia una propiedad (usá Proxy)
//    Aplicalo a una clase "Task" con title y status.
// Tu código acá:


// 3. Creá una clase "EventEmitter" con:
//    - on(event, handler): registra un handler
//    - off(event, handler): desregistra un handler
//    - emit(event, ...args): llama todos los handlers del evento
//    Los handlers deben guardarse en un Map privado (#handlers).
// Tu código acá:
