// ============================================================
// EJERCICIOS
// ============================================================

// 1. Creá un objeto "configStore" usando Object.create(null)
//    (sin prototipo — útil como diccionario puro).
//    Usá Object.defineProperty para agregar una propiedad "version"
//    que sea read-only y no enumerable.
//    Verificá que no aparece en Object.keys pero sí podés leerla.
// Tu código acá:


// 2. Dado este array de usuarios:
//    const users = [
//      { id: 1, name: 'Ana', role: 'admin' },
//      { id: 2, name: 'Luis', role: 'user' },
//      { id: 3, name: 'Mara', role: 'user' },
//    ]
//    Usando Object.fromEntries + map, convertilo en un objeto
//    donde la clave es el id y el valor es el usuario completo.
//    { 1: { id: 1, name: 'Ana', ... }, 2: {...}, 3: {...} }
// Tu código acá:


// 3. Implementá una función "deepFreeze(obj)" que congele
//    un objeto y todos sus objetos anidados recursivamente.
//    Object.freeze solo hace shallow freeze — tu función debe
//    hacer que ningún nivel sea mutable.
// Tu código acá:
